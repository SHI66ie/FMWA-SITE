document.addEventListener('DOMContentLoaded', function() {
    // Function to handle section highlighting
    function setupSectionHighlight(linkClass, sectionId) {
        const link = document.querySelector(linkClass);
        const section = document.getElementById(sectionId);

        if (link && section) {
            link.addEventListener('click', function(e) {
                // Remove highlight from all sections first
                document.querySelectorAll('.feature-box').forEach(box => {
                    box.classList.remove('highlight');
                });
                
                // Force reflow to reset animation
                void section.offsetWidth;
                
                // Add highlight class to trigger animation
                section.classList.add('highlight');
                
                // Remove highlight class after animation completes
                setTimeout(() => {
                    section.classList.remove('highlight');
                }, 3000);
            });
        }
    }

    // Set up highlighting for each section
    setupSectionHighlight('.mandate-link', 'mandate-section');
    setupSectionHighlight('.mission-link', 'mission-section');
    setupSectionHighlight('.vision-link', 'vision-section');
});
