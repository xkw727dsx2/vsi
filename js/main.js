// Import AOS (Animate On Scroll) library
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // DOM Elements
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const languageToggle = document.querySelector('.language-toggle');
    const languageDropdown = document.querySelector('.language-dropdown');
    const languageItems = document.querySelectorAll('.language-dropdown li');
    const currentLang = document.querySelector('.current-lang');
    const productSlider = document.querySelector('.product-slider');
    const productSlides = document.querySelectorAll('.product-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');

    // Sticky Header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Mobile Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            if (this.querySelector('i')) {
                this.querySelector('i').classList.toggle('fa-bars');
                this.querySelector('i').classList.toggle('fa-times');
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks && menuToggle && !navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (menuToggle.querySelector('i')) {
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.querySelector('i').classList.remove('fa-times');
            }
        }
    });

    // Language Selector Toggle
    languageToggle.addEventListener('click', function() {
        languageToggle.classList.toggle('active');
        languageDropdown.classList.toggle('show');
    });

    // Close language dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!languageToggle.contains(e.target)) {
            languageToggle.classList.remove('active');
            languageDropdown.classList.remove('show');
        }
    });

    // Language Selection
    languageItems.forEach(item => {
        item.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            currentLang.textContent = lang.toUpperCase();
            
            languageItems.forEach(li => li.classList.remove('active'));
            this.classList.add('active');
            
            // Here you would handle language change logic
            // For now, we'll just redirect to the correct language version
            if (lang === 'en') {
                window.location.href = window.location.href.replace('/de/', '/en/').replace('/fa/', '/en/');
            } else if (lang === 'de') {
                window.location.href = window.location.href.replace('/en/', '/de/').replace('/fa/', '/de/');
            } else if (lang === 'fa') {
                window.location.href = window.location.href.replace('/en/', '/fa/').replace('/de/', '/fa/');
            }
        });
    });

    // Product Slider
    let currentSlide = 0;
    
    // Hide all slides initially except first one
    for (let i = 1; i < productSlides.length; i++) {
        productSlides[i].style.display = 'none';
    }
    
    // Next button
    nextBtn.addEventListener('click', function() {
        goToSlide(currentSlide + 1);
    });
    
    // Previous button
    prevBtn.addEventListener('click', function() {
        goToSlide(currentSlide - 1);
    });
    
    // Dots navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            goToSlide(index);
        });
    });
    
    // Auto slide change
    setInterval(function() {
        goToSlide(currentSlide + 1);
    }, 5000);
    
    // Go to slide function
    function goToSlide(n) {
        // Hide current slide
        productSlides[currentSlide].style.display = 'none';
        dots[currentSlide].classList.remove('active');
        
        // Update current slide index
        currentSlide = (n + productSlides.length) % productSlides.length;
        
        // Show new slide
        productSlides[currentSlide].style.display = 'flex';
        dots[currentSlide].classList.add('active');
    }

    // Testimonial Slider - Automatic scroll between testimonials
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    if (testimonials.length > 1) {
        setInterval(function() {
            testimonials[currentTestimonial].style.opacity = '0';
            
            setTimeout(function() {
                testimonials[currentTestimonial].style.display = 'none';
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                testimonials[currentTestimonial].style.display = 'block';
                
                setTimeout(function() {
                    testimonials[currentTestimonial].style.opacity = '1';
                }, 50);
            }, 500);
        }, 5000);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                }
            }
        });
    });

    // Add polyfill for IntersectionObserver if not available
    if (!('IntersectionObserver' in window)) {
        // Simple fallback for animation: show all elements
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.classList.add('aos-animate');
        });
    }
});

// Add AOS implementation manually if the CDN fails to load
if (typeof AOS === 'undefined') {
    console.warn('AOS library not loaded. Applying manual animation fallback.');
    
    // Basic implementation
    window.AOS = {
        init: function(options) {
            document.addEventListener('scroll', function() {
                document.querySelectorAll('[data-aos]').forEach(el => {
                    const elementTop = el.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (elementTop < windowHeight - 100) {
                        el.classList.add('aos-animate');
                    }
                });
            });
            
            // Initial check
            setTimeout(function() {
                document.dispatchEvent(new Event('scroll'));
            }, 100);
        }
    };
    
    // Run init
    AOS.init();
} 