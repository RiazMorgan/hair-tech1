/**
 * Hair Technique — main.js
 * GSAP animations, scroll triggers, interactive components
 */

// ── Utility: reduced motion check ──────────────────────────
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Page Loader ────────────────────────────────────────────
const pageLoader = document.getElementById('page-loader');
window.addEventListener('load', () => {
  setTimeout(() => {
    if (pageLoader) pageLoader.classList.add('hidden');
  }, 800);
});

// ── Navbar scroll behaviour ────────────────────────────────
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
}, { passive: true });

// ── Mobile nav toggle ──────────────────────────────────────
const hamburger = document.getElementById('nav-hamburger');
const navLinks  = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// ── GSAP Setup ────────────────────────────────────────────
(function initGSAP() {
  if (typeof gsap === 'undefined' || prefersReducedMotion) return;

  gsap.registerPlugin(ScrollTrigger);

  // ── Hero Animations ──────────────────────────────────────
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .fromTo('.hero-tag',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, delay: 0.5 }
    )
    .fromTo('.hero-headline .line-1',
      { opacity: 0, y: 60, skewY: 3 },
      { opacity: 1, y: 0, skewY: 0, duration: 0.9 },
      '-=0.3'
    )
    .fromTo('.hero-headline .line-2',
      { opacity: 0, y: 60, skewY: 3 },
      { opacity: 1, y: 0, skewY: 0, duration: 0.9 },
      '-=0.6'
    )
    .fromTo('.hero-headline .line-3',
      { opacity: 0, y: 60, skewY: 3 },
      { opacity: 1, y: 0, skewY: 0, duration: 0.9 },
      '-=0.6'
    )
    .fromTo('.hero-sub',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7 },
      '-=0.5'
    )
    .fromTo('.hero-actions',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    )
    .fromTo('.hero-trust',
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.3'
    )
    .fromTo('.hero-panel',
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.7 },
      '-=0.55'
    );

  // ── Scroll Reveal helper ──────────────────────────────────
  function revealOnScroll(selector, options = {}) {
    const defaults = {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    };
    const merged = { ...defaults, ...options };
    gsap.fromTo(selector, { opacity: 0, y: options.y || 40 }, merged);
  }

  // Section labels
  gsap.utils.toArray('.section-label').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, x: -20 },
      {
        opacity: 1, x: 0, duration: 0.6,
        scrollTrigger: { trigger: el, start: 'top 88%' }
      }
    );
  });

  // Section titles
  gsap.utils.toArray('.section-title').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      }
    );
  });

  // Technique cards
  gsap.utils.toArray('.technique-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0,
        duration: 0.7,
        delay: i * 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: '#technique', start: 'top 75%' }
      }
    );
  });

  // Story section
  gsap.fromTo('.story-image-frame',
    { opacity: 0, x: -50 },
    {
      opacity: 1, x: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '#story', start: 'top 75%' }
    }
  );
  gsap.fromTo('.story-content',
    { opacity: 0, x: 50 },
    {
      opacity: 1, x: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '#story', start: 'top 75%' }
    }
  );
  gsap.utils.toArray('.story-stat-num').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.6, delay: i * 0.15,
        scrollTrigger: { trigger: '.story-stats', start: 'top 85%' }
      }
    );
  });

  // Service cards
  gsap.utils.toArray('.service-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        duration: 0.7,
        delay: i * 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: '#services', start: 'top 75%' }
      }
    );
  });

  // Why items
  gsap.utils.toArray('.why-item').forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0,
        duration: 0.6,
        delay: i * 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: '#why', start: 'top 75%' }
      }
    );
  });

  // Gallery items
  gsap.utils.toArray('.gallery-item').forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0, scale: 0.94 },
      {
        opacity: 1, scale: 1,
        duration: 0.6,
        delay: i * 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: '#gallery', start: 'top 78%' }
      }
    );
  });

  // CTA banner
  const ctaTl = gsap.timeline({
    scrollTrigger: { trigger: '#cta-banner', start: 'top 75%' }
  });
  ctaTl
    .fromTo('.cta-urgency', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 })
    .fromTo('.cta-banner-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.2')
    .fromTo('.cta-banner-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
    .fromTo('.cta-banner-actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');

  // Testimonial cards
  gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, x: 40 },
      {
        opacity: 1, x: 0,
        duration: 0.6,
        delay: i * 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: '#testimonials', start: 'top 78%' }
      }
    );
  });

  // FAQ
  gsap.fromTo('.faq-item',
    { opacity: 0, x: 20 },
    {
      opacity: 1, x: 0,
      duration: 0.5,
      stagger: 0.08,
      scrollTrigger: { trigger: '#faq', start: 'top 78%' }
    }
  );
})();

// ── FAQ Accordion ──────────────────────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // Close all
    document.querySelectorAll('.faq-question').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });

    // Toggle clicked
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.classList.add('open');
    }
  });
});

// ── Testimonials slider ────────────────────────────────────
const testimonialsTrack = document.getElementById('testimonials-track');
const prevBtn = document.getElementById('testimonials-prev');
const nextBtn = document.getElementById('testimonials-next');

if (testimonialsTrack && prevBtn && nextBtn) {
  const scrollAmount = () => {
    const card = testimonialsTrack.querySelector('.testimonial-card');
    return card ? card.offsetWidth + 32 : 300;
  };

  prevBtn.addEventListener('click', () => {
    testimonialsTrack.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    testimonialsTrack.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });
}

// ── Marquee pause on hover ─────────────────────────────────
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  marqueeTrack.addEventListener('mouseenter', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  });
  marqueeTrack.addEventListener('mouseleave', () => {
    marqueeTrack.style.animationPlayState = 'running';
  });
}

// ── Newsletter form ────────────────────────────────────────
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('.newsletter-input');
    const btn   = newsletterForm.querySelector('.btn');

    if (!input.value.trim() || !input.value.includes('@')) {
      input.style.borderColor = '#ff4444';
      setTimeout(() => { input.style.borderColor = ''; }, 2000);
      return;
    }

    btn.textContent = 'You\'re In! ✓';
    btn.disabled = true;
    btn.style.background = 'var(--grad-metallic)';
    input.value = '';
  });
}

// ── Active nav link on scroll ──────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchorLinks = document.querySelectorAll('.nav-links a[href^="#"]');

if (navAnchorLinks.length && sections.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchorLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(sec => observer.observe(sec));
}

// ── Smooth scroll for all anchor links ─────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Lazy load images (IntersectionObserver) ────────────────
const lazyImages = document.querySelectorAll('img[data-src]');
if ('IntersectionObserver' in window) {
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imgObserver.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  lazyImages.forEach(img => imgObserver.observe(img));
} else {
  // Fallback: load all immediately
  lazyImages.forEach(img => { img.src = img.dataset.src; });
}

// ── Button metallic sheen mouse follow ─────────────────────
document.querySelectorAll('.btn-metallic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    btn.style.background = `linear-gradient(${x + 90}deg, #6b757f 0%, #c0c8d0 30%, #e8ecf0 50%, #c0c8d0 70%, #6b757f 100%)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.background = '';
  });
});

console.log('%c✂ HAIR TECHNIQUE', 'font-size: 24px; font-weight: bold; color: #c0c8d0;');
console.log('%cPrecision. Artistry. Edge.', 'color: #8a9199; font-size: 14px;');
