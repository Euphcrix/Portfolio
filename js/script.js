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

    /* ------------------------------------------
       MODAL COPY EMAIL TOAST HANDLER
       ------------------------------------------ */
    const modalCopyBtn = document.querySelector('.modal-copy-email-btn');
    const modalToast = document.getElementById('modalToast');

    if (modalCopyBtn && modalToast) {
        modalCopyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const email = modalCopyBtn.getAttribute('data-email') || 'llanosdomnic1@gmail.com';

            navigator.clipboard.writeText(email).then(() => {
                modalToast.classList.add('show');
                
                // Automatically hide popup after 2.5 seconds
                setTimeout(() => {
                    modalToast.classList.remove('show');
                }, 2500);
            }).catch(err => {
                console.error('Modal copy failed:', err);
            });
        });
    }
    // 2. Contact Section Copy Logic (Floating Toast at bottom contact section)
    const sectionCopyBtns = document.querySelectorAll('#contact .copy-email-btn, .contact-section .copy-email-btn');
    const toast = document.getElementById('toast');

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
       MOUSE SPOTLIGHT GLOW HANDLER
       ------------------------------------------ */
    const spotlightCards = document.querySelectorAll('.elite-project-card, .bento-card, .cert-card');

    spotlightCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

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
       CUSTOM MAGNETIC CURSOR LOGIC
       ------------------------------------------ */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        const interactiveElements = document.querySelectorAll('a, button, .project-card, .bento-card, input, textarea, .modal-action-card');

        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

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

// ==========================================
// 1. PROJECT QUICK-VIEW MODAL FUNCTIONALITY (FINAL FULL CODE)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("projectModal");
    const closeBtn = document.getElementById("modalCloseBtn");
    const projectCards = document.querySelectorAll(".project-card, .elite-project-card");

    if (!modal) return;

    projectCards.forEach(card => {
        card.style.cursor = "pointer";
        card.addEventListener("click", (e) => {
            if (e.target.closest("a")) return;

            const title = card.querySelector(".project-title")?.innerText || "Project Detail";
            const desc = card.querySelector(".project-description")?.innerText || "Detailed project summary.";
            const category = card.querySelector(".project-category")?.innerText || "Development";
            const liveLink = card.querySelector(".live-preview-badge")?.getAttribute("href") || "#";

            document.getElementById("modalTitle").innerText = title;
            document.getElementById("modalDescription").innerText = desc;
            document.getElementById("modalCategory").innerText = category;

            const liveBtn = document.getElementById("modalLiveBtn");
            if (liveBtn) liveBtn.setAttribute("href", liveLink);

            // Populate theme-adaptive tech stack tags horizontally
          // Populate clean theme-adaptive tech stack tags horizontally
const techContainer = document.getElementById("modalTechStack");
if (techContainer) {
    techContainer.innerHTML = "";
    techContainer.style.cssText = "display: flex !important; flex-direction: row !important; flex-wrap: wrap !important; gap: 0.5rem !important; align-items: center !important; justify-content: flex-start !important;";

    const rawTags = card.getAttribute("data-tech") || "React, Tailwind CSS, JavaScript, Vercel";
    const sampleTags = rawTags.split(",").map(t => t.trim());

    sampleTags.forEach(tag => {
        const span = document.createElement("span");
        span.innerText = tag;
        span.className = "tech-pill"; // Use CSS class for styling
        techContainer.appendChild(span);
    });
}

            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    const closeModal = () => {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    };

    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    // Close on background click
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    // Close on ESC key press
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });
});

// ==========================================
// 2. CURSOR-TRACKING GRADIENT GLOW EFFECT
// ==========================================
const glowCards = document.querySelectorAll(".elite-project-card, .bento-card, .cert-card");

glowCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    });



    // ==========================================
    // 2. CURSOR-TRACKING GRADIENT GLOW EFFECT
    // ==========================================
    const glowCards = document.querySelectorAll(".elite-project-card, .bento-card, .cert-card");

    glowCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });
});