/* ============================================================================
   WebCraft Studio Portfolio — script.js
   ============================================================================ */

'use strict';

/* ───────────────────────────────────────────
   LOADER
─────────────────────────────────────────── */
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }, 1400);
});


/* ───────────────────────────────────────────
   CUSTOM CURSOR
─────────────────────────────────────────── */
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot) {
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top  = mouseY + 'px';
    }
});

function animateCursor() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    if (cursorRing) {
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top  = ringY + 'px';
    }
    requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .work-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursorRing) {
            cursorRing.style.width  = '56px';
            cursorRing.style.height = '56px';
            cursorRing.style.background = 'rgba(124, 58, 237, 0.15)';
        }
    });
    el.addEventListener('mouseleave', () => {
        if (cursorRing) {
            cursorRing.style.width  = '36px';
            cursorRing.style.height = '36px';
            cursorRing.style.background = 'transparent';
        }
    });
});


/* ───────────────────────────────────────────
   NAVBAR — scroll effect + hamburger
─────────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        const isOpen = mobileMenu.classList.contains('open');
        hamburger.setAttribute('aria-expanded', isOpen);
    });
}

function closeMobileMenu() {
    if (mobileMenu) mobileMenu.classList.remove('open');
}

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
    if (mobileMenu && mobileMenu.classList.contains('open')) {
        if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMobileMenu();
        }
    }
});


/* ───────────────────────────────────────────
   SCROLL REVEAL
─────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
            // Stagger sibling reveals
            const siblings = entry.target.parentElement.querySelectorAll('.reveal');
            let delay = 0;
            siblings.forEach((sib, i) => {
                if (sib === entry.target) delay = i * 80;
            });
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ───────────────────────────────────────────
   WORKS — click to open website
─────────────────────────────────────────── */
// Click on iframe overlay → open the website in a new tab
document.querySelectorAll('.iframe-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        const url = overlay.getAttribute('data-url');
        if (url) window.open(url, '_blank');
    });
});

// Also click on the work-card (outside overlay still triggers)
document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Only trigger if not clicking a nested link
        const url = card.getAttribute('data-url');
        if (url) window.open(url, '_blank');
    });
});


/* ───────────────────────────────────────────
   PRICING — WhatsApp messages
─────────────────────────────────────────── */
const WA_NUMBER = '918807682369';

const PLAN_MESSAGES = {
    standard: `Hi! 👋 I'm interested in the *Standard Plan* (₹2,999) for a website.

📦 *Standard Plan Details:*
• 5-Page Modern Website
• Responsive / Mobile Friendly
• Contact & WhatsApp Button
• Basic Animations
• Google Maps Integration
• Delivery in 3-5 Days

Please let me know how we can get started! 🚀`,

    premium: `Hi! 👋 I'm interested in the *Premium Plan* (₹5,999) for a website.

👑 *Premium Plan Details:*
• Unlimited Pages
• Fully Responsive Design
• WhatsApp & CTA Integration
• Scroll Frame Animations
• Premium UI with Glassmorphism
• Booking / Pricing Section
• Custom Domain Setup
• Delivery in 5-7 Days

Please let me know how we can get started! 🚀`
};

function sendWhatsApp(plan) {
    const message = PLAN_MESSAGES[plan];
    if (!message) return;
    const encodedMsg = encodeURIComponent(message);
    const url = `https://wa.me/${WA_NUMBER}?text=${encodedMsg}`;
    window.open(url, '_blank');
}

// Ripple effect on pricing buttons
document.querySelectorAll('.plan-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const circle = document.createElement('span');
        const diameter = Math.max(this.clientWidth, this.clientHeight);
        const radius = diameter / 2;
        circle.style.cssText = `
            width: ${diameter}px;
            height: ${diameter}px;
            left: ${e.clientX - this.getBoundingClientRect().left - radius}px;
            top: ${e.clientY - this.getBoundingClientRect().top - radius}px;
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.25);
            transform: scale(0);
            animation: ripple 0.5s linear;
            pointer-events: none;
        `;
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(circle);
        setTimeout(() => circle.remove(), 500);
    });
});

// Add ripple keyframes
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes ripple { to { transform: scale(3); opacity: 0; } }`;
document.head.appendChild(rippleStyle);


/* ───────────────────────────────────────────
   HERO — animated number counter
─────────────────────────────────────────── */
function animateCounter(el, target, prefix = '', suffix = '') {
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        el.textContent = prefix + current.toLocaleString('en-IN') + suffix;
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statsObserver.unobserve(entry.target);
            // No stat counters needed in hero since they're static text
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);





/* ───────────────────────────────────────────
   SMOOTH ANCHOR SCROLL
─────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});


/* ───────────────────────────────────────────
   TILT EFFECT ON WORK CARDS
─────────────────────────────────────────── */
document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;
        card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.4s ease';
    });
});


/* ───────────────────────────────────────────
   PRICING CARDS — highlight on hover
─────────────────────────────────────────── */
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        document.querySelectorAll('.pricing-card').forEach(c => {
            if (c !== card) c.style.opacity = '0.7';
        });
    });
    card.addEventListener('mouseleave', () => {
        document.querySelectorAll('.pricing-card').forEach(c => {
            c.style.opacity = '1';
        });
    });
});


/* ───────────────────────────────────────────
   ABOUT CARDS — stagger entrance
─────────────────────────────────────────── */
document.querySelectorAll('.about-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 100}ms`;
});


console.log('%cWebCraft Studio 🚀', 'font-size: 20px; font-weight: bold; color: #7c3aed;');
console.log('%cBuilt with ❤️ in Tamil Nadu, India', 'color: #06b6d4;');
