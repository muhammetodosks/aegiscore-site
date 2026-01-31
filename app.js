// AegisCore Security Framework Website JavaScript
// Pure vanilla JavaScript with no external dependencies

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initSmoothScrolling();
    initActiveMenuHighlight();
    initMicroInteractions();
    initAdvancedAnimations();
    initThemeToggle();
    initUserAnalytics();
});

// User Analytics Integration
function initUserAnalytics() {
    // Add analytics to all pages
    if (document.getElementById('userCounter')) {
        startGlobalUserCounter();
    }
    
    // Add floating user counter to all pages
    if (!document.querySelector('.floating-user-counter')) {
        createFloatingUserCounter();
    }
}

function createFloatingUserCounter() {
    const counter = document.createElement('div');
    counter.className = 'floating-user-counter';
    counter.innerHTML = `
        <div class="counter-icon">👥</div>
        <div class="counter-content">
            <div class="counter-number" id="floatingCounter">50,000</div>
            <div class="counter-label">Active Users</div>
        </div>
        <div class="counter-growth">+3,000/week</div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .floating-user-counter {
            position: fixed;
            top: 100px;
            right: 30px;
            background: rgba(0, 212, 255, 0.1);
            border: 1px solid rgba(0, 212, 255, 0.3);
            border-radius: 12px;
            padding: 1rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            backdrop-filter: blur(10px);
            z-index: 999;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .floating-user-counter:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
        }
        
        .counter-icon {
            font-size: 1.5rem;
        }
        
        .counter-content {
            text-align: center;
        }
        
        .counter-number {
            font-size: 1.2rem;
            font-weight: 700;
            color: #00d4ff;
            font-variant-numeric: tabular-nums;
        }
        
        .counter-label {
            font-size: 0.8rem;
            color: #b0b0b0;
        }
        
        .counter-growth {
            font-size: 0.8rem;
            color: #00ff88;
            font-weight: 600;
        }
        
        @media (max-width: 768px) {
            .floating-user-counter {
                top: auto;
                bottom: 100px;
                right: 20px;
                left: 20px;
                justify-content: center;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(counter);
    
    // Make counter clickable to go to analytics
    counter.addEventListener('click', function() {
        window.location.href = 'analytics.html';
    });
    
    // Start counter animation
    startFloatingCounter();
}

function startFloatingCounter() {
    const counter = document.getElementById('floatingCounter');
    const heroCounter = document.getElementById('heroUserCount');
    if (!counter && !heroCounter) return;
    
    let userCount = 50000;
    const weeklyGrowth = 3000;
    const weeksSinceLaunch = Math.floor((Date.now() - new Date('2024-01-01').getTime()) / (7 * 24 * 60 * 60 * 1000));
    userCount = userCount + (weeksSinceLaunch * weeklyGrowth);
    
    // Animate to current count
    let currentCount = 50000;
    const targetCount = userCount;
    const increment = (targetCount - currentCount) / 50;
    
    const updateCounter = () => {
        currentCount += increment;
        if (currentCount < targetCount) {
            const displayCount = Math.floor(currentCount).toLocaleString();
            if (counter) counter.textContent = displayCount;
            if (heroCounter) heroCounter.textContent = displayCount + '+';
            requestAnimationFrame(updateCounter);
        } else {
            const displayCount = targetCount.toLocaleString();
            if (counter) counter.textContent = displayCount;
            if (heroCounter) heroCounter.textContent = displayCount + '+';
        }
    };
    
    updateCounter();
    
    // Simulate real-time growth
    setInterval(() => {
        userCount += Math.floor(Math.random() * 3) + 1;
        const displayCount = userCount.toLocaleString();
        if (counter) counter.textContent = displayCount;
        if (heroCounter) heroCounter.textContent = displayCount + '+';
    }, 8000);
}

function startGlobalUserCounter() {
    const counter = document.getElementById('userCounter');
    if (!counter) return;
    
    let userCount = 50000;
    const weeklyGrowth = 3000;
    const weeksSinceLaunch = Math.floor((Date.now() - new Date('2024-01-01').getTime()) / (7 * 24 * 60 * 60 * 1000));
    userCount = userCount + (weeksSinceLaunch * weeklyGrowth);
    
    // Animate counter
    let currentCount = 0;
    const targetCount = userCount;
    const increment = targetCount / 100;
    
    const updateCounter = () => {
        currentCount += increment;
        if (currentCount < targetCount) {
            counter.textContent = Math.floor(currentCount).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = targetCount.toLocaleString();
        }
    };
    
    updateCounter();
    
    // Simulate real-time growth
    setInterval(() => {
        userCount += Math.floor(Math.random() * 10) + 1;
        counter.textContent = userCount.toLocaleString();
    }, 5000);
}

// Theme Toggle Functionality
function initThemeToggle() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    document.body.appendChild(themeToggle);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('aegiscore-theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.innerHTML = '☀️';
    }
    
    // Add click handler
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        
        // Update button icon
        this.innerHTML = isLight ? '☀️' : '🌙';
        
        // Save preference
        localStorage.setItem('aegiscore-theme', isLight ? 'light' : 'dark');
        
        // Add transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        // Trigger reflow for smooth transition
        document.body.offsetHeight;
    });
    
    // Add keyboard shortcut (Ctrl/Cmd + Shift + T)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            themeToggle.click();
        }
    });
}

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

// Enhanced scroll animations with multiple animation types
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

    // Observe all animation elements
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    animatedElements.forEach((element, index) => {
        // Add stagger delay for grid items
        if (element.closest('.features-grid, .modes-grid, .requirements-grid, .support-grid, .dashboard-grid')) {
            element.dataset.delay = index * 100;
        }
        
        observer.observe(element);
    });
}

// Micro-interactions for enhanced user experience
function initMicroInteractions() {
    // Enhanced button interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Card hover effects with parallax
    const cards = document.querySelectorAll('.feature-card, .mode-card, .support-item, .stat-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Smooth number counting animations
    const counters = document.querySelectorAll('[data-counter]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-counter'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Advanced animations and effects
function initAdvancedAnimations() {
    // Floating elements
    const floatingElements = document.querySelectorAll('.floating');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });

    // Typing effect for hero titles
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '3px solid #00d4ff';
        
        let index = 0;
        const typeSpeed = 100;
        
        function type() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(type, typeSpeed);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        setTimeout(type, 500);
    }

    // Particle effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        createParticleEffect(hero);
    }

    // Glitch effect for specific elements
    const glitchElements = document.querySelectorAll('.glitch');
    glitchElements.forEach(element => {
        element.addEventListener('mouseover', function() {
            this.classList.add('glitch-active');
            setTimeout(() => {
                this.classList.remove('glitch-active');
            }, 200);
        });
    });
}

// Create particle effect
function createParticleEffect(container) {
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 212, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${10 + Math.random() * 20}s linear infinite;
        `;
        
        container.appendChild(particle);
    }
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
    initMicroInteractions,
    initAdvancedAnimations,
    initThemeToggle,
    initUserAnalytics,
    debugLog
};
