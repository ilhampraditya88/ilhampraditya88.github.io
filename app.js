// Digital Nusantara Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navToggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav');
    const header = document.getElementById('header');
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const navLinks = document.querySelectorAll('.nav__link');
    const heroCtaButton = document.querySelector('.hero__cta');

    // Mobile Navigation Toggle
    function toggleMobileNav() {
        nav.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    // Close mobile nav when clicking on a link
    function closeMobileNav() {
        nav.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Smooth scrolling for navigation links
    function smoothScroll(target) {
        const targetElement = document.querySelector(target);
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Handle scroll events for header
    function handleScroll() {
        const scrollTop = window.pageYOffset;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Form validation
    function validateForm(formData) {
        const errors = [];
        
        // Validate name
        const nama = formData.get('nama');
        if (!nama || nama.trim().length < 2) {
            errors.push('Nama harus diisi minimal 2 karakter');
        }
        
        // Validate email
        const email = formData.get('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email.trim())) {
            errors.push('Email tidak valid');
        }
        
        // Validate message
        const pesan = formData.get('pesan');
        if (!pesan || pesan.trim().length < 10) {
            errors.push('Pesan harus diisi minimal 10 karakter');
        }
        
        return errors;
    }

    // Show form errors
    function showFormErrors(errors) {
        // Remove existing error messages
        const existingErrors = document.querySelectorAll('.form-error');
        existingErrors.forEach(error => error.remove());
        
        if (errors.length > 0) {
            const errorContainer = document.createElement('div');
            errorContainer.className = 'form-errors';
            errorContainer.style.marginBottom = '16px';
            
            errors.forEach(error => {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'form-error status status--error';
                errorDiv.textContent = error;
                errorDiv.style.marginBottom = '8px';
                errorContainer.appendChild(errorDiv);
            });
            
            contactForm.insertBefore(errorContainer, contactForm.firstChild);
            return true;
        }
        return false;
    }

    // Handle form submission
    function handleFormSubmission(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const errors = validateForm(formData);
        
        // Show errors if any
        if (showFormErrors(errors)) {
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Mengirim...';
        submitButton.disabled = true;
        
        // Simulate network delay
        setTimeout(() => {
            // Hide form and show success message
            contactForm.style.display = 'none';
            successMessage.classList.remove('hidden');
            
            // Reset form after 4 seconds and show it again
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                successMessage.classList.add('hidden');
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Remove any error messages
                const errorContainer = document.querySelector('.form-errors');
                if (errorContainer) {
                    errorContainer.remove();
                }
            }, 4000);
        }, 1000);
    }

    // Event Listeners Setup
    
    // Mobile navigation toggle
    if (navToggle) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileNav();
        });
    }

    // Navigation links click handlers
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            
            console.log('Nav link clicked:', target); // Debug log
            
            // Close mobile nav if open
            closeMobileNav();
            
            // Add small delay to ensure mobile nav closes first
            setTimeout(() => {
                smoothScroll(target);
            }, 100);
        });
    });

    // Hero CTA button
    if (heroCtaButton) {
        heroCtaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            console.log('Hero CTA clicked:', target); // Debug log
            smoothScroll(target);
        });
    }

    // Scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // Also add click handler to submit button as backup
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.addEventListener('click', function(e) {
                if (e.target.closest('form')) {
                    return; // Let form submit handler handle it
                }
                e.preventDefault();
                handleFormSubmission(e);
            });
        }
    }

    // Close mobile nav when clicking outside
    document.addEventListener('click', function(e) {
        if (nav && navToggle && !nav.contains(e.target) && !navToggle.contains(e.target)) {
            closeMobileNav();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileNav();
        }
    });

    // Initialize scroll handler
    handleScroll();

    // Add loading animation for service cards
    function animateServiceCards() {
        const serviceCards = document.querySelectorAll('.service__card');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 150);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            serviceCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(card);
            });
        } else {
            // Fallback for older browsers
            serviceCards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        }
    }

    // Initialize animations
    animateServiceCards();

    // Add active nav link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + header.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current nav link
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initial call to set active nav link
    setTimeout(updateActiveNavLink, 100);

    // Add smooth reveal animation for about section
    function animateAboutSection() {
        const aboutContent = document.querySelector('.about__content');
        if (aboutContent && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.2
            });

            aboutContent.style.opacity = '0';
            aboutContent.style.transform = 'translateY(30px)';
            aboutContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(aboutContent);
        }
    }

    animateAboutSection();

    // Debug function to verify sections exist
    function debugSections() {
        const sections = ['#home', '#tentang', '#layanan', '#kontak'];
        sections.forEach(selector => {
            const element = document.querySelector(selector);
            console.log(`Section ${selector}:`, element ? 'Found' : 'Not found');
        });
    }

    // Run debug in development
    debugSections();

    // Console message for developers
    console.log('🇮🇩 Digital Nusantara Website Loaded Successfully!');
    console.log('Website: Digital Nusantara - Solusi Digital Terpercaya');
    console.log('Contact: mail@digitalnusantara.id');
    console.log('Navigation initialized, Form handlers ready');
});