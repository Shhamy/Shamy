window.addEventListener("load", () => {
  if (window.instgrm) {
    window.instgrm.Embeds.process();
  }
});

document.querySelectorAll(".booking-form, .newsletter-form").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const status = form.parentElement.querySelector(".form-status");
    const submitButton = form.querySelector("button[type='submit']");
    const originalLabel = submitButton.textContent;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData);

    if (status) {
      status.hidden = true;
      status.className = "form-status";
      status.textContent = "";
    }

    submitButton.disabled = true;
    submitButton.textContent = "Envoi en cours...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.message || "Le formulaire n'a pas pu être envoyé.");
      }

      window.location.href = new URL("merci.html", window.location.href).href;
    } catch (error) {
      if (status) {
        status.innerHTML =
          'Le formulaire n&rsquo;a pas pu partir automatiquement. Essayez depuis le site publié sur GitHub Pages, ou écrivez directement à <a href="mailto:Shamynpro@gmail.com">Shamynpro@gmail.com</a>.';
        status.classList.add("is-error");
        status.hidden = false;
      }
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalLabel;
    }
  });
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
