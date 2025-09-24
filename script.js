// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initDropdownMenus();
    initSearchFunctionality();
    initSmoothScrolling();
    initAnimations();
    initLanguageSelector();
    initNewsCarousel();
    initServiceCards();
    initAccessibility();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Toggle icon
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// Dropdown Menu Functionality
function initDropdownMenus() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('a');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (trigger && menu) {
            // Desktop hover behavior
            dropdown.addEventListener('mouseenter', function() {
                menu.style.display = 'block';
                setTimeout(() => {
                    menu.style.opacity = '1';
                    menu.style.visibility = 'visible';
                    menu.style.transform = 'translateY(0)';
                }, 10);
            });
            
            dropdown.addEventListener('mouseleave', function() {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    menu.style.display = 'none';
                }, 300);
            });
            
            // Mobile click behavior
            trigger.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const isActive = menu.style.display === 'block';
                    
                    // Close all other dropdowns
                    document.querySelectorAll('.dropdown-menu').forEach(otherMenu => {
                        if (otherMenu !== menu) {
                            otherMenu.style.display = 'none';
                        }
                    });
                    
                    // Toggle current dropdown
                    menu.style.display = isActive ? 'none' : 'block';
                }
            });
        }
    });
}

// Search Functionality
function initSearchFunctionality() {
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    if (searchInput && searchButton) {
        // Search on button click
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
        
        // Real-time search suggestions (optional)
        searchInput.addEventListener('input', function() {
            const query = searchInput.value;
            if (query.length > 2) {
                showSearchSuggestions(query);
            } else {
                hideSearchSuggestions();
            }
        });
    }
}

function performSearch(query) {
    if (query.trim()) {
        // Simulate search functionality
        console.log('Searching for:', query);
        
        // In a real implementation, this would make an API call
        // For now, we'll show a simple alert
        alert(`Buscando: "${query}"\n\nEsta funcionalidad se conectaría con el sistema de búsqueda del ministerio.`);
    }
}

function showSearchSuggestions(query) {
    // Create suggestions dropdown if it doesn't exist
    let suggestions = document.querySelector('.search-suggestions');
    if (!suggestions) {
        suggestions = document.createElement('div');
        suggestions.className = 'search-suggestions';
        suggestions.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            z-index: 1000;
            max-height: 200px;
            overflow-y: auto;
        `;
        
        const searchBox = document.querySelector('.search-box');
        searchBox.style.position = 'relative';
        searchBox.appendChild(suggestions);
    }
    
    // Mock suggestions based on query
    const mockSuggestions = [
        'Autorizaciones ambientales',
        'Áreas protegidas',
        'Reforestación',
        'Cambio climático',
        'Biodiversidad',
        'Recursos forestales',
        'Gestión ambiental'
    ].filter(item => item.toLowerCase().includes(query.toLowerCase()));
    
    suggestions.innerHTML = mockSuggestions.map(item => 
        `<div class="suggestion-item" style="padding: 10px; cursor: pointer; border-bottom: 1px solid #f0f0f0;">
            ${item}
        </div>`
    ).join('');
    
    // Add click handlers to suggestions
    suggestions.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelector('.search-box input').value = item.textContent;
            hideSearchSuggestions();
            performSearch(item.textContent);
        });
        
        item.addEventListener('mouseenter', function() {
            item.style.backgroundColor = '#f8f9fa';
        });
        
        item.addEventListener('mouseleave', function() {
            item.style.backgroundColor = 'white';
        });
    });
}

function hideSearchSuggestions() {
    const suggestions = document.querySelector('.search-suggestions');
    if (suggestions) {
        suggestions.remove();
    }
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animation on Scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .news-item, .learn-more-item, .additional-service, .institution');
    animatedElements.forEach(el => observer.observe(el));
}

// Language Selector
function initLanguageSelector() {
    const languageSelectors = document.querySelectorAll('.language-selector span, .language-footer span');
    
    languageSelectors.forEach(selector => {
        selector.addEventListener('click', function() {
            const language = this.textContent.trim();
            
            // Remove active class from siblings
            this.parentNode.querySelectorAll('span').forEach(sibling => {
                sibling.classList.remove('active');
            });
            
            // Add active class to clicked element
            this.classList.add('active');
            
            // Simulate language change
            console.log('Language changed to:', language);
            
            // In a real implementation, this would change the page language
            showLanguageChangeNotification(language);
        });
    });
}

function showLanguageChangeNotification(language) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2c5530;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 600;
    `;
    notification.textContent = `Idioma cambiado a: ${language}`;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// News Carousel (if needed)
function initNewsCarousel() {
    const newsContainer = document.querySelector('.news-grid');
    if (!newsContainer) return;
    
    // Add navigation arrows for news section
    const newsSection = document.querySelector('.news-section');
    if (newsSection) {
        const prevButton = document.createElement('button');
        const nextButton = document.createElement('button');
        
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        
        prevButton.className = 'news-nav news-nav-prev';
        nextButton.className = 'news-nav news-nav-next';
        
        prevButton.style.cssText = `
            position: absolute;
            left: -50px;
            top: 50%;
            transform: translateY(-50%);
            background: #2c5530;
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s;
        `;
        
        nextButton.style.cssText = `
            position: absolute;
            right: -50px;
            top: 50%;
            transform: translateY(-50%);
            background: #2c5530;
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s;
        `;
        
        newsSection.style.position = 'relative';
        newsSection.appendChild(prevButton);
        newsSection.appendChild(nextButton);
        
        // Add hover effects
        [prevButton, nextButton].forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.background = '#1a3d1e';
                this.style.transform = 'translateY(-50%) scale(1.1)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.background = '#2c5530';
                this.style.transform = 'translateY(-50%) scale(1)';
            });
        });
    }
}

// Service Cards Enhancement
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card, .quick-service, .additional-service');
    
    serviceCards.forEach(card => {
        // Add click tracking
        card.addEventListener('click', function() {
            const title = this.querySelector('h3, h4')?.textContent || 'Servicio';
            console.log('Service clicked:', title);
            
            // Add visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Add keyboard navigation
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Accessibility Enhancements
function initAccessibility() {
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.className = 'sr-only';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #2c5530;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
    
    // Add ARIA labels to interactive elements
    const dropdownTriggers = document.querySelectorAll('.dropdown > a');
    dropdownTriggers.forEach(trigger => {
        trigger.setAttribute('aria-haspopup', 'true');
        trigger.setAttribute('aria-expanded', 'false');
    });
    
    // Add role attributes
    const nav = document.querySelector('.nav-menu');
    if (nav) {
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Navegación principal');
    }
    
    // Enhance form accessibility
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.setAttribute('aria-label', 'Buscar en el sitio web');
        searchInput.setAttribute('placeholder', 'Buscar...');
    }
}

// Utility Functions
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

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Performance Monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});

// Service Worker Registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initMobileMenu,
        initDropdownMenus,
        initSearchFunctionality,
        performSearch,
        debounce,
        throttle
    };
}
