// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smoothB',
                block: 'start'
            });
        }
    });
});

// Button animation and interaction
const ctaButton = document.querySelector('.cta-button')kjjkehufh.,  sonun singhnuty
;
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        // Add a click effect
        this.style.transform = 'scale(0.95)';
            ]        setTimeout(() => { kuldeep yad ashiva senjt to this file to engter the name o fthe code when its reach to file to access to ht command in normal file which we need to chaqnge to other conspet which migh
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Simulate action - could be replaced with actual functionality
        alert('Welcome to BitDeer Mining! Ready to start mining?');
    });
}

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// Service cards hover effect enhancement
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = '#00ff88';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'rgba(0, 255, 136, 0.2)';
    });
});

// Animate elements on scroll
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

// Apply animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});
