// Dynamically shrink font size of department dropdown options that overflow the dropdown panel

document.addEventListener('DOMContentLoaded', function() {
    var menu = document.querySelector('.dropdown-menu[aria-labelledby="departmentDropdown"]');
    if (!menu) return;
    var maxWidth = menu.clientWidth;
    var items = menu.querySelectorAll('li:not(.dropdown-submenu) > a.dropdown-item');
    items.forEach(function(item) {
        // Reset font size if already shrunk
        item.style.fontSize = '';
        let fontSize = parseInt(window.getComputedStyle(item).fontSize);
        while (item.scrollWidth > maxWidth && fontSize > 4) {
            fontSize -= 1;
            item.style.fontSize = fontSize + 'px';
        }
    });
});
