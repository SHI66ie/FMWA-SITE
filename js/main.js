// This script is no longer needed as we want to keep all sections visible
// The content is now properly managed in the HTML

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Initialize tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === "#") return; // Ignore dummy links
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'btn btn-primary btn-floating btn-lg back-to-top';
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animated');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// Initialize carousel
const myCarousel = document.querySelector('#heroCarousel');
const carousel = new bootstrap.Carousel(myCarousel, {
    interval: 5000,
    touch: true
});

// Add animation to carousel captions
myCarousel.addEventListener('slide.bs.carousel', function (e) {
    const activeItem = e.relatedTarget;
    const caption = activeItem.querySelector('.carousel-caption');
    
    // Reset animation
    const h2 = caption.querySelector('h2');
    const p = caption.querySelector('p');
    
    h2.style.animation = 'none';
    p.style.animation = 'none';
    
    // Trigger reflow
    void h2.offsetWidth;
    void p.offsetWidth;
    
    // Re-add animation
    h2.style.animation = 'fadeInUp 1s ease';
    p.style.animation = 'fadeInUp 1s ease 0.3s';
});

// Enhanced mobile menu functionality for all browsers including Safari
document.addEventListener('DOMContentLoaded', function() {
    // Get the navbar toggler and menu elements
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add smooth dropdown animation
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle the 'show' class with animation
            if (navbarCollapse.classList.contains('show')) {
                // Closing animation
                navbarCollapse.style.maxHeight = navbarCollapse.scrollHeight + 'px';
                // Trigger reflow
                void navbarCollapse.offsetHeight;
                navbarCollapse.style.maxHeight = '0';
                
                // After animation completes, remove the show class
                setTimeout(() => {
                    navbarCollapse.classList.remove('show');
                    navbarCollapse.style.maxHeight = ''; // Reset max-height
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }, 300); // Match this with your CSS transition time
            } else {
                // Opening animation
                navbarCollapse.classList.add('show');
                navbarCollapse.style.maxHeight = '0';
                // Trigger reflow
                void navbarCollapse.offsetHeight;
                navbarCollapse.style.maxHeight = navbarCollapse.scrollHeight + 'px';
                navbarToggler.setAttribute('aria-expanded', 'true');
                
                // After animation completes, set to auto height
                setTimeout(() => {
                    if (navbarCollapse.classList.contains('show')) {
                        navbarCollapse.style.maxHeight = '';
                    }
                }, 300);
            }
        });
        
        // Close menu when clicking on a nav link (for mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                    navbarCollapse.style.maxHeight = '0';
                    setTimeout(() => {
                        navbarCollapse.classList.remove('show');
                        navbarToggler.setAttribute('aria-expanded', 'false');
                    }, 300);
                }
            });
        });
    }
        // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 992 && navbarCollapse && navbarCollapse.classList.contains('show')) {
            if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                // Use our custom animation for closing
                navbarCollapse.style.maxHeight = navbarCollapse.scrollHeight + 'px';
                void navbarCollapse.offsetHeight; // Trigger reflow
                navbarCollapse.style.maxHeight = '0';
                
                setTimeout(() => {
                    navbarCollapse.classList.remove('show');
                    navbarCollapse.style.maxHeight = '';
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }, 300);
            }
        }
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth >= 992) {
                // Reset styles on desktop
                if (navbarCollapse) {
                    navbarCollapse.style.maxHeight = '';
                    navbarCollapse.classList.remove('show');
                }
                if (navbarToggler) {
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }
            }
        }, 250);
    });
});

// Form validation
const forms = document.querySelectorAll('.needs-validation');

Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        form.classList.add('was-validated');
    }, false);
});

// Lazy loading images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
    
    if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});

