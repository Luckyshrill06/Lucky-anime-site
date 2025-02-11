// Global functions
async function fetchAnimeDetails(animeId) {
    try {
        document.getElementById('synopsisContent').innerHTML = '<div class="loading-spinner"></div>';
        document.getElementById('synopsisPopup').classList.add('active');
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
        const data = await response.json();
        displaySynopsis(data.data);
    } catch (error) {
        console.error('Error fetching anime details:', error);
        document.getElementById('synopsisContent').innerHTML = 'Error loading anime details. Please try again.';
    }
}

function closeSynopsis() {
    document.getElementById('synopsisPopup').classList.remove('active');
}
// Move displaySynopsis to global scope
function displaySynopsis(anime) {
    const synopsisContent = document.getElementById('synopsisContent');
    synopsisContent.innerHTML = `
        <div class="result-content">
            <img src="${anime.images.jpg.image_url}" alt="${anime.title_english || anime.title}" class="result-image">
            <div class="result-info">
                <h3 class="result-title">${anime.title_english || anime.title}</h3>
                <div class="anime-rating">★ ${anime.score || 'N/A'}</div>
                <p class="result-synopsis">${anime.synopsis || 'No synopsis available.'}</p>
                <div class="additional-info">
                    <p><strong>Episodes:</strong> ${anime.episodes || 'Unknown'}</p>
                    <p><strong>Status:</strong> ${anime.status}</p>
                    <p><strong>Genres:</strong> ${anime.genres.map(genre => genre.name).join(', ')}</p>
                    <p><strong>Aired:</strong> ${anime.aired.string}</p>
                </div>
            </div>
        </div>
    `;
}


document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const topAnimeCarousel = document.getElementById('topAnimeCarousel');
    const newReleasesGrid = document.getElementById('newReleases');
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const topAllTimeGrid = document.getElementById('topAllTimeGrid');

    // Fetch Top Anime
    async function fetchTopAnime() {
        try {
            const response = await fetch('https://api.jikan.moe/v4/top/anime');
            const data = await response.json();
            displayTopAnime(data.data.slice(0, 10));
        } catch (error) {
            console.error('Error fetching top anime:', error);
        }
    }

    // Display Top Anime
    function displayTopAnime(animeList) {
        topAnimeCarousel.innerHTML = animeList.map(anime => `
            <div class="anime-card" onclick="fetchAnimeDetails(${anime.mal_id})">
                <img src="${anime.images.jpg.image_url}" alt="${anime.title_english || anime.title}">
                <h3>${anime.title_english || anime.title}</h3>
                <div class="anime-rating">★ ${anime.score}</div>
            </div>
        `).join('');
    }

    // Fetch New Releases
    async function fetchNewReleases() {
        try {
            const response = await fetch('https://api.jikan.moe/v4/seasons/now');
            const data = await response.json();
            displayNewReleases(data.data.slice(0, 12));
        } catch (error) {
            console.error('Error fetching new releases:', error);
        }
    }

    // Display New Releases
    function displayNewReleases(animeList) {
        newReleasesGrid.innerHTML = animeList.map(anime => `
            <div class="anime-card" onclick="fetchAnimeDetails(${anime.mal_id})">
                <img src="${anime.images.jpg.image_url}" alt="${anime.title_english || anime.title}">
                <h3>${anime.title_english || anime.title}</h3>
                <div class="anime-rating">★ ${anime.score || 'N/A'}</div>
            </div>
        `).join('');
    }

    // Fetch Top Anime of All Time
    async function fetchTopAllTimeAnime() {
        try {
            const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=15');
            const data = await response.json();
            displayTopAllTimeAnime(data.data);
        } catch (error) {
            console.error('Error fetching top all time anime:', error);
        }
    }

    // Display Top Anime of All Time
    function displayTopAllTimeAnime(animeList) {
        topAllTimeGrid.innerHTML = animeList.map((anime, index) => `
            <div class="anime-card" onclick="fetchAnimeDetails(${anime.mal_id})">
                <div class="rank-badge">#${index + 1}</div>
                <img src="${anime.images.jpg.image_url}" alt="${anime.title_english || anime.title}">
                <h3>${anime.title_english || anime.title}</h3>
                <div class="anime-rating">★ ${anime.score || 'N/A'}</div>
            </div>
        `).join('');
    }

    // Handle Search
    async function handleSearch(e) {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (!query) return;

        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}`);
            const data = await response.json();
            if (data.data.length > 0) {
                displaySearchResults(data.data[0]);
            }
        } catch (error) {
            console.error('Error searching anime:', error);
        }
    }

    // Display Search Results
    function displaySearchResults(anime) {
        searchResults.classList.add('active');
        searchResults.innerHTML = `
            <div class="result-content">
                <img src="${anime.images.jpg.image_url}" alt="${anime.title_english || anime.title}" class="result-image">
                <div class="result-info">
                    <h3 class="result-title">${anime.title_english || anime.title}</h3>
                    <div class="anime-rating">★ ${anime.score || 'N/A'}</div>
                    <p class="result-synopsis">${anime.synopsis || 'No synopsis available.'}</p>
                </div>
            </div>
        `;
    }

    // Display Synopsis
    function displaySynopsis(anime) {
        const synopsisContent = document.getElementById('synopsisContent');
        synopsisContent.innerHTML = `
            <div class="result-content">
                <img src="${anime.images.jpg.image_url}" alt="${anime.title_english || anime.title}" class="result-image">
                <div class="result-info">
                    <h3 class="result-title">${anime.title_english || anime.title}</h3>
                    <div class="anime-rating">★ ${anime.score || 'N/A'}</div>
                    <p class="result-synopsis">${anime.synopsis || 'No synopsis available.'}</p>
                    <div class="additional-info">
                        <p><strong>Episodes:</strong> ${anime.episodes || 'Unknown'}</p>
                        <p><strong>Status:</strong> ${anime.status}</p>
                        <p><strong>Genres:</strong> ${anime.genres.map(genre => genre.name).join(', ')}</p>
                        <p><strong>Aired:</strong> ${anime.aired.string}</p>
                    </div>
                </div>
            </div>
        `;
    }





    
    // Event Listeners
    searchForm.addEventListener('submit', handleSearch);

    // Close synopsis popup when clicking outside the content
    document.getElementById('synopsisPopup').addEventListener('click', function(e) {
        if (e.target === this) {
            closeSynopsis();
        }
    });

    // Close synopsis popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSynopsis();
        }
    });

    // Initialize
    fetchTopAnime();
    fetchNewReleases();
    fetchTopAllTimeAnime();
});