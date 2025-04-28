// Scroll reveal animation for sections
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

sections.forEach(sec => {
  sec.classList.add('invisible');
  observer.observe(sec);
});

// Placeholder: Add more JS animations if needed.
