document.addEventListener('DOMContentLoaded', () => {

   // 1. DARK MODE TOGGLE (with localStorage & Universal Event Delegation)
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.setAttribute('data-theme', 'dark');
    }

    // Universal click listener to catch theme toggle button clicks anywhere in the header
    document.addEventListener('click', (e) => {
        const toggleBtn = e.target.closest('#theme-toggle, .theme-toggle, button:has(svg), button:has(i)');
        
        // Verify it's the theme button (checking if it contains a sun/moon icon or toggle identifiers)
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
    // 2. SINGLE-PAGE SCROLL SPY & NAV HIGHLIGHT
const sections = document.querySelectorAll('.portfolio-section');
const navLinks = document.querySelectorAll('nav ul li a'); // Updated to catch all nav links

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

    // 3. EMAILJS FORM SUBMISSION
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

    // 4. MOBILE MENU TOGGLE
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburgerBtn && navMenu) {
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

// 5. SECTION FADE-IN SCROLL OBSERVER
    const sections = document.querySelectorAll('.portfolio-section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.05
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
        // Force trigger immediately if already in view
        if (section.getBoundingClientRect().top < window.innerHeight) {
            section.classList.add('visible');
        }
    });

    // 6. ELITE CARD SPOTLIGHT MOUSE EFFECT
    const cards = document.querySelectorAll('.about-card, .project-card, .timeline-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

// ==========================================
// INTERACTIVE PROJECTS CAROUSEL SLIDER
// ==========================================
const track = document.getElementById('projectsTrack');
if (track) {
    const cards = Array.from(track.children);
    const nextButton = document.getElementById('nextBtn');
    const prevButton = document.getElementById('prevBtn');
    const dotsContainer = document.getElementById('carouselDots');
    const dots = dotsContainer ? Array.from(dotsContainer.children) : [];
    
    let currentIndex = 0;

    function updateCarousel(index) {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentIndex = index;
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateCarousel(currentIndex);
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateCarousel(currentIndex);
        });
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            updateCarousel(i);
        });
    });
}

/* ==========================================
   UNIFIED PORTFOLIO SCRIPT
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    
    /* ------------------------------------------
       1. SEAMLESS INFINITE CLONE CAROUSEL
       ------------------------------------------ */
    const sliderTrack = document.getElementById('sliderTrack');
    const originalCards = document.querySelectorAll('.bento-slide');
    const sliderDots = document.querySelectorAll('.slider-dot');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (originalCards.length && sliderTrack) {
        // Clone the first card and append it for the seamless forward loop
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
       2. DYNAMIC TYPEWRITER EFFECT
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
                typeSpeed = 2000; // Pause at full word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before next word
            }

            setTimeout(typeEffect, typeSpeed);
        }

        setTimeout(typeEffect, 500);
    }

});


/* ==========================================
   SMOOTH OFFSET SCROLLING FOR NAVBAR & ANCHORS
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Handle initial page load with a hash (e.g., #home)
    if (window.location.hash) {
        setTimeout(() => {
            const element = document.querySelector(window.location.hash);
            if (element) {
                const headerOffset = 100;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 50);
    }

    // Intercept clicks on navigation links for smooth offset scrolling
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
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
});
