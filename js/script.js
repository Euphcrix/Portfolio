document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. DARK MODE TOGGLE (With LocalStorage)
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // ==========================================
    // 2. ACTIVE SCROLLSPY (Intersection Observer)
    // ==========================================
    const sections = document.querySelectorAll('.portfolio-section');
    const navLinks = document.querySelectorAll('nav ul li a.nav-link');

    if (sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-30% 0px -60% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${currentId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    // ==========================================
    // 3. EMAILJS FORM SUBMISSION
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            
            emailjs.sendForm('service_4tuua8k', 'template_b4xqoz5', this)
                .then(() => {
                    submitBtn.textContent = 'Message Sent Successfully!';
                    contactForm.reset();
                    setTimeout(() => {
                        submitBtn.textContent = 'Send Message \u2192';
                        submitBtn.disabled = false;
                    }, 4000);
                }, (error) => {
                    console.error('Failed to send email:', error);
                    submitBtn.textContent = 'Failed to Send. Try Again.';
                    submitBtn.disabled = false;
                });
        });
    }
});


// Mobile Menu Toggle
const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburgerBtn && navMenu) {
    // Toggle menu open/close on click
    hamburgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Automatically close mobile menu when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}