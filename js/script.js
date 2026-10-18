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
    // 2. MULTI-PAGE ACTIVE NAV HIGHLIGHT
    // ==========================================
    const navLinks = document.querySelectorAll('.nav-menu ul li a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        // Remove active class from all first
        link.classList.remove('active');
        
        // If current page matches link href, set active
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ==========================================
    // 3. EMAILJS FORM SUBMISSION
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            emailjs.sendForm('service_4tuua8k', 'template_b4xqoz5', this)
                .then(() => {
                    submitBtn.textContent = 'Message Sent Successfully!';
                    contactForm.reset();
                    setTimeout(() => {
                        submitBtn.textContent = 'Send Message →';
                        submitBtn.disabled = false;
                    }, 4000);
                }, (error) => {
                    console.error('Failed to send email:', error);
                    submitBtn.textContent = 'Failed to Send. Try Again.';
                    submitBtn.disabled = false;
                });
        });
    }

    // ==========================================
    // 4. MOBILE MENU TOGGLE
    // ==========================================
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.querySelector('.nav-menu');

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

});