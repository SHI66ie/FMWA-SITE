document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.gallery-item');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    
    let currentIndex = 0;
    const totalItems = items.length;
    
    // Initialize the carousel
    function initCarousel() {
        if (totalItems === 0) return;
        
        // Hide all items except the first one
        items.forEach((item, index) => {
            item.classList.remove('active');
            if (index === 0) {
                item.classList.add('active');
            }
        });
        
        // Show navigation buttons only if there's more than one item
        if (totalItems <= 1) {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
        }
    }
    
    // Go to a specific slide
    function goToSlide(index) {
        // Don't do anything if trying to go to the current slide
        if (index === currentIndex) return;
        
        // Update current index with bounds checking
        currentIndex = (index + totalItems) % totalItems;
        
        // Update active class
        items.forEach((item, i) => {
            item.classList.remove('active');
            if (i === currentIndex) {
                // Add active class with a small delay to allow for fade effect
                setTimeout(() => item.classList.add('active'), 10);
            }
        });
    }
    
    // Next slide
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    // Previous slide
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    // Event listeners for navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextSlide();
        }
    });
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const track = document.querySelector('.gallery-track');
    
    if (track) {
        track.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        track.addEventListener('touchmove', function(e) {
            touchEndX = e.touches[0].clientX;
        }, { passive: true });
        
        track.addEventListener('touchend', function() {
            handleSwipe();
        }, { passive: true });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance of swipe to trigger slide change
        const difference = touchStartX - touchEndX;
        
        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                nextSlide(); // Swipe left
            } else {
                prevSlide(); // Swipe right
            }
        }
    }
    
    // Initialize the carousel
    initCarousel();
});
