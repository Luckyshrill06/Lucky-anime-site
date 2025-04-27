// Global variables
let currentGenre = '';
let allTopAnime = [];
let allNewReleases = [];
let allTopAllTime = [];

// Global functions
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Updated toggleMenu function
function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    const navOverlay = document.getElementById("navOverlay");
    const body = document.body;
    const hamburger = document.querySelector('.hamburger');
    
    navLinks.classList.toggle("active");
    navOverlay.classList.toggle("active");
    body.classList.toggle("no-scroll");
    
    // Toggle hamburger icon
    if (navLinks.classList.contains('active')) {
        hamburger.innerHTML = '<i class="fas fa-times"></i>';
        hamburger.setAttribute('aria-expanded', 'true');
    } else {
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        hamburger.setAttribute('aria-expanded', 'false');
    }
}

async function fetchAnimeDetails(animeId) {
    try {
        document.getElementById('synopsisContent').innerHTML = '<div class="loading-spinner"></div>';
        document.getElementById('synopsisPopup').classList.add('active');
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
        const data = await response.json();
        
        setTimeout(() => {
            displaySynopsis(data.data);
            document.getElementById('synopsisContent').style.animation = 'fadeIn 0.5s ease';
        }, 100);
    } catch (error) {
        console.error('Error fetching anime details:', error);
        document.getElementById('synopsisContent').innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error loading anime details. Please try again.</p>
            </div>
        `;
    }
}

function closeSynopsis() {
    const popup = document.getElementById('synopsisPopup');
    popup.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        popup.classList.remove('active');
        popup.style.animation = '';
    }, 300);
}

function displaySynopsis(anime) {
    const synopsisContent = document.getElementById('synopsisContent');
    synopsisContent.innerHTML = `
        <div class="result-content">
            <img src="${anime.images?.jpg?.image_url || 'https://via.placeholder.com/300x400'}" 
                 alt="${anime.title_english || anime.title}" 
                 class="result-image">
            <div class="result-info">
                <h3 class="result-title">${anime.title_english || anime.title || 'No title available'}</h3>
                <div class="anime-rating">★ ${anime.score || 'N/A'}</div>
                <p class="result-synopsis">${anime.synopsis || 'No synopsis available.'}</p>
                <div class="additional-info">
                    <p><strong>Episodes:</strong> ${anime.episodes || 'Unknown'}</p>
                    <p><strong>Status:</strong> ${anime.status || 'Unknown'}</p>
                    <p><strong>Genres:</strong> ${anime.genres?.map(genre => genre.name).join(', ') || 'Unknown'}</p>
                    <p><strong>Aired:</strong> ${anime.aired?.string || 'Unknown'}</p>
                    <p><strong>Studios:</strong> ${anime.studios?.map(studio => studio.name).join(', ') || 'Unknown'}</p>
                    <p><strong>Duration:</strong> ${anime.duration || 'Unknown'}</p>
                </div>
                <div class="action-buttons">
                    <button class="cta-button" onclick="window.open('${anime.url || '#'}', '_blank')">
                        <i class="fas fa-external-link-alt"></i> View on MAL
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Initialize hero slider
function initHeroSlider() {
    const sliderItems = document.querySelectorAll('.slider-item');
    let currentIndex = 0;
    
    function showNextSlide() {
        sliderItems[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % sliderItems.length;
        sliderItems[currentIndex].classList.add('active');
    }
    
    sliderItems[0].classList.add('active');
    setInterval(showNextSlide, 5000);
}

// Scroll to top button functionality
function initScrollTopButton() {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize particle.js background
function initParticles() {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ff8a00"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ff8a00",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.5
                    }
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });
}

// Initialize genres
function initGenres() {
    const genres = [
        { name: "Action", icon: "fa-fist-raised", mal_id: 1 },
        { name: "Adventure", icon: "fa-mountain", mal_id: 2 },
        { name: "Comedy", icon: "fa-laugh-squint", mal_id: 4 },
        { name: "Drama", icon: "fa-theater-masks", mal_id: 8 },
        { name: "Fantasy", icon: "fa-dragon", mal_id: 10 },
        { name: "Horror", icon: "fa-ghost", mal_id: 14 },
        { name: "Mystery", icon: "fa-search", mal_id: 7 },
        { name: "Romance", icon: "fa-heart", mal_id: 22 },
        { name: "Sci-Fi", icon: "fa-rocket", mal_id: 24 },
        { name: "Slice of Life", icon: "fa-home", mal_id: 36 },
        { name: "Sports", icon: "fa-running", mal_id: 30 },
        { name: "Supernatural", icon: "fa-magic", mal_id: 37 }
    ];

    const genresGrid = document.getElementById('genresGrid');
    genresGrid.innerHTML = genres.map(genre => `
        <div class="genre-card" onclick="fetchAnimeByGenre(${genre.mal_id}, '${genre.name}')">
            <i class="fas ${genre.icon}"></i>
            <h3>${genre.name}</h3>
        </div>
    `).join('');
}

// Fetch anime by genre
async function fetchAnimeByGenre(genreId, genreName) {
    try {
        currentGenre = genreName;
        const genreResults = document.getElementById('genreResults');
        genreResults.innerHTML = '<div class="loading-spinner"></div>';
        genreResults.classList.add('active');
        
        const response = await fetch(`https://api.jikan.moe/v4/anime?genres=${genreId}&order_by=popularity&limit=12`);
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
            displayGenreResults(data.data, genreName);
        } else {
            genreResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>No anime found in ${genreName} genre</p>
                </div>
            `;
        }
        
        // Scroll to genre results
        setTimeout(() => {
            genreResults.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    } catch (error) {
        console.error('Error fetching anime by genre:', error);
        document.getElementById('genreResults').innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error loading ${genreName} anime. Please try again.</p>
            </div>
        `;
    }
}

// Display genre results
function displayGenreResults(animeList, genreName) {
    const genreResults = document.getElementById('genreResults');
    genreResults.innerHTML = `
        <div class="genre-results-header">
            <h3 class="genre-results-title">Popular ${genreName} Anime</h3>
            <a href="#" class="back-to-genres" onclick="backToGenres()">
                <i class="fas fa-arrow-left"></i> Back to Genres
            </a>
        </div>
        <div class="carousel" id="genreAnimeCarousel"></div>
    `;
    
    const carousel = document.getElementById('genreAnimeCarousel');
    carousel.innerHTML = animeList.map(anime => `
        <div class="anime-card" onclick="fetchAnimeDetails(${anime.mal_id})">
            <img src="${anime.images?.jpg?.image_url || 'https://via.placeholder.com/300x400'}" 
                 alt="${anime.title_english || anime.title}">
            <h3>${anime.title_english || anime.title}</h3>
            <div class="anime-rating">★ ${anime.score || 'N/A'}</div>
        </div>
    `).join('');
    
    // Add animation
    setTimeout(() => {
        const cards = carousel.querySelectorAll('.anime-card');
        cards.forEach((card, i) => {
            card.style.animation = `fadeInUp 0.5s ease ${i * 0.05}s forwards`;
            card.style.opacity = '0';
        });
    }, 100);
}

function backToGenres() {
    document.getElementById('genreResults').classList.remove('active');
    document.getElementById('genresGrid').scrollIntoView({ behavior: 'smooth' });
}

// View All functions
async function fetchAllTopAnime() {
    try {
        if (allTopAnime.length === 0) {
            const response = await fetch('https://api.jikan.moe/v4/top/anime');
            allTopAnime = (await response.json()).data;
            // Sort by score in descending order
            allTopAnime.sort((a, b) => (b.score || 0) - (a.score || 0));
        }
        displayAllResults(allTopAnime, 'Top Anime');
    } catch (error) {
        console.error('Error fetching all top anime:', error);
    }
}

async function fetchAllNewReleases() {
    try {
        if (allNewReleases.length === 0) {
            const response = await fetch('https://api.jikan.moe/v4/seasons/now');
            allNewReleases = (await response.json()).data;
        }
        displayAllResults(allNewReleases, 'New Releases');
    } catch (error) {
        console.error('Error fetching all new releases:', error);
    }
}

async function fetchAllTopAllTime() {
    try {
        if (allTopAllTime.length === 0) {
            const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=bypopularity');
            allTopAllTime = (await response.json()).data;
            // Sort by score in descending order
            allTopAllTime.sort((a, b) => (b.score || 0) - (a.score || 0));
        }
        displayAllResults(allTopAllTime, 'Top Anime of All Time');
    } catch (error) {
        console.error('Error fetching all top anime:', error);
    }
}

function displayAllResults(animeList, title) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = `
        <h3 class="all-results-title">${title} (${animeList.length} results)</h3>
        <div class="all-results-grid">
            ${animeList.map(anime => `
                <div class="anime-card" onclick="fetchAnimeDetails(${anime.mal_id})">
                    <img src="${anime.images?.jpg?.image_url || 'https://via.placeholder.com/300x400'}" 
                         alt="${anime.title_english || anime.title}">
                    <h3>${anime.title_english || anime.title}</h3>
                    <div class="anime-rating">★ ${anime.score || 'N/A'}</div>
                </div>
            `).join('')}
        </div>
    `;
    searchResults.classList.add('active');
    searchResults.scrollIntoView({ behavior: 'smooth' });
}

