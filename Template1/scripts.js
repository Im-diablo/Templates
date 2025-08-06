// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav__menu');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');

// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setTheme(this.theme);
        this.bindEvents();
        this.updateToggleIcon();
    }

    bindEvents() {
        themeToggle?.addEventListener('click', () => this.toggle());
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateToggleIcon();
    }

    toggle() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    updateToggleIcon() {
        if (themeToggle) {
            const icon = themeToggle.querySelector('.theme-toggle__icon');
            icon.textContent = this.theme === 'light' ? '🌙' : '☀️';
        }
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateActiveLink();
    }

    bindEvents() {
        navToggle?.addEventListener('click', () => this.toggle());
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => this.close());
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav') && this.isOpen) {
                this.close();
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.isOpen = true;
        navMenu?.classList.add('active');
        navToggle?.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.isOpen = false;
        navMenu?.classList.remove('active');
        navToggle?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    updateActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav__link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.animate-on-scroll');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.createObserver();
        } else {
            // Fallback for older browsers
            this.elements.forEach(el => el.classList.add('animate'));
        }
    }

    createObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.elements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Form Validation and Handling
class FormManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindContactForm();
        this.bindNewsletterForm();
        this.initializeFormAnimations();
    }

    bindContactForm() {
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validateContactForm()) {
                this.submitContactForm();
            }
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearErrors(input));
        });
    }

    bindNewsletterForm() {
        if (!newsletterForm) return;

        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validateNewsletterForm()) {
                this.submitNewsletterForm();
            }
        });

        // Real-time validation
        const inputs = newsletterForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearErrors(input));
        });
    }

    validateContactForm() {
        const requiredFields = ['firstName', 'lastName', 'email', 'service', 'message', 'consent'];
        let isValid = true;

        requiredFields.forEach(fieldName => {
            const field = contactForm.querySelector(`[name="${fieldName}"]`);
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateNewsletterForm() {
        const requiredFields = ['name', 'email', 'consent'];
        let isValid = true;

        requiredFields.forEach(fieldName => {
            const field = newsletterForm.querySelector(`[name="${fieldName}"]`);
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        if (!field) return true;

        const value = field.value.trim();
        const name = field.name;
        const errorElement = document.getElementById(`${name}-error`);
        
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.required && !value) {
            isValid = false;
            errorMessage = 'This field is required.';
        }
        
        // Email validation
        else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        }
        
        // Phone validation (if provided)
        else if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number.';
            }
        }
        
        // Checkbox validation
        else if (field.type === 'checkbox' && field.required && !field.checked) {
            isValid = false;
            errorMessage = 'Please check this box to continue.';
        }

        // Display error
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = errorMessage ? 'block' : 'none';
        }

        // Add/remove error styling
        if (isValid) {
            field.classList.remove('error');
        } else {
            field.classList.add('error');
        }

        return isValid;
    }

    clearErrors(field) {
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        field.classList.remove('error');
    }

    async submitContactForm() {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        try {
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            this.showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
            contactForm.reset();
            
        } catch (error) {
            this.showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }

    async submitNewsletterForm() {
        const submitButton = newsletterForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        try {
            // Show loading state
            submitButton.textContent = 'Subscribing...';
            submitButton.disabled = true;
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            this.showNotification('Welcome to our newsletter! Check your email for confirmation.', 'success');
            newsletterForm.reset();
            
        } catch (error) {
            this.showNotification('Sorry, there was an error with your subscription. Please try again.', 'error');
        } finally {
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }

    initializeFormAnimations() {
        // Add focus animations to form inputs
        const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Initialize state for pre-filled inputs
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <span class="notification__icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
                <span class="notification__message">${message}</span>
                <button class="notification__close" aria-label="Close notification">×</button>
            </div>
        `;

        // Add styles if not already present
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    max-width: 400px;
                    background: var(--bg-primary);
                    border: 1px solid var(--bg-accent);
                    border-radius: var(--radius-md);
                    box-shadow: var(--shadow-xl);
                    z-index: 10000;
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                }
                
                .notification--success {
                    border-left: 4px solid var(--success);
                }
                
                .notification--error {
                    border-left: 4px solid var(--error);
                }
                
                .notification--info {
                    border-left: 4px solid var(--primary);
                }
                
                .notification__content {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                    padding: var(--spacing-md);
                }
                
                .notification__icon {
                    font-size: var(--font-size-lg);
                    font-weight: bold;
                }
                
                .notification--success .notification__icon {
                    color: var(--success);
                }
                
                .notification--error .notification__icon {
                    color: var(--error);
                }
                
                .notification--info .notification__icon {
                    color: var(--primary);
                }
                
                .notification__message {
                    flex: 1;
                    color: var(--text-primary);
                }
                
                .notification__close {
                    background: none;
                    border: none;
                    font-size: var(--font-size-lg);
                    cursor: pointer;
                    color: var(--text-secondary);
                    padding: 0;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .notification__close:hover {
                    color: var(--text-primary);
                }
                
                .notification.show {
                    transform: translateX(0);
                }
            `;
            document.head.appendChild(styles);
        }

        // Add to DOM
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Add close functionality
        const closeButton = notification.querySelector('.notification__close');
        closeButton.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
}

// FAQ Functionality
class FAQManager {
    constructor() {
        this.init();
    }

    init() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-item__question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }
}

