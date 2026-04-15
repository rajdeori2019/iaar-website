// =============================================
// NAVIGATION: scroll effect + mobile menu
// =============================================
const nav = document.querySelector('.nav');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

window.addEventListener('scroll', () => {
  nav && nav.classList.toggle('scrolled', window.scrollY > 20);
});

hamburger && hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu && mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger && hamburger.classList.remove('open');
    mobileMenu && mobileMenu.classList.remove('open');
  });
});

// Active nav link
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPath || (currentPath === '/' && href === '/') ||
      (href !== '/' && currentPath.startsWith(href))) {
    link.classList.add('active');
  }
});

// =============================================
// SCROLL REVEAL ANIMATIONS
// =============================================
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// =============================================
// JOIN US FORM SUBMISSION
// =============================================
const joinForm = document.getElementById('joinForm');
if (joinForm) {
  const APPS_SCRIPT_URL = window.APPS_SCRIPT_URL || '';

  joinForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = joinForm.querySelector('.form-submit');
    const errorEl = document.getElementById('formError');
    const successEl = document.getElementById('formSuccess');

    // Gather interests
    const interests = [];
    joinForm.querySelectorAll('input[name="interests"]:checked').forEach(cb => {
      interests.push(cb.value);
    });

    const payload = {
      name: joinForm.querySelector('[name="name"]').value.trim(),
      email: joinForm.querySelector('[name="email"]').value.trim(),
      phone: joinForm.querySelector('[name="phone"]').value.trim(),
      jobTitle: joinForm.querySelector('[name="jobTitle"]').value.trim(),
      company: joinForm.querySelector('[name="company"]').value.trim(),
      location: joinForm.querySelector('[name="location"]').value.trim(),
      linkedin: joinForm.querySelector('[name="linkedin"]').value.trim(),
      interests: interests.join(', '),
      referrer: joinForm.querySelector('[name="referrer"]') ? joinForm.querySelector('[name="referrer"]').value.trim() : ''
    };

    btn.disabled = true;
    btn.textContent = 'SUBMITTING...';
    errorEl && (errorEl.className = 'form-error');

    try {
      if (!APPS_SCRIPT_URL) {
        throw new Error('Form endpoint not configured. Please set APPS_SCRIPT_URL.');
      }

      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // no-cors mode means we can't read the response, but if fetch didn't throw it went through
      joinForm.style.display = 'none';
      successEl && (successEl.className = 'form-success show');

    } catch (err) {
      errorEl && (errorEl.className = 'form-error show');
      errorEl && (errorEl.textContent = 'Something went wrong. Please try again or email hello@iamarecruiter.in');
      btn.disabled = false;
      btn.textContent = 'JOIN THE COMMUNITY';
    }
  });
}

// =============================================
// EVENTS TAB SWITCHER
// =============================================
const tabs = document.querySelectorAll('.event-tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.dataset.tab;
    document.querySelectorAll('.tab-panel').forEach(panel => {
      panel.style.display = panel.id === target ? 'block' : 'none';
    });
  });
});
