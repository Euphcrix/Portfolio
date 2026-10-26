/* ==========================================
   DOMNIC PORTFOLIO - MAIN SCRIPT (UNIFIED & OPTIMIZED)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------------------------
       1. DARK MODE TOGGLE (UNIFIED)
       ------------------------------------------ */
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.body.setAttribute('data-theme', 'dark');
    }

    const themeToggleBtn = document.getElementById('theme-toggle') || document.querySelector('.theme-toggle');

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            
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
        });
    }


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

   /* ----------------------------------------------------
   COPY EMAIL TOAST HANDLER (MODAL & CONTACT SECTION)
   ---------------------------------------------------- */
const modalCopyBtn = document.querySelector('.modal-copy-email-btn');
const sectionCopyBtns = document.querySelectorAll('#contact .copy-email-btn, .contact-section .copy-email-btn');
const toast = document.getElementById('toast');

// 1. Modal Copy Logic
if (modalCopyBtn && toast) {
    modalCopyBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const email = modalCopyBtn.getAttribute('data-email') || 'llanosdomnic1@gmail.com';

        navigator.clipboard.writeText(email).then(() => {
            toast.classList.add('show');

            setTimeout(() => {
                toast.classList.remove('show');
            }, 2500);
        }).catch(err => {
            console.error('Modal copy failed:', err);
        });
    });
}

// 2. Contact Section Copy Logic
if (sectionCopyBtns.length && toast) {
    sectionCopyBtns.forEach(btn => {
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

    /* ------------------------------------------
       SCROLL REVEAL ANIMATION OBSERVER
       ------------------------------------------ */
    const revealElements = document.querySelectorAll('.portfolio-section, .project-card, .cert-card');
    
    // Add initial reveal class
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: unobserve after revealing once
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealOnScroll.observe(el));

   /* ------------------------------------------
       REAL-TIME PROJECT KEYWORD SEARCH & FILTER
       ------------------------------------------ */
    const searchInput = document.getElementById('projectSearchInput');

    if (searchInput && projectCards.length) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            // Reset category filter buttons to 'all' when typing a search query
            if (filterButtons.length) {
                filterButtons.forEach(btn => {
                    if (btn.getAttribute('data-filter') === 'all') {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
            }

            projectCards.forEach(card => {
                const textContent = card.innerText.toLowerCase();
                if (textContent.includes(query)) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    }

    /* ------------------------------------------
       HIRE ME MODAL POPUP HANDLER
       ------------------------------------------ */
    const modal = document.getElementById('hireModal');
    const openModalBtns = document.querySelectorAll('.open-hire-modal');
    const closeModalBtn = document.querySelector('.modal-close-btn');

    if (modal) {
        openModalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
            });
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }

        // Close when clicking outside the modal card
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        // Close on ESC key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });
    }

    /* ------------------------------------------
       BACK-TO-TOP SCROLL BUTTON HANDLER
       ------------------------------------------ */
    const backToTopBtn = document.getElementById('backToTopBtn');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ------------------------------------------
       CONTACT FORM SUCCESS FEEDBACK HANDLER
       ------------------------------------------ */
    const contactForm = document.getElementById('contactForm');
    const successBanner = document.getElementById('formSuccessMessage');

    if (contactForm && successBanner) {
        contactForm.addEventListener('submit', (e) => {
            // If using EmailJS or standard form submission, show banner:
            // e.preventDefault(); // Uncomment if handling via AJAX/EmailJS submit event
            
            successBanner.classList.add('show');
            
            // Auto hide after 5 seconds
            setTimeout(() => {
                successBanner.classList.remove('show');
            }, 5000);
        });
    }


    /* ------------------------------------------
       LIVE LOCAL TIME CLOCK HANDLER
       ------------------------------------------ */
    const timeDisplay = document.getElementById('localTimeDisplay');

    function updateLocalTime() {
        if (timeDisplay) {
            const options = { 
                timeZone: 'Asia/Manila', 
                hour: 'numeric', 
                minute: 'numeric', 
                second: 'numeric',
                hour12: true 
            };
            const timeString = new Intl.DateTimeFormat([], options).format(new Date());
            timeDisplay.innerText = `Iligan City, PH • ${timeString} (Available)`;
        }
    }

    updateLocalTime();
    setInterval(updateLocalTime, 1000);

    /* ------------------------------------------
       DYNAMIC TAB TITLE HANDLER
       ------------------------------------------ */
    const originalTitle = document.title;

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            document.title = "Come back! 🚀 Hire Domnic Llanos";
        } else {
            document.title = originalTitle;
        }
    });

    /* ------------------------------------------
       TOP SCROLL PROGRESS BAR LOGIC
       ------------------------------------------ */
    const scrollBar = document.getElementById('scrollBar');

    if (scrollBar) {
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            scrollBar.style.width = `${scrolled}%`;
        });
    }

    /* ------------------------------------------
       3D CARD TILT EFFECT LOGIC
       ------------------------------------------ */
    const tiltCards = document.querySelectorAll('.project-card, .bento-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Mouse X inside card
            const y = e.clientY - rect.top;  // Mouse Y inside card

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation angles (max 8 degrees for a subtle, professional feel)
            const rotateX = -((y - centerY) / centerY) * 8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            // Smoothly reset card position when mouse leaves
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });

    // ==========================================
