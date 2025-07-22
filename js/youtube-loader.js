// YouTube Video Loader with Privacy Controls
document.addEventListener('DOMContentLoaded', function() {
    // Check if user has accepted cookies
    const hasConsent = document.cookie.includes('cookie_consent=accepted');
    
    // Function to load a YouTube video
    function loadYouTubeVideo(placeholder, iframe) {
        if (!iframe) return;
        
        // Show loading state
        const loadingOverlay = document.createElement('div');
        loadingOverlay.style.position = 'absolute';
        loadingOverlay.style.top = '0';
        loadingOverlay.style.left = '0';
        loadingOverlay.style.width = '100%';
        loadingOverlay.style.height = '100%';
        loadingOverlay.style.display = 'flex';
        loadingOverlay.style.alignItems = 'center';
        loadingOverlay.style.justifyContent = 'center';
        loadingOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        loadingOverlay.style.zIndex = '10';
        loadingOverlay.innerHTML = '<div class="spinner-border text-light" role="status"><span class="visually-hidden">Loading...</span></div>';
        
        placeholder.appendChild(loadingOverlay);
        
        // Get the data-src attribute which contains the actual YouTube URL
        const videoSrc = iframe.getAttribute('data-src');
        if (!videoSrc) return;
        
        // Set the actual src to load the video
        iframe.setAttribute('src', videoSrc);
        iframe.style.display = 'block';
        
        // When the video is loaded, remove the placeholder
        iframe.onload = function() {
            setTimeout(() => {
                placeholder.style.display = 'none';
                loadingOverlay.style.opacity = '0';
                setTimeout(() => {
                    loadingOverlay.remove();
                }, 300);
            }, 500);
        };
    }
    
    // Function to handle video placeholder clicks
    function setupVideoPlaceholders() {
        const placeholders = document.querySelectorAll('.video-placeholder');
        
        placeholders.forEach(placeholder => {
            const iframe = placeholder.nextElementSibling;
            
            // Only set up click handler if this placeholder hasn't been initialized
            if (!placeholder.dataset.initialized) {
                placeholder.dataset.initialized = 'true';
                
                placeholder.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    if (hasConsent) {
                        loadYouTubeVideo(placeholder, iframe);
                    } else {
                        // Show cookie consent banner if not already shown
                        const cookieBanner = document.getElementById('cookie-consent-banner');
                        if (cookieBanner) {
                            cookieBanner.scrollIntoView({ behavior: 'smooth' });
                        } else {
                            // Fallback in case the banner isn't there for some reason
                            alert('Please accept cookies to view this content.');
                        }
                    }
                });
                
                // Add keyboard accessibility
                placeholder.setAttribute('tabindex', '0');
                placeholder.setAttribute('role', 'button');
                placeholder.setAttribute('aria-label', 'Play video');
                
                placeholder.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.click();
                    }
                });
            }
        });
    }
    
    // Initialize video placeholders
    setupVideoPlaceholders();
    
    // Re-initialize placeholders if the DOM is updated (e.g., after accepting cookies)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                setupVideoPlaceholders();
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Handle cookie consent changes
    document.addEventListener('cookieConsentChanged', function(e) {
        if (e.detail && e.detail.consentGiven) {
            // If user just gave consent, reload any videos that were previously blocked
            const blockedVideos = document.querySelectorAll('.video-placeholder[data-blocked="true"]');
            blockedVideos.forEach(placeholder => {
                const iframe = placeholder.nextElementSibling;
                if (iframe) {
                    loadYouTubeVideo(placeholder, iframe);
                }
            });
        }
    });
});
