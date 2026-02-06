// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Fade-in elements on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(
  '.project-card, .timeline-item, .detail-card, .about-text, .testimonial-card'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Testimonial expand/collapse
document.querySelectorAll('.testimonial-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.testimonial-card');
    const expanded = card.classList.toggle('expanded');
    btn.textContent = expanded ? 'Show less' : 'Read full recommendation';
  });
});

// Side navigation — scroll tracking, active state, connector line
(function() {
  const sideNav = document.querySelector('.side-nav');
  if (!sideNav) return;

  const items = document.querySelectorAll('.side-nav-item');
  const progress = document.querySelector('.side-nav-progress');
  const connectorLine = document.querySelector('.connector-line');
  const sections = [];

  items.forEach(item => {
    const id = item.dataset.target;
    const section = document.getElementById(id);
    if (section) sections.push({ item, section, id });
  });

  function getActiveIndex() {
    const scrollY = window.scrollY + window.innerHeight * 0.35;
    let activeIdx = 0;
    sections.forEach(({ section }, i) => {
      if (section.offsetTop <= scrollY) activeIdx = i;
    });
    return activeIdx;
  }

  function updateProgress(activeIdx) {
    if (items.length < 2) return;
    const pct = (activeIdx / (items.length - 1)) * 100;
    progress.style.height = pct + '%';
  }

  function updateConnector(activeIdx) {
    const activeItem = sections[activeIdx].item;
    const activeSection = sections[activeIdx].section;
    const dot = activeItem.querySelector('.side-nav-dot');
    const dotRect = dot.getBoundingClientRect();
    const sectionRect = activeSection.getBoundingClientRect();

    const x1 = dotRect.left + dotRect.width / 2;
    const y1 = dotRect.top + dotRect.height / 2;
    const x2 = sectionRect.left;
    const y2 = Math.max(sectionRect.top, 0) + Math.min(sectionRect.height, window.innerHeight) * 0.15;

    connectorLine.setAttribute('x1', x1);
    connectorLine.setAttribute('y1', y1);
    connectorLine.setAttribute('x2', x2);
    connectorLine.setAttribute('y2', y2);

    // Only show connector when section is partially visible
    const sectionVisible = sectionRect.top < window.innerHeight && sectionRect.bottom > 0;
    if (sectionVisible) {
      connectorLine.classList.add('visible');
    } else {
      connectorLine.classList.remove('visible');
    }
  }

  function update() {
    const activeIdx = getActiveIndex();
    items.forEach((item, i) => {
      item.classList.toggle('active', i === activeIdx);
    });
    updateProgress(activeIdx);
    updateConnector(activeIdx);
  }

  // Click to scroll
  items.forEach(item => {
    item.addEventListener('click', () => {
      const section = document.getElementById(item.dataset.target);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  // Initial update
  requestAnimationFrame(update);
})();

// Add fade-in CSS dynamically
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);
