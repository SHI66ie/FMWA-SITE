// YouTube API for FMWA Website
// This script handles the YouTube iframe API integration

// Array to store YouTube player instances
let players = [];

// Function to initialize YouTube API
function onYouTubeIframeAPIReady() {
    // Initialize each video player
    document.querySelectorAll('[id^="player"]').forEach((playerElement, index) => {
        const videoId = playerElement.getAttribute('data-video-id');
        
        // Create player instance
        const player = new YT.Player(playerElement, {
            videoId: videoId,
            playerVars: {
                'autoplay': 0,
                'controls': 1,
                'rel': 0,
                'showinfo': 0,
                'modestbranding': 1,
                'playsinline': 1
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });

        // Store player instance
        players.push(player);

        // Add click event to the thumbnail
        const thumbnail = playerElement.querySelector('.youtube-thumbnail');
        if (thumbnail) {
            thumbnail.addEventListener('click', function() {
                // Hide thumbnail and show player
                thumbnail.style.display = 'none';
                player.playVideo();
            });
        }
    });
}

// When player is ready
function onPlayerReady(event) {
    // Player is ready, but we won't autoplay
}

// When player state changes
function onPlayerStateChange(event) {
    // Handle player state changes if needed
    // For example, when video ends
    if (event.data === YT.PlayerState.ENDED) {
        // Show thumbnail again when video ends
        const playerContainer = event.target.getIframe().parentElement;
        const thumbnail = playerContainer.querySelector('.youtube-thumbnail');
        if (thumbnail) {
            thumbnail.style.display = 'block';
        }
    }
}

// Load YouTube API
function loadYouTubeAPI() {
    // Check if script already exists
    if (document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        return;
    }

    // Create and append the YouTube API script
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadYouTubeAPI();
});
