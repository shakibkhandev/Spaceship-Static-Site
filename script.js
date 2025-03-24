// DOM Elements
const navToggle = document.getElementById('navToggle');
const navItems = document.getElementById('navItems');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navItems.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    spans.forEach(span => span.classList.toggle('active'));
    
    if (navItems.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
    if (!navToggle.contains(event.target) && !navItems.contains(event.target)) {
        navItems.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.classList.remove('active');
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu after clicking a link
            navItems.classList.remove('active');
        }
    });
});

// Add parallax effect to hero image
const heroImage = document.querySelector('.hero-image');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
});

// Add animation on scroll for category cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.category-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});
