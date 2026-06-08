document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  const button = form.querySelector('button[type="submit"]');

  const t = (key, fallback) => window.translateText?.(key) ?? fallback;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    button.disabled = true;
    button.textContent = t("contact.sending", "Sending...");

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        button.textContent = t("contact.success", "✓ Message sent!");
        button.classList.add("success");
        form.reset();
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      button.textContent = t("contact.error", "✗ Failed to send");
      button.classList.add("error");
    }

    setTimeout(() => {
      button.textContent = t("contact.send", "Send message");
      button.classList.remove("success", "error");
      button.disabled = false;
    }, 2000);
  });
});
