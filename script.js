/* ============================================
   GHULAM MUSTAFA — Material Expressive Portfolio
   Interactive JavaScript Module
   ============================================ */

(function () {
  'use strict';

  // ========================================
  // PAGE LOADER
  // ========================================
  window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 500);
      }, 600);
    }
  });

  // ========================================
  // SCROLL PROGRESS BAR
  // ========================================
  const scrollProgress = document.querySelector('.scroll-progress');
  function updateScrollProgress() {
    if (!scrollProgress) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';
  }

  // ========================================
  // NAVIGATION
  // ========================================
  const nav = document.getElementById('topNav');
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  const mobileOverlay = document.querySelector('.mobile-menu-overlay');

  function toggleMobileMenu() {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    if (mobileOverlay) {
      mobileOverlay.classList.toggle('active');
    }
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  }

  function closeMobileMenu() {
    if (hamburger && hamburger.classList.contains('open')) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      if (mobileOverlay) mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // Close mobile menu on nav link click
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // Nav scroll effect
  function handleNavScroll() {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }
  }

  // Active nav link highlighting
  const sections = document.querySelectorAll('section[id]');
  function highlightActiveNav() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const navLink = navLinks?.querySelector(`a[href="#${sectionId}"]`);
      if (navLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  }

  // ========================================
  // SCROLL REVEAL (Intersection Observer)
  // ========================================
  function initScrollReveal() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Don't unobserve to allow re-entry effects if needed
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });
  }

  // ========================================
  // BACK TO TOP BUTTON
  // ========================================
  const backToTop = document.querySelector('.back-to-top');
  function handleBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========================================
  // CURSOR GLOW EFFECT (Desktop Only)
  // ========================================
  const cursorGlow = document.querySelector('.cursor-glow');
  function handleCursorGlow(e) {
    if (!cursorGlow) return;
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  }

  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', handleCursorGlow);
  }

  // ========================================
  // TILT EFFECT ON HERO CARD
  // ========================================
  const heroCard = document.querySelector('.hero-card');
  if (heroCard && window.matchMedia('(pointer: fine)').matches) {
    heroCard.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      heroCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    heroCard.addEventListener('mouseleave', () => {
      heroCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  }

  // ========================================
  // SMOOTH ANCHOR SCROLLING
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========================================
  // COUNTER ANIMATION FOR STATS
  // ========================================
  function animateCounters() {
    const statNums = document.querySelectorAll('.stat-chip .num');
    const observerOptions = {
      threshold: 0.8
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          const target = entry.target.textContent.trim();
          const number = parseInt(target);
          const suffix = target.replace(/[0-9]/g, '');
          if (!isNaN(number)) {
            let current = 0;
            const increment = Math.max(1, Math.floor(number / 30));
            const timer = setInterval(() => {
              current += increment;
              if (current >= number) {
                current = number;
                clearInterval(timer);
              }
              entry.target.textContent = current + suffix;
            }, 40);
          }
        }
      });
    }, observerOptions);

    statNums.forEach(num => counterObserver.observe(num));
  }

  // ========================================
  // SKILL CHIPS STAGGER ANIMATION
  // ========================================
  function initSkillChipAnimation() {
    const skillsGrid = document.querySelector('.skills-grid');
    if (!skillsGrid) return;

    const chips = skillsGrid.querySelectorAll('.skill-chip');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          chips.forEach((chip, index) => {
            chip.style.animationDelay = `${index * 0.04}s`;
            chip.classList.add('animate-in');
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(skillsGrid);
  }

  // ========================================
  // PROJECT FILTERS
  // ========================================
  function initProjectFilters() {
    const buttons = document.querySelectorAll('.project-filter-btn');
    const cards = document.querySelectorAll('.project-card');

    const titlePlatformMap = {
      'Apna BVS': 'mobile',
      'Maalco Foods': 'mobile',
      'TLS AMS App': 'mobile',
      'Coach & Lead': 'mobile',
      'LNPS App': 'mobile',
      'TLS Interpreting App': 'mobile',
      'GPT Stories For Kids': 'mobile',
      'Triisum': 'mobile',
      'American Lyceum SLMS': 'mobile',
      'Cyber Gamer Exchange': 'web',
      'Cybergift': 'web',
      'Mastercard Gaming Exchange': 'web',
      'Papersetting': 'web',
      'International School of Musicians': 'web'
    };

    function getCardPlatform(card) {
      if (card.dataset.platform) {
        return card.dataset.platform;
      }
      const title = card.querySelector('.project-title')?.textContent?.trim() || '';
      return titlePlatformMap[title] || 'all';
    }

    function applyFilter(filter) {
      cards.forEach(card => {
        const platform = getCardPlatform(card);
        if (filter === 'all' || platform === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    }

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filter = button.getAttribute('data-filter');
        applyFilter(filter);
      });
    });
  }

  // Add CSS for skill chip animation
  const skillAnimStyle = document.createElement('style');
  skillAnimStyle.textContent = `
    .skill-chip {
      opacity: 0;
      transform: translateY(20px) scale(0.9);
    }
    .skill-chip.animate-in {
      animation: chipIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    }
    @keyframes chipIn {
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  `;
  document.head.appendChild(skillAnimStyle);

  // ========================================
  // TYPING EFFECT FOR HERO TITLE
  // ========================================
  function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const titles = [
      'Full Solution Architect',
      'Flutter Expert',
      'Software Engineer',
      'Team Leader'
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    // Set initial text (already in HTML)
    const originalText = heroTitle.textContent;

    function type() {
      const currentTitle = titles[titleIndex];

      if (isPaused) {
        isPaused = false;
        isDeleting = true;
        setTimeout(type, 1500);
        return;
      }

      if (isDeleting) {
        charIndex--;
        heroTitle.textContent = currentTitle.substring(0, charIndex);
      } else {
        charIndex++;
        heroTitle.textContent = currentTitle.substring(0, charIndex);
      }

      // Add cursor element
      const cursor = heroTitle.querySelector('.typewriter-cursor') || document.createElement('span');
      cursor.className = 'typewriter-cursor';
      heroTitle.appendChild(cursor);

      let typeSpeed = isDeleting ? 30 : 60;

      if (!isDeleting && charIndex === currentTitle.length) {
        isPaused = true;
        typeSpeed = 2500;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    }

    // Start typing after page load
    setTimeout(() => {
      heroTitle.textContent = '';
      type();
    }, 1500);
  }

  // ========================================
  // PARALLAX ON SCROLL (Subtle)
  // ========================================
  function initParallax() {
    const heroText = document.querySelector('.hero-text');
    const heroCardEl = document.querySelector('.hero-card');

    if (!heroText || !heroCardEl || window.matchMedia('(max-width: 768px)').matches) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroText.style.transform = `translateY(${scrollY * 0.08}px)`;
        heroCardEl.style.transform = `translateY(${scrollY * 0.04}px)`;
      }
    }, { passive: true });
  }

  // ========================================
  // MAGNETIC BUTTON EFFECT
  // ========================================
  function initMagneticButtons() {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const buttons = document.querySelectorAll('.btn-filled, .btn-tonal, .btn-outlined');
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ========================================
  // HIRE ME CHANNEL SELECTOR
  // ========================================
  function initHireMeModal() {
    const hireBtn = document.getElementById('hireBtn');
    const hireModal = document.getElementById('hireModal');
    const overlay = document.getElementById('hireModalOverlay');
    const closeBtn = document.getElementById('hireModalClose');
    const whatsappBtn = document.getElementById('whatsappHireBtn');
    const emailBtn = document.getElementById('emailHireBtn');
    const emailFormSection = document.getElementById('hireEmailForm');
    const selectSection = document.getElementById('hireStepSelect');
    const backToSelectBtn = document.getElementById('backToContactChoice');
    const emailForm = document.getElementById('hireEmailFormElement');

    const whatsappNumber = '+923174953538';
    const emailAddress = '6534gm@gmail.com';

    function openModal() {
      hireModal.classList.remove('hidden');
      overlay.classList.remove('hidden');
      hireModal.setAttribute('aria-hidden', 'false');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      // reset choose step
      selectSection.classList.remove('hidden');
      emailFormSection.classList.add('hidden');
    }

    function closeModal() {
      hireModal.classList.add('hidden');
      overlay.classList.add('hidden');
      hireModal.setAttribute('aria-hidden', 'true');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function openEmailForm() {
      selectSection.classList.add('hidden');
      emailFormSection.classList.remove('hidden');
    }

    if (hireBtn) {
      hireBtn.addEventListener('click', openModal);
      hireBtn.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openModal();
        }
      });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);

    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', () => {
        const defaultText = `Hi Ghulam, I found your profile and would like to discuss a project.

Project type: 
Timeline: 
Budget: 
Key requirements: 
Additional notes: `;
        const url = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(defaultText)}`;
        window.open(url, '_blank');
        closeModal();
      });
    }

    if (emailBtn) {
      emailBtn.addEventListener('click', () => {
        openEmailForm();
      });
    }

    if (backToSelectBtn) {
      backToSelectBtn.addEventListener('click', () => {
        selectSection.classList.remove('hidden');
        emailFormSection.classList.add('hidden');
      });
    }

    if (emailForm) {
      emailForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const values = Object.fromEntries(new FormData(emailForm));
        const subject = encodeURIComponent(`Project Inquiry: ${values.projectName || '[Project]'}`);
        const body = encodeURIComponent(`Hi Ghulam,

I would like to hire you for:
- Project name: ${values.projectName}
- Timeline: ${values.timeline}
- Budget: ${values.budget}
- Key requirements: ${values.requirements}
- Additional notes: ${values.message}

Name: ${values.fullName}
Company: ${values.company}

Please reply with availability and next steps.
`);

        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}&su=${subject}&body=${body}`;
        window.open(gmailUrl, '_blank');
        closeModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
  }

  // ========================================
  // CONSOLIDATED SCROLL HANDLER
  // ========================================
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleNavScroll();
        highlightActiveNav();
        handleBackToTop();
        updateScrollProgress();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ========================================
  // INITIALIZATION
  // ========================================
  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    animateCounters();
    initSkillChipAnimation();
    initProjectFilters();
    initHireMeModal();
    initTypingEffect();
    initParallax();
    initMagneticButtons();

    // Initial calls
    handleNavScroll();
    highlightActiveNav();
    handleBackToTop();
    updateScrollProgress();
  });

  // ========================================
  // KEYBOARD NAVIGATION: ESC closes mobile menu
  // ========================================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });

})();
