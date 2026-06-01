const bookingForm = document.querySelector("#booking-form");
const formStatus = document.querySelector("#form-status");

if (bookingForm && formStatus) {
  bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = bookingForm.querySelector("button[type='submit']");
    const originalLabel = submitButton.textContent;
    const formData = new FormData(bookingForm);

    formStatus.hidden = true;
    formStatus.className = "form-status";
    submitButton.disabled = true;
    submitButton.textContent = "Envoi en cours...";

    try {
      const response = await fetch(bookingForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Le message n'a pas pu être envoyé.");
      }

      bookingForm.reset();
      bookingForm.hidden = true;
      formStatus.textContent = "Demande envoyée. Vous serez contacté dans les plus brefs délais.";
      formStatus.classList.add("is-success");
      formStatus.hidden = false;
    } catch (error) {
      formStatus.innerHTML =
        'Le message n&rsquo;a pas pu partir automatiquement. Vous pouvez écrire directement à <a href="mailto:Shamynpro@gmail.com">Shamynpro@gmail.com</a>.';
      formStatus.classList.add("is-error");
      formStatus.hidden = false;
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalLabel;
    }
  });
}
