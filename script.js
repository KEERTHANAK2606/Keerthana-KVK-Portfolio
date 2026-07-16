/* ============================================
   LOADER
   ============================================ */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 600);
});

/* ============================================
   INIT AOS
   ============================================ */
if (typeof AOS !== 'undefined') {
  AOS.init({ duration: 900, once: true, offset: 80, easing: 'ease-out-cubic' });
}

/* ============================================
   TYPED.JS HERO ROLE
   ============================================ */
if (typeof Typed !== 'undefined') {
  new Typed('#typed', {
    strings: [
      'Software Developer',
      'IoT Engineer',
      'UI/UX Enthusiast',
      'Generative AI Explorer'
    ],
    typeSpeed: 55,
    backSpeed: 30,
    backDelay: 1600,
    loop: true
  });
}

/* ============================================
   CUSTOM CURSOR
   ============================================ */
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');

if (window.matchMedia('(hover: hover)').matches) {
  window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    cursorOutline.animate(
      [{ left: e.clientX + 'px', top: e.clientY + 'px' }],
      { duration: 400, fill: 'forwards' }
    );
  });

  document.querySelectorAll('a, button, .tilt-card, .mini-card, .tag, .tool-chip').forEach(el => {
    el.addEventListener('mouseenter', () => cursorOutline.classList.add('active'));
    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('active'));
  });
}

/* ============================================
   NAVBAR SCROLL STATE + ACTIVE LINK
   ============================================ */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 140;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });

  // Back to top button
  backToTop.classList.toggle('show', window.scrollY > 500);
});

/* ============================================
   MOBILE MENU TOGGLE
   ============================================ */
const burger = document.getElementById('burger');
const navLinksList = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinksList.classList.toggle('open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinksList.classList.remove('open');
  });
});

/* ============================================
   BACK TO TOP
   ============================================ */
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================
   SKILL PROGRESS BARS (animate on view)
   ============================================ */
const bars = document.querySelectorAll('.bar-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width + '%';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
bars.forEach(bar => barObserver.observe(bar));

/* ============================================
   COUNTER ANIMATION
   ============================================ */
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const decimal = el.dataset.decimal ? parseInt(el.dataset.decimal) : null;
      const finalValue = decimal !== null ? parseFloat(`${target}.${decimal}`) : target;
      let current = 0;
      const duration = 1600;
      const steps = 60;
      const increment = finalValue / steps;
      const stepTime = duration / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= finalValue) {
          current = finalValue;
          clearInterval(timer);
        }
        el.textContent = decimal !== null ? current.toFixed(2) : Math.floor(current);
      }, stepTime);

      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

/* ============================================
   3D TILT ON PROJECT CARDS
   ============================================ */
document.querySelectorAll('.tilt-card').forEach(card => {
  const inner = card.querySelector('.project-card');
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    inner.style.transform = 'rotateX(0) rotateY(0) translateY(0)';
  });
});

/* ============================================
   CONTACT FORM (client-side demo handling)
   ============================================ */
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formNote.textContent = "Thanks! Please reach me directly via email for now — keerthanavk69@gmail.com";
  contactForm.reset();
  setTimeout(() => { formNote.textContent = ''; }, 6000);
});

/* ============================================
   FOOTER YEAR
   ============================================ */
document.getElementById('year').textContent = new Date().getFullYear();

/* ============================================
   PARTICLE BACKGROUND (canvas)
   ============================================ */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particlesArray = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.documentElement.scrollHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const colors = ['#3b82f6', '#22d3ee', '#a855f7', '#7c3aed'];

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * window.innerHeight;
    this.size = Math.random() * 2 + 0.6;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.alpha = Math.random() * 0.5 + 0.2;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > window.innerHeight * 1.2) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function initParticles() {
  particlesArray = [];
  const count = Math.min(90, Math.floor((canvas.width * window.innerHeight) / 18000));
  for (let i = 0; i < count; i++) particlesArray.push(new Particle());
}
initParticles();
window.addEventListener('resize', initParticles);

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, window.innerHeight * 1.2);
  particlesArray.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ============================================
   PARALLAX ON HERO CARD (subtle, mouse-based)
   ============================================ */
const heroCard = document.querySelector('.hero-card');
if (heroCard && window.matchMedia('(min-width: 901px)').matches) {
  document.getElementById('hero').addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    heroCard.style.transform = `translate(${x}px, ${y}px)`;
  });
}