// SCROLL REVEAL OBSERVER
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Automatically target cards and major sections
    const elementsToReveal = document.querySelectorAll('.project-card, .bento-card, section');
    
    elementsToReveal.forEach(el => {
        el.classList.add('reveal-on-scroll');
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    elementsToReveal.forEach(el => {
        scrollObserver.observe(el);
    });
});

// ==========================================
// 0. PRELOADER HANDLER
// ==========================================
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.remove();
            }, 600);
        }
    }, 800);
});

/* ==========================================================================
   3D COVERFLOW CAROUSEL & DETAIL MODAL CONTROLLER
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.coverflow-card');
    const prevBtn = document.getElementById('coverflowPrev');
    const nextBtn = document.getElementById('coverflowNext');
    const projectModal = document.getElementById('projectModal');
    
    if (!cards.length) return;

    let currentIndex = 0;
    const totalCards = cards.length;

    function updateCarousel() {
        cards.forEach((card, i) => {
            card.classList.remove('active', 'prev-card', 'next-card', 'hidden-card');

            if (i === currentIndex) {
                card.classList.add('active');
            } else if (i === (currentIndex - 1 + totalCards) % totalCards) {
                card.classList.add('prev-card');
            } else if (i === (currentIndex + 1) % totalCards) {
                card.classList.add('next-card');
            } else {
                card.classList.add('hidden-card');
            }
        });
    }

    // Navigation Arrow Handlers (Continuous Infinite Loop)
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % totalCards;
            updateCarousel();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateCarousel();
        });
    }

    // Click handlers for cards and detail buttons
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (card.classList.contains('active')) {
                openProjectModal(card);
            } else {
                currentIndex = index;
                updateCarousel();
            }
        });

        const detailsBtn = card.querySelector('.coverflow-details-btn');
        if (detailsBtn) {
            detailsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                currentIndex = index;
                updateCarousel();
                openProjectModal(card);
            });
        }
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % totalCards;
            updateCarousel();
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateCarousel();
        }
    });

    // Modal Population Function
    function openProjectModal(card) {
        if (!projectModal) return;

        const cat = card.getAttribute('data-category');
        const title = card.getAttribute('data-title');
        const desc = card.getAttribute('data-desc');
        const problem = card.getAttribute('data-problem');
        const solution = card.getAttribute('data-solution');
        const features = card.getAttribute('data-features');
        const tech = card.getAttribute('data-tech').split(',');
        const live = card.getAttribute('data-live');
        const repo = card.getAttribute('data-repo');

        document.getElementById('modalCategory').textContent = cat;
        document.getElementById('modalTitle').textContent = title;
        
        let modalDescContainer = document.getElementById('modalDescription');
        modalDescContainer.innerHTML = `
            <p style="margin-bottom: 1rem;">${desc}</p>
            <div style="background: var(--bg-color, rgba(0,0,0,0.2)); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border-left: 3px solid var(--primary-color, #fff);">
                <strong style="color: var(--text-color);">PROBLEM:</strong>
                <p style="margin-top: 0.3rem; font-size: 0.9rem; color: var(--text-muted);">${problem}</p>
            </div>
            <div style="background: var(--bg-color, rgba(0,0,0,0.2)); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border-left: 3px solid #10b981;">
                <strong style="color: var(--text-color);">SOLUTION:</strong>
                <p style="margin-top: 0.3rem; font-size: 0.9rem; color: var(--text-muted);">${solution}</p>
            </div>
            <div style="margin-bottom: 1rem;">
                <strong style="color: var(--text-color);">KEY FEATURES:</strong>
                <p style="margin-top: 0.3rem; font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">${features}</p>
            </div>
        `;

        const techContainer = document.getElementById('modalTechStack');
        techContainer.innerHTML = '';
        tech.forEach(t => {
            const span = document.createElement('span');
            span.className = 'skill-tag';
            span.textContent = t.trim();
            techContainer.appendChild(span);
        });

        const liveBtn = document.getElementById('modalLiveBtn');
        const repoBtn = document.getElementById('modalRepoBtn');
        
        if (live && live !== '#') {
            liveBtn.href = live;
            liveBtn.style.display = 'inline-flex';
        } else {
            liveBtn.style.display = 'none';
        }

        if (repo && repo !== '#') {
            repoBtn.href = repo;
            repoBtn.style.display = 'inline-flex';
        } else {
            repoBtn.style.display = 'none';
        }

        projectModal.classList.add('active');
    }

    // Close Modal on Outside Click or Escape
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.classList.remove('active');
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal) {
            projectModal.classList.remove('active');
        }
    });

    updateCarousel();
});

/* ------------------------------------------
       LIGHTWEIGHT NAVBAR SCROLL CONTROLLER
       ------------------------------------------ */
    const siteHeader = document.querySelector('header') || document.querySelector('.navbar') || document.querySelector('nav.main-nav');
    
    if (siteHeader) {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY <= 40) {
                siteHeader.classList.remove('nav-hidden-top', 'nav-visible-bottom');
            } else if (currentScrollY > 40 && currentScrollY < 250) {
                siteHeader.classList.add('nav-hidden-top');
                siteHeader.classList.remove('nav-visible-bottom');
            } else {
                siteHeader.classList.remove('nav-hidden-top');
                siteHeader.classList.add('nav-visible-bottom');
            }
        }, { passive: true });
    }

    /* ------------------------------------------
       CUSTOM AUTO-FADING SCROLL THUMB
       ------------------------------------------ */
    if (!document.getElementById('custom-scroll-thumb')) {
        const scrollThumb = document.createElement('div');
        scrollThumb.id = 'custom-scroll-thumb';
        document.body.appendChild(scrollThumb);
    }

    const thumb = document.getElementById('custom-scroll-thumb');
    let scrollTimer = null;

    window.addEventListener('scroll', () => {
        if (!thumb) return;

        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

      const thumbHeight = 70; // Change 70 to make it smaller or bigger!
        const maxTop = window.innerHeight - thumbHeight - 20;
        const currentTop = 10 + (scrollPercent * maxTop);

        thumb.style.height = `${thumbHeight}px`;
        thumb.style.transform = `translateY(${currentTop}px)`;
        thumb.style.opacity = '1';

        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            thumb.style.opacity = '0';
        }, 600); // Fades out smoothly 600ms after you stop scrolling
    }, { passive: true });