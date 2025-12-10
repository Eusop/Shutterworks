// ==========================================
// INITIALIZE ALL FUNCTIONS ON PAGE LOAD
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeFAQ();
    initializeContactForm();
    initializeCarousels();
    initializeNavbar();
    initializeSmoothScroll();
    initializeImageObserver();
    initializePortfolioHover();
    updateCopyright();
});

// ==========================================
// FAQ ACCORDION FUNCTIONALITY
// ==========================================
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Close other open items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

// ==========================================
// CONTACT FORM FUNCTIONALITY
// ==========================================
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.querySelector('.btn-submit');
    
    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Log form data (in production, this would send to server)
            console.log('Form submitted:', { name, email, message });
            
            // Show alert notification
            alert('Form Submitted');
            
            // Show success message
            const formWrapper = document.getElementById('contactFormWrapper');
            if (formWrapper) {
                const formContent = formWrapper.querySelector('.contact-form-content');
                const successMessage = document.getElementById('successMessage');
                
                if (formContent && successMessage) {
                    formContent.style.display = 'none';
                    successMessage.style.display = 'block';
                }
            }
            
            // Reset form
            contactForm.reset();
        });
    }
}

// ==========================================
// PORTFOLIO CAROUSEL SYSTEM
// ==========================================
function initializeCarousels() {
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach((carousel) => {
        const track = carousel.querySelector('.carousel-track');
        const items = carousel.querySelectorAll('.carousel-item');
        const leftBtn = carousel.parentElement.querySelector('.carousel-btn-left');
        const rightBtn = carousel.parentElement.querySelector('.carousel-btn-right');
        
        if (!track || items.length === 0) return;
        
        let currentIndex = 0;
        
        // Set initial active item
        items[currentIndex].classList.add('active');
        
        function updateCarousel() {
            // Remove active class from all items
            items.forEach(item => item.classList.remove('active'));
            
            // Add active class to current item
            items[currentIndex].classList.add('active');
            
            // Calculate the offset to center the active item
            const itemWidth = items[0].offsetWidth;
            const gap = 30; // gap between items
            const offset = -(currentIndex * (itemWidth + gap));
            
            track.style.transform = `translateX(${offset}px)`;
        }
        
        // Left button navigation
        if (leftBtn) {
            leftBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            });
        }
        
        // Right button navigation
        if (rightBtn) {
            rightBtn.addEventListener('click', () => {
                if (currentIndex < items.length - 1) {
                    currentIndex++;
                    updateCarousel();
                }
            });
        }
        
        // Click on item to center it
        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            } else if (e.key === 'ArrowRight' && currentIndex < items.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });
    });
}

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.boxShadow = 'none';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        }
        
        lastScroll = currentScroll;
    });
}

// ==========================================
// LAZY LOADING WITH INTERSECTION OBSERVER
// ==========================================
function initializeImageObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe portfolio items, service cards, and testimonial cards
    const observedElements = document.querySelectorAll(
        '.portfolio-item, .service-detail, .testimonial-card, .timeline-card, .stat-card'
    );
    
    observedElements.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        imageObserver.observe(item);
    });
}

// ==========================================
// MOBILE MENU FUNCTIONALITY
// ==========================================
function createMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navContainer = document.querySelector('.nav-container');
    
    if (!navMenu || !navContainer) return;
    
    // Check if mobile menu button already exists
    if (document.querySelector('.mobile-menu-btn')) return;
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle mobile menu');
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: #d4a574;
        font-size: 28px;
        cursor: pointer;
        padding: 5px;
    `;
    
    // Insert button before nav menu
    navContainer.insertBefore(mobileMenuBtn, navMenu);
    
    // Toggle menu on button click
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-active');
        mobileMenuBtn.innerHTML = navMenu.classList.contains('mobile-active') ? '✕' : '☰';
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('mobile-active');
            mobileMenuBtn.innerHTML = '☰';
        });
    });
}

// ==========================================
// RESPONSIVE DESIGN HANDLER
// ==========================================
function handleResponsive() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768) {
        createMobileMenu();
        
        if (mobileBtn && navMenu) {
            mobileBtn.style.display = 'block';
            
            // Add mobile styles to nav-menu
            if (!navMenu.classList.contains('mobile-styled')) {
                navMenu.classList.add('mobile-styled');
                navMenu.style.cssText = `
                    position: fixed;
                    top: 70px;
                    left: -100%;
                    width: 100%;
                    height: calc(100vh - 70px);
                    background: rgba(39, 31, 23, 0.98);
                    flex-direction: column;
                    justify-content: flex-start;
                    padding: 40px;
                    transition: left 0.3s ease;
                    z-index: 999;
                `;
            }
        }
    } else {
        if (mobileBtn) {
            mobileBtn.style.display = 'none';
        }
        
        if (navMenu && navMenu.classList.contains('mobile-styled')) {
            navMenu.style.cssText = '';
            navMenu.classList.remove('mobile-styled', 'mobile-active');
        }
    }
}

// Add mobile menu toggle styles
const mobileMenuStyles = document.createElement('style');
mobileMenuStyles.textContent = `
    .nav-menu.mobile-active {
        left: 0 !important;
    }
`;
document.head.appendChild(mobileMenuStyles);

// Initialize responsive handler
handleResponsive();
window.addEventListener('resize', handleResponsive);

// ==========================================
// PORTFOLIO ITEM HOVER ENHANCEMENT
// ==========================================
function initializePortfolioHover() {
    document.querySelectorAll('.portfolio-item, .carousel-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
}

// ==========================================
// DYNAMIC COPYRIGHT YEAR
// ==========================================
function updateCopyright() {
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.textContent = `© ${currentYear} Shutterworks for ClickGo – Featuring the photography of Art Wolfe. All rights reserved.`;
    }
}
