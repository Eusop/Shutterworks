// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
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
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would normally send the data to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            document.getElementById('contactFormWrapper').querySelector('.contact-form-content').style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Portfolio Carousel Functionality
    initializeCarousels();
});

// Smooth scroll for anchor links
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

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    }
    
    lastScroll = currentScroll;
});

// Image lazy loading effect
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

// Observe all portfolio items and service cards
document.querySelectorAll('.portfolio-item, .service-card, .testimonial-card').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    imageObserver.observe(item);
});

// Portfolio item hover effect enhancement
document.querySelectorAll('.portfolio-item, .portfolio-item-large').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Dynamic copyright year
const copyrightElement = document.querySelector('.copyright');
if (copyrightElement) {
    const currentYear = new Date().getFullYear();
    copyrightElement.textContent = `© ${currentYear} Shutterworks for ClickGo — Featuring the photography of Art Wolfe. All rights reserved.`;
}

// Mobile menu toggle (if needed for responsive version)
function createMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navContainer = document.querySelector('.nav-container');
    
    // Check if mobile menu button already exists
    if (document.querySelector('.mobile-menu-btn')) return;
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
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

// Add mobile styles if screen is small
function handleResponsive() {
    if (window.innerWidth <= 768) {
        createMobileMenu();
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        
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
                    background: rgba(39, 31, 23, 0.91);
                    flex-direction: column;
                    justify-content: flex-start;
                    padding: 40px;
                    transition: left 0.3s ease;
                    z-index: 999;
                `;
            }
        }
    } else {
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileBtn) {
            mobileBtn.style.display = 'none';
        }
        
        if (navMenu && navMenu.classList.contains('mobile-styled')) {
            navMenu.style.cssText = '';
            navMenu.classList.remove('mobile-styled', 'mobile-active');
        }
    }
}

// Handle mobile menu class toggle
const style = document.createElement('style');
style.textContent = `
    .nav-menu.mobile-active {
        left: 0 !important;
    }
`;
document.head.appendChild(style);

// Call on load and resize
handleResponsive();
window.addEventListener('resize', handleResponsive);

// Parallax effect for hero images
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.photo-collage .photo-item');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed / 10);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    // Set initial opacity
    img.style.transition = 'opacity 0.3s ease';
    if (img.complete) {
        img.style.opacity = '1';
    } else {
        img.style.opacity = '0.5';
    }
});

// Portfolio filter functionality (can be expanded)
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item, .portfolio-item-large');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Initialize portfolio filters if they exist
if (document.querySelector('.filter-btn')) {
    initPortfolioFilters();
}

// Testimonial slider functionality (optional enhancement)
function initTestimonialSlider() {
    const testimonialGrid = document.querySelector('.testimonials-grid');
    if (!testimonialGrid || window.innerWidth > 768) return;
    
    let currentIndex = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    const totalTestimonials = testimonials.length;
    
    // Create slider controls
    const controls = document.createElement('div');
    controls.className = 'testimonial-controls';
    controls.style.cssText = `
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 30px;
    `;
    
    for (let i = 0; i < totalTestimonials; i++) {
        const dot = document.createElement('button');
        dot.className = 'slider-dot';
        dot.style.cssText = `
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 2px solid #8bc34a;
            background: ${i === 0 ? '#8bc34a' : 'transparent'};
            cursor: pointer;
            transition: background 0.3s;
        `;
        dot.addEventListener('click', () => goToSlide(i));
        controls.appendChild(dot);
    }
    
    testimonialGrid.parentElement.appendChild(controls);
    
    function goToSlide(index) {
        currentIndex = index;
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
        
        // Update dots
        const dots = controls.querySelectorAll('.slider-dot');
        dots.forEach((dot, i) => {
            dot.style.background = i === index ? '#8bc34a' : 'transparent';
        });
    }
    
    // Initialize first slide
    goToSlide(0);
}

// Call testimonial slider on mobile
if (window.innerWidth <= 768) {
    initTestimonialSlider();
}

// Portfolio Carousel System
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
        
        // Left button click
        if (leftBtn) {
            leftBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            });
        }
        
        // Right button click
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

console.log('Art Wolfe Photography - Website Loaded Successfully');