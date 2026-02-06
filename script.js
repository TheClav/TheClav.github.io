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
