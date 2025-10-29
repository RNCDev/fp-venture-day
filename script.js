// Simplified Venture Day Archives JavaScript
function toggleYear(header) {
    const content = header.nextElementSibling;
    const isExpanded = header.classList.contains('active');
    
    header.classList.toggle('active');
    content.classList.toggle('active');
    header.setAttribute('aria-expanded', !isExpanded);
}

// Enhanced keyboard navigation
function handleKeyPress(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleYear(event.target);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if default year is already active (from server-side rendering)
    // If not, open it. Otherwise, leave it as is.
    const defaultYear = document.querySelector('[data-default="true"]');
    if (defaultYear) {
        const header = defaultYear.querySelector('.year-header');
        const content = defaultYear.querySelector('.year-content');
        // Only toggle if it's not already active
        if (header && !header.classList.contains('active')) {
            header.classList.add('active');
            content.classList.add('active');
            header.setAttribute('aria-expanded', 'true');
        }
    } else {
        // Fallback: open first year if no default specified
        const firstYear = document.querySelector('.year-header');
        if (firstYear && !firstYear.classList.contains('active')) {
            toggleYear(firstYear);
        }
    }
    
    // Add keyboard event listeners to year headers
    document.querySelectorAll('.year-header').forEach(header => {
        header.addEventListener('keypress', handleKeyPress);
    });
});
