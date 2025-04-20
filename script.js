// Main JavaScript for The Hired Ground website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const body = document.body;
    
    if (mobileMenuBtn) {
        // Create mobile nav element
        const mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        
        // Create close button
        const closeBtn = document.createElement('div');
        closeBtn.className = 'mobile-nav-close';
        
        // Create nav list
        const navList = document.createElement('ul');
        navList.className = 'mobile-nav-list';
        
        // Clone desktop nav items
        const desktopNavItems = document.querySelectorAll('.nav-list li');
        desktopNavItems.forEach(item => {
            const li = document.createElement('li');
            const a = item.querySelector('a').cloneNode(true);
            li.appendChild(a);
            navList.appendChild(li);
        });
        
        // Append elements
        mobileNav.appendChild(closeBtn);
        mobileNav.appendChild(navList);
        body.appendChild(mobileNav);
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.add('active');
            body.style.overflow = 'hidden';
        });
        
        // Close mobile menu
        closeBtn.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            body.style.overflow = '';
        });
        
        // Close menu when clicking nav items
        const mobileNavItems = mobileNav.querySelectorAll('a');
        mobileNavItems.forEach(item => {
            item.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                body.style.overflow = '';
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const company = document.getElementById('company').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real implementation, you would send this data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.service-card, .about-content, .contact-content');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial styles for animation
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check on load and scroll
    window.addEventListener('load', revealOnScroll);
    window.addEventListener('scroll', revealOnScroll);
});
