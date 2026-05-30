/* ==========================================================================
   AFIM Consulting — Main JavaScript
   Optimized for: Mobile UX, Netlify Forms, Accessibility
   ========================================================================== */

(function () {
    'use strict';

    // ===== DOM ready =====
    document.addEventListener('DOMContentLoaded', function () {
        initHeader();
        initMobileMenu();
        initFAQ();
        initBackToTop();
        initActiveNav();
        initSmoothScroll();
        initScrollReveal();
        initContactForm();
        initLazyMap();
    });

    /* ----- Header scroll effect ----- */
    function initHeader() {
        const header = document.getElementById('site-header');
        if (!header) return;
        const onScroll = () => {
            if (window.scrollY > 30) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ----- Mobile menu (hamburger + backdrop + body lock) ----- */
    function initMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobile-menu');
        const backdrop = document.getElementById('menu-backdrop');
        if (!hamburger || !mobileMenu) return;

        const lockBody = (lock) => {
            document.body.style.overflow = lock ? 'hidden' : '';
        };

        const closeMenu = () => {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            mobileMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-hidden', 'true');
            if (backdrop) backdrop.classList.remove('active');
            lockBody(false);
        };

        const openMenu = () => {
            hamburger.classList.add('active');
            hamburger.setAttribute('aria-expanded', 'true');
            mobileMenu.classList.add('active');
            mobileMenu.setAttribute('aria-hidden', 'false');
            if (backdrop) backdrop.classList.add('active');
            lockBody(true);
        };

        hamburger.addEventListener('click', () => {
            if (hamburger.classList.contains('active')) closeMenu();
            else openMenu();
        });

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close when clicking backdrop
        if (backdrop) backdrop.addEventListener('click', closeMenu);

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && hamburger.classList.contains('active')) closeMenu();
        });

        // Close on resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1100) closeMenu();
        });
    }

    /* ----- FAQ Accordion (with smooth max-height) ----- */
    function initFAQ() {
        const items = document.querySelectorAll('.faq-item');
        items.forEach(item => {
            const btn = item.querySelector('.faq-question');
            if (!btn) return;
            btn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                items.forEach(i => {
                    i.classList.remove('active');
                    const q = i.querySelector('.faq-question');
                    if (q) q.setAttribute('aria-expanded', 'false');
                });
                if (!isActive) {
                    item.classList.add('active');
                    btn.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    /* ----- Back to top button ----- */
    function initBackToTop() {
        const btn = document.getElementById('back-to-top');
        if (!btn) return;
        const toggle = () => {
            if (window.scrollY > 400) btn.classList.add('visible');
            else btn.classList.remove('visible');
        };
        window.addEventListener('scroll', toggle, { passive: true });
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        toggle();
    }

    /* ----- Active menu state on scroll ----- */
    function initActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
        if (!sections.length || !navLinks.length) return;

        const setActive = () => {
            const scrollPos = window.scrollY + 150;
            let current = '';
            sections.forEach(section => {
                if (scrollPos >= section.offsetTop) {
                    current = section.getAttribute('id');
                }
            });
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        };
        window.addEventListener('scroll', setActive, { passive: true });
        setActive();
    }

    /* ----- Smooth scroll with header offset ----- */
    function initSmoothScroll() {
        const headerHeight = () => {
            const h = document.getElementById('site-header');
            return h ? h.offsetHeight : 0;
        };

        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (!href || href === '#') return;
                const target = document.querySelector(href);
                if (!target) return;
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.scrollY - headerHeight() + 1;
                window.scrollTo({ top, behavior: 'smooth' });
            });
        });
    }

    /* ----- Scroll reveal animation ----- */
    function initScrollReveal() {
        const selectors = [
            '.badge-card', '.service-card', '.sector-card',
            '.formality-card', '.method-step', '.why-card',
            '.market-card', '.value-card', '.faq-item',
            '.about-image', '.about-content',
            '.transport-content', '.transport-visual',
            '.section-header'
        ];
        const elements = document.querySelectorAll(selectors.join(','));
        elements.forEach(el => el.classList.add('reveal'));

        if (!('IntersectionObserver' in window)) {
            elements.forEach(el => el.classList.add('visible'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('visible'), i * 40);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        elements.forEach(el => observer.observe(el));
    }

    /* ----- Lazy load map iframe to improve performance ----- */
    function initLazyMap() {
        const iframe = document.querySelector('.map-wrapper iframe');
        if (!iframe || !('IntersectionObserver' in window)) return;
        // Already has loading="lazy", but ensure it's only loaded near viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) observer.unobserve(entry.target);
            });
        }, { rootMargin: '200px' });
        observer.observe(iframe);
    }

    /* ----- Contact form (Netlify Forms + AJAX with feedback) ----- */
    function initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        const feedback = document.getElementById('form-feedback');
        const submitBtn = form.querySelector('.btn-submit');

        // Live field validation
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('blur', () => validateField(field));
            field.addEventListener('input', () => {
                if (field.classList.contains('invalid')) validateField(field);
            });
        });

        function validateField(field) {
            if (field.name === 'bot-field') return true;
            let valid = true;
            const val = (field.value || '').trim();

            if (field.required && !val) valid = false;
            if (field.type === 'email' && val) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
                if (!re.test(val)) valid = false;
            }
            if (field.minLength > 0 && val && val.length < field.minLength) valid = false;
            if (field.tagName === 'SELECT' && field.required && !val) valid = false;

            field.classList.toggle('invalid', !valid);
            return valid;
        }

        function validateAll() {
            let allValid = true;
            form.querySelectorAll('input[required], select[required], textarea[required]').forEach(f => {
                if (!validateField(f)) allValid = false;
            });
            return allValid;
        }

        function showFeedback(type, message) {
            if (!feedback) return;
            feedback.className = 'form-feedback ' + type;
            feedback.textContent = message;
            try {
                feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } catch (e) { /* older browsers */ }
            if (type === 'success') {
                setTimeout(() => {
                    feedback.className = 'form-feedback';
                    feedback.textContent = '';
                }, 10000);
            }
        }

        // Encode FormData to application/x-www-form-urlencoded for Netlify
        function encode(data) {
            return Object.keys(data)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
                .join('&');
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            if (!validateAll()) {
                showFeedback('error', "Veuillez vérifier les champs en rouge avant d'envoyer votre demande.");
                return;
            }

            // Honeypot check (extra security)
            const bot = form.querySelector('[name="bot-field"]');
            if (bot && bot.value) return; // silent ignore for bots

            const originalText = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Envoi en cours...';
            }

            // Build form data object (so Netlify Forms receives all named fields)
            const data = {};
            const formData = new FormData(form);
            for (const [key, value] of formData.entries()) {
                data[key] = value;
            }
            // Ensure form-name is set
            data['form-name'] = 'contact';

            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: encode(data)
            }).then((response) => {
                if (response.ok) {
                    showFeedback(
                        'success',
                        "Merci ! Votre demande a bien été envoyée. Notre équipe AFIM Consulting vous contactera dans les plus brefs délais."
                    );
                    form.reset();
                    form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
                } else {
                    throw new Error('Network response was not ok');
                }
            }).catch(() => {
                showFeedback(
                    'error',
                    "Une erreur est survenue. Veuillez réessayer ou nous contacter directement par téléphone ou WhatsApp."
                );
            }).finally(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
            });
        });
    }

})();
