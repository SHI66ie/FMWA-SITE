// Robust logic for DIVISIONS submenu: keep Department dropdown working as Bootstrap expects, but allow submenu to open on click without closing parent

document.addEventListener('DOMContentLoaded', function() {
    var divisionToggle = document.getElementById('divisionsDropdown');
    var divisionSubmenu = divisionToggle && divisionToggle.nextElementSibling;
    var parentDropdown = divisionToggle && divisionToggle.closest('.dropdown');

    if (divisionToggle && divisionSubmenu) {
        divisionToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // Close any other open submenus
            document.querySelectorAll('.dropdown-submenu .dropdown-menu.show').forEach(function(menu) {
                if (menu !== divisionSubmenu) menu.classList.remove('show');
            });
            // Toggle this submenu
            divisionSubmenu.classList.toggle('show');
        });
        // Prevent submenu click from closing parent
        divisionSubmenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    // Hide submenu if click occurs outside or parent closes
    document.addEventListener('click', function(e) {
        if (
            divisionSubmenu &&
            !divisionSubmenu.contains(e.target) &&
            e.target !== divisionToggle
        ) {
            divisionSubmenu.classList.remove('show');
        }
    });
    // Hide submenu if parent dropdown closes
    if (parentDropdown) {
        parentDropdown.addEventListener('hide.bs.dropdown', function() {
            divisionSubmenu.classList.remove('show');
        });
    }
});
