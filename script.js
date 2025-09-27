// script.js
function toggleYear(header) {
    const content = header.nextElementSibling;
    header.classList.toggle('active');
    content.classList.toggle('active');
}

// Open the first year by default
document.addEventListener('DOMContentLoaded', function() {
    const firstYear = document.querySelector('.year-header');
    if (firstYear) {
        toggleYear(firstYear);
    }
    
    // Debug supporter buttons
    const supporterLinks = document.querySelectorAll('.supporter-link');
    console.log('Supporter links found:', supporterLinks.length);
    supporterLinks.forEach((link, index) => {
        console.log(`Supporter ${index + 1}:`, link.textContent, link.style.display);
    });
});

// Force supporter buttons to be visible
window.addEventListener('load', function() {
    const supporterLinks = document.querySelectorAll('.supporter-link');
    supporterLinks.forEach(link => {
        link.style.display = 'inline-block';
        link.style.visibility = 'visible';
        link.style.opacity = '1';
    });
});