// Improved search function
async function handleSearch(e) {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;

    searchResults.classList.remove('active');
    searchResults.innerHTML = '<div class="loading-spinner"></div>';
    searchResults.classList.add('active');

    try {
        // First try searching with MyAnimeList's API
        const malResponse = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&order_by=popularity&limit=5`);
        const malData = await malResponse.json();
        
        if (malData.data && malData.data.length > 0) {
            displaySearchResults(malData.data);
        } else {
            // Fallback to Kitsu API if MAL doesn't have results
            const kitsuResponse = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(query)}`);
            const kitsuData = await kitsuResponse.json();
            
            if (kitsuData.data && kitsuData.data.length > 0) {
                const formattedResults = kitsuData.data.map(item => ({
                    mal_id: item.id,
                    title: item.attributes.titles.en || item.attributes.titles.en_jp || item.attributes.canonicalTitle,
                    title_english: item.attributes.titles.en,
                    images: {
                        jpg: {
                            image_url: item.attributes.posterImage?.original || 'https://via.placeholder.com/300x400'
                        }
                    },
                    score: item.attributes.averageRating ? (item.attributes.averageRating / 10).toFixed(1) : null,
                    synopsis: item.attributes.synopsis,
                    url: `https://kitsu.io/anime/${item.attributes.slug}`
                }));
                displaySearchResults(formattedResults);
            } else {
                searchResults.innerHTML = `
                    <div class="no-results">
                        <i class="fas fa-search"></i>
                        <p>No results found for "${query}"</p>
                    </div>
                `;
            }
        }
    } catch (error) {
        console.error('Error searching anime:', error);
        searchResults.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error searching anime. Please try again.</p>
            </div>
        `;
    }
}

function displaySearchResults(animeList) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = `
        <h3 class="search-results-title">Search Results (${animeList.length} found)</h3>
        <div class="search-results-grid">
            ${animeList.map(anime => `
                <div class="result-card" onclick="fetchAnimeDetails(${anime.mal_id})">
                    <img src="${anime.images?.jpg?.image_url || 'https://via.placeholder.com/300x400'}" 
                         alt="${anime.title_english || anime.title}" 
                         class="result-image">
                    <div class="result-info">
                        <h4>${anime.title_english || anime.title || 'No title available'}</h4>
                        <div class="anime-rating">★ ${anime.score || 'N/A'}</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    // Add animation
    setTimeout(() => {
        searchResults.style.animation = 'fadeInUp 0.5s ease';
    }, 100);
}

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const topAnimeCarousel = document.getElementById('topAnimeCarousel');
    const newReleasesGrid = document.getElementById('newReleases');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const topAllTimeGrid = document.getElementById('topAllTimeGrid');

    // Initialize components
    initHeroSlider();
    initScrollTopButton();
    initParticles();
    initGenres();

    // Fetch Top Anime (now sorted by rating)
    async function fetchTopAnime() {
        try {
            const response = await fetch('https://api.jikan.moe/v4/top/anime?limit=10');
            const data = await response.json();
            // Sort by score in descending order
            const sortedData = data.data.sort((a, b) => (b.score || 0) - (a.score || 0));
            displayTopAnime(sortedData);
        } catch (error) {
            console.error('Error fetching top anime:', error);
        }
    }

    // Display Top Anime with animation
    function displayTopAnime(animeList) {
        topAnimeCarousel.innerHTML = animeList.map((anime, index) => `
            <div class="anime-card" onclick="fetchAnimeDetails(${anime.mal_id})">
                ${index < 3 ? `<div class="rank-badge">#${index + 1}</div>` : ''}
                <img src="${anime.images?.jpg?.image_url || 'https://via.placeholder.com/300x400'}" 
                     alt="${anime.title_english || anime.title}">
                <h3>${anime.title_english || anime.title}</h3>
                <div class="anime-rating">★ ${anime.score || 'N/A'}</div>
            </div>
        `).join('');
        
        setTimeout(() => {
            const cards = topAnimeCarousel.querySelectorAll('.anime-card');
            cards.forEach((card, i) => {
                card.style.animation = `fadeInUp 0.5s ease ${i * 0.1}s forwards`;
                card.style.opacity = '0';
            });
        }, 100);
    }

    // Fetch New Releases
    async function fetchNewReleases() {
        try {
            const response = await fetch('https://api.jikan.moe/v4/seasons/now?limit=12');
            const data = await response.json();
            displayNewReleases(data.data);
        } catch (error) {
            console.error('Error fetching new releases:', error);
        }
    }

    // Display New Releases with animation
    function displayNewReleases(animeList) {
        newReleasesGrid.innerHTML = animeList.map(anime => `
            <div class="anime-card" onclick="fetchAnimeDetails(${anime.mal_id})">
                <img src="${anime.images?.jpg?.image_url || 'https://via.placeholder.com/300x400'}" 
                     alt="${anime.title_english || anime.title}">
                <h3>${anime.title_english || anime.title}</h3>
                <div class="anime-rating">★ ${anime.score || 'N/A'}</div>
            </div>
        `).join('');
        
        setTimeout(() => {
            const cards = newReleasesGrid.querySelectorAll('.anime-card');
            cards.forEach((card, i) => {
                card.style.animation = `fadeInUp 0.5s ease ${i * 0.05}s forwards`;
                card.style.opacity = '0';
            });
        }, 100);
    }

    // Fetch Top Anime of All Time (now sorted by rating)
    async function fetchTopAllTimeAnime() {
        try {
            const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=15');
            const data = await response.json();
            // Sort by score in descending order
            const sortedData = data.data.sort((a, b) => (b.score || 0) - (a.score || 0));
            displayTopAllTimeAnime(sortedData);
        } catch (error) {
            console.error('Error fetching top all time anime:', error);
        }
    }

    // Display Top Anime of All Time with animation
    function displayTopAllTimeAnime(animeList) {
        topAllTimeGrid.innerHTML = animeList.map((anime, index) => `
            <div class="anime-card" onclick="fetchAnimeDetails(${anime.mal_id})">
                <div class="rank-badge">#${index + 1}</div>
                <img src="${anime.images?.jpg?.image_url || 'https://via.placeholder.com/300x400'}" 
                     alt="${anime.title_english || anime.title}">
                <h3>${anime.title_english || anime.title}</h3>
                <div class="anime-rating">★ ${anime.score || 'N/A'}</div>
            </div>
        `).join('');
        
        setTimeout(() => {
            const cards = topAllTimeGrid.querySelectorAll('.anime-card');
            cards.forEach((card, i) => {
                card.style.animation = `fadeInUp 0.5s ease ${i * 0.07}s forwards`;
                card.style.opacity = '0';
            });
        }, 100);
    }

    // Event Listeners
    searchForm.addEventListener('submit', handleSearch);

    // Close synopsis popup when clicking outside the content
    document.getElementById('synopsisPopup').addEventListener('click', function(e) {
        if (e.target === this) {
            closeSynopsis();
        }
    });

    // Navigation link clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            scrollToSection(sectionId);
            
            // Update active state
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Close menu when clicking on nav links (mobile only)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && window.innerWidth <= 768) {
            const navLinks = document.getElementById("navLinks");
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        }
    });

    // Initialize
    fetchTopAnime();
    fetchNewReleases();
    fetchTopAllTimeAnime();

    // Add CSS animations to style tag
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
        .all-results-grid, .search-results-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-top: 1rem;
        }
        .all-results-title, .search-results-title {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #ff8a00;
        }
        .result-card {
            background-color: rgba(30, 30, 60, 0.7);
            border-radius: 8px;
            overflow: hidden;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        .result-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }
        .result-card img {
            width: 100%;
            height: 250px;
            object-fit: cover;
        }
        .result-card .result-info {
            padding: 1rem;
        }
        .result-card h4 {
            margin: 0.5rem 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    `;
    document.head.appendChild(style);
});

// Animate playlist cards on scroll
function animatePlaylistsOnScroll() {
    const playlistCards = document.querySelectorAll('.playlist-card');
    
    playlistCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        card.classList.add('animate');
      }
    });
  }
  
  // Trigger animation on scroll
  window.addEventListener('scroll', animatePlaylistsOnScroll);
  
  // Also trigger animation on page load
  document.addEventListener('DOMContentLoaded', animatePlaylistsOnScroll);