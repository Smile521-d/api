// Wait for the DOM to fully load before running the script
document.addEventListener("DOMContentLoaded", () => {
    // Replace with your actual API keys
    const apiKeyRAWG = '45e44215f90e415aa004804cc9a0eaf7';
    const apiKeyYouTube = 'AIzaSyD6_lEh-7z4Rh50rI1ZPCaQtR8BQn0KK44';

    // Get references to the HTML elements
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('search');
    const gamesContainer = document.getElementById('games');
    const videoContainer = document.getElementById('videoContainer');

    // Add an event listener to the search button
    searchButton.addEventListener('click', () => {
        // Get the search query from the input field
        const query = searchInput.value;
        if (query) {
            // Fetch games based on the search query
            fetchGames(query);
        }
    });

    // Function to fetch games from the RAWG API
    function fetchGames(query) {
        // Construct the API URL using the search query
        const apiUrl = `https://api.rawg.io/api/games?key=${apiKeyRAWG}&search=${query}`;

        // Fetch data from the RAWG API
        fetch(apiUrl)
            .then(response => response.json()) // Parse the JSON response
            .then(data => {
                // Display the games on the page
                displayGames(data.results);
            })
            .catch(error => console.error('Error fetching data:', error)); // Handle errors
    }

    // Function to display games on the page
    function displayGames(games) {
        // Clear the previous results
        gamesContainer.innerHTML = '';
        videoContainer.innerHTML = '';

        // Loop through the list of games and create HTML elements for each
        games.forEach(game => {
            const gameDiv = document.createElement('div');
            gameDiv.classList.add('game');
            gameDiv.innerHTML = `
                <img src="${game.background_image}" alt="${game.name}">
                <h2>${game.name}</h2>
                <p>Released: ${game.released}</p>
            `;
            // Add an event listener to each game for fetching the video
            gameDiv.addEventListener('click', () => {
                fetchVideo(game.name);
            });
            gamesContainer.appendChild(gameDiv);
        });
    }

    // Function to fetch gameplay videos from the YouTube API
    function fetchVideo(gameName) {
        // Construct the YouTube API URL using the game name
        const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${gameName}%20gameplay&key=${apiKeyYouTube}`;

        // Fetch data from the YouTube API
        fetch(youtubeApiUrl)
            .then(response => response.json()) // Parse the JSON response
            .then(data => {
                // Display the video on the page
                displayVideo(data.items[0]);
            })
            .catch(error => console.error('Error fetching video:', error)); // Handle errors
    }

    // Function to display the video on the page
    function displayVideo(video) {
        videoContainer.innerHTML = `
            <h2>Gameplay Video:</h2>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
    }
});
