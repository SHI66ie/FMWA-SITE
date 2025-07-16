// Show full text as a tooltip-like popup on hover for truncated department dropdown options

document.addEventListener('DOMContentLoaded', function() {
    // Department dropdown options
    var deptItems = document.querySelectorAll('.dropdown-menu[aria-labelledby="departmentDropdown"] > li:not(.dropdown-submenu) > a.dropdown-item');
    // DIVISIONS submenu options
    var divisionItems = document.querySelectorAll('.dropdown-submenu > .dropdown-menu > li > a.dropdown-item');
    var items = Array.from(deptItems).concat(Array.from(divisionItems));
    items.forEach(function(item) {
        item.addEventListener('mouseenter', function(e) {
            if (item.scrollWidth > item.clientWidth) {
                // Create tooltip div
                var tooltip = document.createElement('div');
                tooltip.textContent = item.textContent;
                tooltip.style.position = 'fixed';
                var rect = item.getBoundingClientRect();
                tooltip.style.left = (rect.right + 8) + 'px';
                tooltip.style.top = rect.top + 'px';
                tooltip.style.background = '#fff';
                tooltip.style.color = '#014903';
                tooltip.style.border = '1px solid #ccc';
                tooltip.style.padding = '2px 8px';
                tooltip.style.fontSize = '12px';
                tooltip.style.borderRadius = '4px';
                tooltip.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
                tooltip.style.zIndex = 9999;
                tooltip.className = 'dropdown-tooltip-popup';
                document.body.appendChild(tooltip);
            }
        });
        item.addEventListener('mouseleave', function(e) {
            var tooltip = document.querySelector('.dropdown-tooltip-popup');
            if (tooltip) tooltip.remove();
        });
    });
});
