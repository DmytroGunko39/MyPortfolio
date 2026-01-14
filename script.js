document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }

  const toggleScrollLock = (shouldLock) => {
    document.body.classList.toggle("no-scroll", shouldLock);
  };

  const navToggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = mobileMenu?.querySelectorAll("a[href^='#']");
  const closeButton = mobileMenu?.querySelector(".menu-close");
  const themeToggle = document.querySelector(".theme-toggle");

  const applyTheme = (theme) => {
    if (!theme) return;
    document.body.setAttribute("data-theme", theme);
    if (themeToggle) {
      const isLight = theme === "light";
      themeToggle.setAttribute("aria-pressed", String(isLight));
      themeToggle
        .querySelector(".theme-toggle__label")
        ?.replaceChildren(
          document.createTextNode(isLight ? "Dark mode" : "Light mode")
        );
    }
  };

  const preferred = localStorage.getItem("theme") || "dark";
  applyTheme(preferred);

  themeToggle?.addEventListener("click", () => {
    const current = document.body.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });

  const openMenu = () => {
    if (!navToggle || !mobileMenu) return;
    navToggle.setAttribute("aria-expanded", "true");
    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("aria-hidden", "false");
    toggleScrollLock(true);
  };

  const closeMenu = () => {
    if (!navToggle || !mobileMenu) return;
    navToggle.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    toggleScrollLock(false);
  };

  navToggle?.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    if (expanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeButton?.addEventListener("click", () => {
    closeMenu();
  });

  mobileLinks?.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || !targetId.startsWith("#")) return;

      const section = document.querySelector(targetId);
      if (section) {
        event.preventDefault();
        section.scrollIntoView({ behavior: "smooth" });
      }

      closeMenu();
    });
  });

  const desktopLinks = document.querySelectorAll(".site-nav a[href^='#']");
  desktopLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || !targetId.startsWith("#")) return;

      const section = document.querySelector(targetId);
      if (section) {
        event.preventDefault();
        section.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!button || !answer) return;

    button.addEventListener("click", () => {
      const isOpen = item.hasAttribute("open");

      faqItems.forEach((other) => {
        if (other !== item) {
          other.removeAttribute("open");
          const otherButton = other.querySelector(".faq-question");
          if (otherButton) {
            otherButton.setAttribute("aria-expanded", "false");
          }
        }
      });

      if (isOpen) {
        item.removeAttribute("open");
        button.setAttribute("aria-expanded", "false");
      } else {
        item.setAttribute("open", "");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
});
