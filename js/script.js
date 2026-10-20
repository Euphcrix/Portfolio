/* ==========================================
   DOMNIC PORTFOLIO - MAIN SCRIPT (UNIFIED & OPTIMIZED)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------------------------
       1. DARK MODE TOGGLE (with localStorage)
       ------------------------------------------ */
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.setAttribute('data-theme', 'dark');
    }

    document.addEventListener('click', (e) => {
        const toggleBtn = e.target.closest('#theme-toggle, .theme-toggle, button:has(svg), button:has(i)');
        if (toggleBtn && (toggleBtn.id === 'theme-toggle' || toggleBtn.classList.contains('theme-toggle') || toggleBtn.querySelector('svg, i'))) {
            let isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                document.body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                document.body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        }
    });


    /* ------------------------------------------
       2. SINGLE-PAGE SCROLL SPY & NAV HIGHLIGHT
       ------------------------------------------ */
    const sections = document.querySelectorAll('.portfolio-section');
    const navLinks = document.querySelectorAll('nav ul li a, header nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}` || (current === '' && href === '#home')) {
                link.classList.add('active');
            }
        });
    });


    /* ------------------------------------------
       3. EMAILJS FORM SUBMISSION
       ------------------------------------------ */
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            emailjs.sendForm('service_4tuua8k', 'template_b4xqoqz', this)
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


    /* ------------------------------------------
       4. MOBILE MENU TOGGLE
       ------------------------------------------ */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }


    /* ------------------------------------------
       5. SECTION FADE-IN SCROLL OBSERVER
       ------------------------------------------ */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.05
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
        if (section.getBoundingClientRect().top < window.innerHeight) {
            section.classList.add('visible');
        }
    });


    /* ------------------------------------------
       6. ELITE CARD SPOTLIGHT MOUSE EFFECT
       ------------------------------------------ */
    const cards = document.querySelectorAll('.about-card, .project-card, .timeline-item, .bento-workspace-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });


    /* ------------------------------------------
       7. BENTO WORKSPACE INFINITE SLIDER
       ------------------------------------------ */
    const sliderTrack = document.getElementById('sliderTrack');
    const originalCards = document.querySelectorAll('.bento-slide');
    const sliderDots = document.querySelectorAll('.slider-dot');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (originalCards.length && sliderTrack) {
        const firstCardClone = originalCards[0].cloneNode(true);
        sliderTrack.appendChild(firstCardClone);

        const allCards = document.querySelectorAll('.bento-slide');
        let currentIndex = 0;
        const totalOriginalSlides = originalCards.length;

        function updateView(smooth = true) {
            if (smooth) {
                sliderTrack.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
            } else {
                sliderTrack.style.transition = 'none';
            }
            sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

            allCards.forEach((card, i) => {
                const mappedIndex = i % totalOriginalSlides;
                const targetActive = (currentIndex === totalOriginalSlides) ? 0 : currentIndex;
                card.classList.toggle('active', mappedIndex === targetActive);
            });

            sliderDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === (currentIndex % totalOriginalSlides));
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                currentIndex++;
                updateView(true);

                if (currentIndex === totalOriginalSlides) {
                    setTimeout(() => {
                        currentIndex = 0;
                        updateView(false);
                    }, 400);
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (currentIndex === 0) {
                    currentIndex = totalOriginalSlides;
                    updateView(false);
                    setTimeout(() => {
                        currentIndex = totalOriginalSlides - 1;
                        updateView(true);
                    }, 20);
                } else {
                    currentIndex--;
                    updateView(true);
                }
            });
        }

        sliderDots.forEach((dot, i) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                currentIndex = i;
                updateView(true);
            });
        });

        updateView(false);
    }


    /* ------------------------------------------
       8. DYNAMIC TYPEWRITER EFFECT
       ------------------------------------------ */
    const typedTextElement = document.getElementById('typed-text');
    if (typedTextElement) {
        const words = [
            "Virtual Assistant & IT Student",
            "E-Commerce Support Specialist",
            "Full-Stack Developer",
            "UI/UX & Visual Designer",
            "Problem Solver"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function typeEffect() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(typeEffect, typeSpeed);
        }

        setTimeout(typeEffect, 500);
    }


    /* ------------------------------------------
       9. SMOOTH OFFSET SCROLLING FOR ANCHORS
       ------------------------------------------ */
    if (window.location.hash) {
        setTimeout(() => {
            const element = document.querySelector(window.location.hash);
            if (element) {
                const headerOffset = 100;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        }, 50);
    }

    document.querySelectorAll('nav a, header a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 100;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    history.pushState(null, null, targetId);
                }
            }
        });
    });

});

/* ------------------------------------------
       INTERACTIVE PROJECT FILTER
       ------------------------------------------ */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.projects-grid .project-card');

    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                });
            });
        });
    }

    /* ------------------------------------------
       QUICK-COPY EMAIL TOAST NOTIFICATION
       ------------------------------------------ */
    const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
    const toast = document.getElementById('toast');

    if (copyEmailBtns.length && toast) {
        copyEmailBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const email = btn.getAttribute('data-email') || btn.innerText.trim();

                navigator.clipboard.writeText(email).then(() => {
                    toast.classList.add('show');
                    setTimeout(() => {
                        toast.classList.remove('show');
                    }, 2500);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            });
        });
    }