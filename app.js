// AegisCore Security Framework Website JavaScript
// Pure vanilla JavaScript with no external dependencies

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initSmoothScrolling();
    initActiveMenuHighlight();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    // Hide/show navbar on scroll
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            if (currentScrollY > lastScrollY) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Mobile menu toggle (if needed in future)
    // This is prepared for potential mobile menu implementation
    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth <= 768) {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '70px';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = 'rgba(10, 10, 10, 0.95)';
        navMenu.style.backdropFilter = 'blur(10px)';
        navMenu.style.borderBottom = '1px solid #2a2a2a';
        navMenu.style.padding = '20px';
        navMenu.style.transform = 'translateY(-100%)';
        navMenu.style.transition = 'transform 0.3s ease';
        navMenu.style.opacity = '0';
        navMenu.style.pointerEvents = 'none';
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Active menu highlighting based on current page
function initActiveMenuHighlight() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        // Remove active class from all links
        link.classList.remove('active');
        
        // Add active class to current page link
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === '/' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger animation for multiple elements
                const delay = entry.target.dataset.delay || 0;
                entry.target.style.transitionDelay = `${delay}ms`;
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        // Add stagger delay for grid items
        if (element.closest('.features-grid, .modes-grid, .requirements-grid, .support-grid')) {
            element.dataset.delay = index * 100;
        }
        
        observer.observe(element);
    });
}

// Add parallax effect to hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        hero.style.transform = `translateY(${rate}px)`;
    });
}

// Add typing effect to hero title (optional enhancement)
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid #00d4ff';
    
    let index = 0;
    const typeSpeed = 50;
    
    function type() {
        if (index < text.length) {
            heroTitle.textContent += text.charAt(index);
            index++;
            setTimeout(type, typeSpeed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    // Start typing after a short delay
    setTimeout(type, 500);
}

// Add hover effect to cards
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.feature-card, .mode-card, .support-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add glow effect to buttons on hover
function initButtonGlowEffect() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.5)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', function() {
    initParallaxEffect();
    initTypingEffect();
    initCardHoverEffects();
    initButtonGlowEffect();
    
    // Throttle scroll events for better performance
    const throttledScroll = throttle(function() {
        // Scroll-based animations can be added here
    }, 16); // ~60fps
    
    window.addEventListener('scroll', throttledScroll);
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close any open modals (if implemented in future)
    if (e.key === 'Escape') {
        // Future modal closing logic
    }
    
    // Tab key navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// Remove keyboard navigation class when using mouse
document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add loading animation removal
window.addEventListener('load', function() {
    // Remove any loading screens if added in future
    document.body.classList.add('loaded');
});

// Error handling for missing elements
function safeQuerySelector(selector) {
    return document.querySelector(selector) || null;
}

// Console logging for debugging (remove in production)
const isDebug = false; // Set to false for production

function debugLog(message) {
    if (isDebug && console && console.log) {
        console.log('[AegisCore Debug]', message);
    }
}

// Initialize debug logging
debugLog('AegisCore website initialized successfully');

// Export functions for potential future use
window.AegisCore = {
    initNavigation,
    initScrollAnimations,
    initSmoothScrolling,
    initActiveMenuHighlight,
    debugLog
};
