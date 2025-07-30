/**
 * Dropdown Click Handler
 * Makes dropdowns open only on click, not on hover
 */
document.addEventListener('DOMContentLoaded', function() {
    // Disable hover behavior and set up click-based dropdowns
    const style = document.createElement('style');
    style.textContent = `
        .dropdown > .dropdown-menu {
            display: none;
            pointer-events: auto !important;
        }
        .dropdown.show > .dropdown-menu {
            display: block !important;
        }
    `;
    document.head.appendChild(style);

    // Handle all dropdown toggle clicks
    document.addEventListener('click', function(e) {
        const toggle = e.target.closest('.dropdown-toggle');
        const dropdown = toggle ? toggle.closest('.dropdown') : null;
        
        // Close all other dropdowns first
        document.querySelectorAll('.dropdown').forEach(dd => {
            if (dd !== dropdown) {
                dd.classList.remove('show');
                const menu = dd.querySelector('.dropdown-menu');
                if (menu) menu.classList.remove('show');
                const btn = dd.querySelector('.dropdown-toggle');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Toggle the clicked dropdown if it's a dropdown toggle
        if (toggle && dropdown) {
            e.preventDefault();
            e.stopPropagation();
            
            const menu = dropdown.querySelector('.dropdown-menu');
            const isOpen = dropdown.classList.contains('show');
            
            if (isOpen) {
                dropdown.classList.remove('show');
                if (menu) menu.classList.remove('show');
                toggle.setAttribute('aria-expanded', 'false');
            } else {
                dropdown.classList.add('show');
                if (menu) menu.classList.add('show');
                toggle.setAttribute('aria-expanded', 'true');
            }
        }
        // Handle clicks outside dropdowns to close them
        else if (!e.target.closest('.dropdown-menu')) {
            document.querySelectorAll('.dropdown').forEach(dd => {
                dd.classList.remove('show');
                const menu = dd.querySelector('.dropdown-menu');
                if (menu) menu.classList.remove('show');
                const btn = dd.querySelector('.dropdown-toggle');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            });
        }
    });
    
    // Handle submenu clicks
    document.addEventListener('click', function(e) {
        const submenuItem = e.target.closest('.dropdown-submenu > .dropdown-item');
        if (!submenuItem) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        const submenu = submenuItem.nextElementSibling;
        if (!submenu) return;
            
        const isOpen = submenu.classList.contains('show');
        
        // Close all other submenus at this level
        const parentMenu = submenuItem.closest('.dropdown-menu');
        if (parentMenu) {
            parentMenu.querySelectorAll('.dropdown-submenu .dropdown-menu')
                .forEach(menu => {
                    if (menu !== submenu) {
                        menu.style.display = 'none';
                        menu.classList.remove('show');
                    }
                });
        }
        
        // Toggle current submenu
        if (isOpen) {
            submenu.style.display = 'none';
            submenu.classList.remove('show');
        } else {
            submenu.style.display = 'block';
            submenu.classList.add('show');
        }
    });
});
