// Modern Venture Day Archives - Enhanced JavaScript
function toggleYear(header) {
    const content = header.nextElementSibling;
    const isExpanded = header.classList.contains('active');
    
    // Toggle classes
    header.classList.toggle('active');
    content.classList.toggle('active');
    
    // Update ARIA attributes for accessibility
    header.setAttribute('aria-expanded', !isExpanded);
    
    // Add smooth scroll to content if opening
    if (!isExpanded) {
        setTimeout(() => {
            content.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 100);
    }
}

// Enhanced keyboard navigation
function handleKeyPress(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleYear(event.target);
    }
}

// Intersection Observer for animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe all year sections
    document.querySelectorAll('.year-section').forEach(section => {
        observer.observe(section);
    });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll-based effects
function setupScrollEffects() {
    const debouncedScroll = debounce(() => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.header');
        
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }, 10);
    
    window.addEventListener('scroll', debouncedScroll);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Open the first year by default
    const firstYear = document.querySelector('.year-header');
    if (firstYear) {
        toggleYear(firstYear);
    }
    
    // Add keyboard event listeners to year headers
    document.querySelectorAll('.year-header').forEach(header => {
        header.addEventListener('keypress', handleKeyPress);
    });
    
    // Setup enhanced features
    setupIntersectionObserver();
    setupSmoothScrolling();
    setupScrollEffects();
    
    // Add loading animation completion
    document.body.classList.add('loaded');
    
    // Debug supporter links (keeping original functionality)
    const supporterLinks = document.querySelectorAll('.year-supporter-link');
    console.log('Supporter links found:', supporterLinks.length);
    supporterLinks.forEach((link, index) => {
        console.log(`Supporter ${index + 1}:`, link.textContent);
    });
});

// Enhanced supporter link visibility (keeping original functionality)
window.addEventListener('load', function() {
    const supporterLinks = document.querySelectorAll('.year-supporter-link');
    supporterLinks.forEach(link => {
        link.style.display = 'inline-block';
        link.style.visibility = 'visible';
        link.style.opacity = '1';
    });
});

// Add touch support for mobile
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {}, {passive: true});
}

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}