// Smooth Scroll for Anchor Links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Performance Optimizations
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images
        this.lazyLoadImages();
        
        // Debounce resize events
        this.debounceResize();
        
        // Optimize scroll events
        this.optimizeScroll();
    }

    lazyLoadImages() {
        if ('loading' in HTMLImageElement.prototype) {
            // Native lazy loading support
            const images = document.querySelectorAll('img[data-src]');
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        } else {
            // Fallback for older browsers
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    debounceResize() {
        let resizeTimeout;
        
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Trigger custom resize event
                window.dispatchEvent(new CustomEvent('debouncedResize'));
            }, 250);
        });
    }

    optimizeScroll() {
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    // Trigger custom scroll event
                    window.dispatchEvent(new CustomEvent('optimizedScroll'));
                    scrollTimeout = null;
                }, 16); // ~60fps
            }
        });
    }
}

// Accessibility Enhancements
class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        this.enhanceKeyboardNavigation();
        this.addSkipLinks();
        this.manageFocus();
        this.addARIALabels();
    }

    enhanceKeyboardNavigation() {
        // Ensure all interactive elements are keyboard accessible
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Add focus indicators
        const style = document.createElement('style');
        style.textContent = `
            .keyboard-navigation *:focus {
                outline: 2px solid var(--primary) !important;
                outline-offset: 2px !important;
            }
        `;
        document.head.appendChild(style);
    }

    addSkipLinks() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        
        const skipLinkStyles = document.createElement('style');
        skipLinkStyles.textContent = `
            .skip-link {
                position: absolute;
                top: -40px;
                left: 6px;
                background: var(--primary);
                color: white;
                padding: 8px;
                text-decoration: none;
                z-index: 10001;
                border-radius: 4px;
            }
            
            .skip-link:focus {
                top: 6px;
            }
        `;
        
        document.head.appendChild(skipLinkStyles);
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add main landmark if it doesn't exist
        const main = document.querySelector('main');
        if (main && !main.id) {
            main.id = 'main';
        }
    }

    manageFocus() {
        // Manage focus for modal-like interactions
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.querySelector('.nav__menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                setTimeout(() => {
                    if (navMenu.classList.contains('active')) {
                        const firstLink = navMenu.querySelector('.nav__link');
                        if (firstLink) {
                            firstLink.focus();
                        }
                    }
                }, 100);
            });
        }
    }

    addARIALabels() {
        // Add ARIA labels to important elements
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', 'Toggle dark mode');
        }

        const navToggle = document.getElementById('navToggle');
        if (navToggle) {
            navToggle.setAttribute('aria-label', 'Toggle navigation menu');
            navToggle.setAttribute('aria-expanded', 'false');
        }

        // Add role attributes where needed
        const nav = document.querySelector('.nav__menu');
        if (nav) {
            nav.setAttribute('role', 'navigation');
        }
    }
}

// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    new ThemeManager();
    new NavigationManager();
    new ScrollAnimations();
    new FormManager();
    new FAQManager();
    new SmoothScroll();
    
    // Performance and accessibility
    new PerformanceOptimizer();
    new AccessibilityManager();
    
    // Add loading class removal
    document.body.classList.add('loaded');
});

// Handle page load performance
window.addEventListener('load', () => {
    // Remove any loading indicators
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
});

// Service worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(registrationError => console.log('SW registration failed'));
    });
}