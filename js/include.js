/**
 * Include HTML content from external files into elements with w3-include-html attribute
 */
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain attribute: */
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
    
    // Initialize dropdown menus after including content
    initializeDropdowns();
}

/**
 * Initialize Bootstrap dropdown menus
 */
function initializeDropdowns() {
    // Initialize all dropdowns
    var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
        return new bootstrap.Dropdown(dropdownToggleEl, {
            autoClose: 'outside',
            popperConfig: function(defaultBsPopperConfig) {
                return {
                    ...defaultBsPopperConfig,
                    strategy: 'fixed'
                };
            }
        });
    });
    
    // Handle submenu hover for desktop
    if (window.innerWidth >= 992) {
        document.querySelectorAll('.dropdown, .dropdown-submenu').forEach(function(element) {
            // Mouse enter handler
            element.addEventListener('mouseenter', function(e) {
                const toggle = this.querySelector('.dropdown-toggle');
                if (toggle) {
                    const dropdown = bootstrap.Dropdown.getInstance(toggle);
                    if (dropdown) {
                        dropdown.show();
                    }
                }
            });
            
            // Mouse leave handler
            element.addEventListener('mouseleave', function(e) {
                const toggle = this.querySelector('.dropdown-toggle');
                if (toggle) {
                    const dropdown = bootstrap.Dropdown.getInstance(toggle);
                    if (dropdown) {
                        dropdown.hide();
                    }
                }
            });
        });
    }
    
    // Handle touch events for mobile
    document.addEventListener('click', function(e) {
        const target = e.target;
        if (window.innerWidth < 992) {
            if (target.matches('.dropdown-toggle')) {
                e.preventDefault();
                const dropdown = bootstrap.Dropdown.getInstance(target);
                if (dropdown) {
                    dropdown.toggle();
                }
            }
        }
    });
}

// Call includeHTML when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', includeHTML);
} else {
    includeHTML();
}

// Back to top button functionality
window.addEventListener('scroll', function() {
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }
});

document.addEventListener('click', function(e) {
    if (e.target.closest('.back-to-top')) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});
