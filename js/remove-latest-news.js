// Remove the second 'Latest News' section
document.addEventListener('DOMContentLoaded', function() {
    // Find all sections that contain 'Latest News' in their h2
    const sections = document.querySelectorAll('section');
    let newsSectionCount = 0;
    
    sections.forEach(section => {
        const h2 = section.querySelector('h2.section-title');
        if (h2 && h2.textContent.trim().toLowerCase().includes('latest news')) {
            newsSectionCount++;
            // If this is the second news section, remove it
            if (newsSectionCount > 1) {
                section.remove();
                console.log('Removed duplicate news section');
            }
        }
    });
});
