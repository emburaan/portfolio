/**
 * PORTFOLIO — MAIN SCRIPT
 * Ink wash painting interactions & animations
 */

/* ----------------------------------------
   INK CANVAS BACKGROUND
---------------------------------------- */
const canvas = document.getElementById('inkCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Ink splash particles
const inkParticles = [];
for (let i = 0; i < 8; i++) {
  inkParticles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 200 + 80,
    opacity: Math.random() * 0.4 + 0.1,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15,
  });
}

function drawInkBlobs() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  inkParticles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < -p.r) p.x = canvas.width + p.r;
    if (p.x > canvas.width + p.r) p.x = -p.r;
    if (p.y < -p.r) p.y = canvas.height + p.r;
    if (p.y > canvas.height + p.r) p.y = -p.r;

    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
    grad.addColorStop(0, `rgba(26,23,20,${p.opacity})`);
    grad.addColorStop(0.6, `rgba(26,23,20,${p.opacity * 0.3})`);
    grad.addColorStop(1, 'rgba(26,23,20,0)');
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  });
  requestAnimationFrame(drawInkBlobs);
}
drawInkBlobs();


/* ----------------------------------------
   CUSTOM CURSOR
---------------------------------------- */
const cursor = document.createElement('div');
cursor.style.cssText = `
  position: fixed; width: 8px; height: 8px;
  background: #8b2020; border-radius: 50%;
  pointer-events: none; z-index: 9999;
  transform: translate(-50%, -50%);
  transition: width 0.2s, height 0.2s, background 0.2s;
  mix-blend-mode: multiply;
`;
document.body.appendChild(cursor);

const cursorRing = document.createElement('div');
cursorRing.style.cssText = `
  position: fixed; width: 32px; height: 32px;
  border: 1px solid rgba(139,32,32,0.4); border-radius: 50%;
  pointer-events: none; z-index: 9998;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease, transform 0.08s linear, border-color 0.2s;
`;
document.body.appendChild(cursorRing);

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

// Smooth ring follow
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Cursor hover effects
document.querySelectorAll('a, button, .project-card, .philosophy-strip__item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    cursorRing.style.width = '48px';
    cursorRing.style.height = '48px';
    cursorRing.style.borderColor = 'rgba(139,32,32,0.6)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '8px';
    cursor.style.height = '8px';
    cursorRing.style.width = '32px';
    cursorRing.style.height = '32px';
    cursorRing.style.borderColor = 'rgba(139,32,32,0.4)';
  });
});


/* ----------------------------------------
   NAVIGATION — SCROLL BEHAVIOR
---------------------------------------- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav__links');
navToggle?.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '100%';
  navLinks.style.left = '0';
  navLinks.style.right = '0';
  navLinks.style.background = 'rgba(245,240,232,0.97)';
  navLinks.style.padding = '1.5rem';
  navLinks.style.gap = '1.5rem';
  navLinks.style.borderBottom = '1px solid #e8e4df';
});

// Smooth scroll links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    if (navLinks.style.display === 'flex' && window.innerWidth < 900) {
      navLinks.style.display = 'none';
    }
  });
});


/* ----------------------------------------
   SCROLL REVEAL — INTERSECTION OBSERVER
---------------------------------------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.section__label, .section__title, .project-card').forEach(el => {
  revealObserver.observe(el);
});

// Staggered card reveal
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});


/* ----------------------------------------
   SKILL BARS — ANIMATED ON SCROLL
---------------------------------------- */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-item').forEach((item, i) => {
        setTimeout(() => item.classList.add('animated'), i * 120);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-group').forEach(group => skillObserver.observe(group));


/* ----------------------------------------
   INK DRIP ON PROJECT CARD HOVER
---------------------------------------- */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const ink = card.querySelector('.project-card__ink');
    if (ink) {
      ink.style.top = `${y - 50}%`;
      ink.style.right = `${100 - x - 30}%`;
    }
  });
});


/* ----------------------------------------
   CONTACT FORM
---------------------------------------- */
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', e => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = '✓ Sent — ありがとう';
  btn.style.background = '#2c4a2c';
  btn.style.borderColor = '#2c4a2c';
  setTimeout(() => {
    btn.textContent = 'Send Message 送信';
    btn.style.background = '';
    btn.style.borderColor = '';
    contactForm.reset();
  }, 3000);
});


/* ----------------------------------------
   PARALLAX HERO TEXT
---------------------------------------- */
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroContent = document.querySelector('.hero__content');
  const heroVertical = document.querySelector('.hero__vertical-text');
  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.25}px)`;
    heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.7));
  }
  if (heroVertical) {
    heroVertical.style.transform = `translateY(calc(-50% + ${scrolled * 0.1}px))`;
  }
});


/* ----------------------------------------
   ACTIVE NAV LINK HIGHLIGHTING
---------------------------------------- */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav__link');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinkEls.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` ? '#8b2020' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => activeObserver.observe(s));
