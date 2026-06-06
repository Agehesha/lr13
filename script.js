document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       THEME SYSTEM (DARK / LIGHT)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const htmlElement = document.documentElement;

    // Load saved theme or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        const activeTheme = htmlElement.getAttribute('data-theme');
        let newTheme = 'dark';

        if (activeTheme === 'dark') {
            newTheme = 'light';
        }

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        showToast(`Увімкнено ${newTheme === 'dark' ? 'темну' : 'світлу'} тему сайту`, 'info');
    });

    /* ==========================================================================
       MOBILE NAVIGATION MENU
       ========================================================================== */
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.getElementById('primary-navigation');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        const isOpened = mobileToggle.getAttribute('aria-expanded') === 'true';

        mobileToggle.setAttribute('aria-expanded', !isOpened);
        primaryNav.classList.toggle('open');
    });

    // Close menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.setAttribute('aria-expanded', 'false');
            primaryNav.classList.remove('open');
        });
    });

    /* ==========================================================================
       SCROLL EVENTS (HEADER, SCROLL-TO-TOP, ACTIVE NAV LINK)
       ========================================================================== */
    const header = document.querySelector('.main-header');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Header Effect
        if (window.scrollY > 50) {
            header.style.boxShadow = 'var(--shadow-md)';
            header.style.padding = '5px 0'; // slightly shrink header height
        } else {
            header.style.boxShadow = 'none';
            header.style.padding = '0';
        }

        // Scroll to Top Button Visibility
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }

        // Highlight Active Nav link in Header on Scroll
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // offset for header height
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // Scroll To Top action
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================================================
       INTERSECTION OBSERVER (SCROLL REVEAL ANIMATIONS)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target); // trigger animation only once
            }
        });
    }, {
        threshold: 0.15, // trigger when 15% of the element is visible
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* ==========================================================================
       FAQ ACCORDIONS
       ========================================================================== */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        questionBtn.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // Close other accordions
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                }
            });

            // Toggle current accordion
            if (isOpen) {
                item.classList.remove('active');
                answer.style.maxHeight = '0';
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    /* ==========================================================================
       TOAST NOTIFICATION SYSTEM
       ========================================================================== */
    const toastContainer = document.getElementById('toastContainer');

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        // Custom left border colors for Toast types
        if (type === 'error') {
            toast.style.borderLeftColor = '#ef4444';
        } else if (type === 'info') {
            toast.style.borderLeftColor = '#3b82f6';
        } else {
            toast.style.borderLeftColor = '#10b981'; // success
        }

        toast.innerHTML = `
            <span class="toast-message">${message}</span>
            <span class="toast-close">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </span>
        `;

        toastContainer.appendChild(toast);

        // Slide in
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // Auto remove
        const autoRemoveTimeout = setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 4000);

        // Close button action
        toast.querySelector('.toast-close').addEventListener('click', () => {
            clearTimeout(autoRemoveTimeout);
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        });
    }

    /* ==========================================================================
       CTA HERO DEPLOY SIMULATION
       ========================================================================== */
    const heroDeployBtn = document.getElementById('heroDeployBtn');

    heroDeployBtn.addEventListener('click', () => {
        showToast('Ініціалізація з\'єднання з сервером Render...', 'info');

        setTimeout(() => {
            showToast('Зчитування GitHub репозиторію проєкту...', 'info');
        }, 1200);

        setTimeout(() => {
            showToast('Компіляція статичних файлів завершена!', 'success');
        }, 2500);

        setTimeout(() => {
            showToast('Сайт успішно розгорнуто: digital-launch.onrender.com!', 'success');
        }, 3600);
    });

    /* ==========================================================================
       CONTACT FORM VALIDATION & SUBMISSION
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('userName');
        const emailInput = document.getElementById('userEmail');
        const messageInput = document.getElementById('userMsg');

        let isValid = true;

        // Simple validation
        if (nameInput.value.trim() === '') {
            showToast('Будь ласка, вкажіть ваше ім\'я.', 'error');
            nameInput.focus();
            isValid = false;
            return;
        }

        if (emailInput.value.trim() === '') {
            showToast('Будь ласка, вкажіть електронну адресу.', 'error');
            emailInput.focus();
            isValid = false;
            return;
        } else if (!validateEmail(emailInput.value)) {
            showToast('Введіть коректну адресу електронної пошти.', 'error');
            emailInput.focus();
            isValid = false;
            return;
        }

        if (messageInput.value.trim() === '') {
            showToast('Будь ласка, напишіть повідомлення.', 'error');
            messageInput.focus();
            isValid = false;
            return;
        }

        if (isValid) {
            showToast('Надсилання повідомлення...', 'info');

            // Simulate API Request
            setTimeout(() => {
                showToast('Повідомлення успішно надіслано! Дякуємо.', 'success');
                contactForm.reset();
            }, 1500);
        }
    });

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});
