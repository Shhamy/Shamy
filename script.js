window.addEventListener("load", () => {
  if (window.instgrm) {
    window.instgrm.Embeds.process();
  }
});

const animatedElements = document.querySelectorAll(
  ".section-heading, .event-feature, .secondary-events article, .bio-copy, .bio-stats span, .pro-grid article, .media-card, .contact-panel, .social-card, .proof-layout"
);

animatedElements.forEach((element) => {
  element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

animatedElements.forEach((element) => revealObserver.observe(element));

document.querySelectorAll('a[href^="#"], a[href*=".html#"]').forEach((link) => {
  link.addEventListener("click", () => {
    const targetId = link.hash;

    if (!targetId) {
      return;
    }

    window.setTimeout(() => {
      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      target.classList.remove("section-flash");
      void target.offsetWidth;
      target.classList.add("section-flash");
    }, 450);
  });
});
