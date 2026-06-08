document.addEventListener("DOMContentLoaded", async () => {
  const langToggle = document.querySelector(".lang-toggle");
  const langOptions = langToggle?.querySelectorAll("[data-lang-option]");
  const themeToggle = document.querySelector(".theme-toggle");

  let translations = null;
  let currentLang = localStorage.getItem("lang") === "fr" ? "fr" : "en";

  try {
    const response = await fetch("/translations.json");
    translations = await response.json();
  } catch (error) {
    return;
  }

  const translate = (key) => {
    const dict = translations?.[currentLang];
    if (!dict) return undefined;
    return key
      .split(".")
      .reduce(
        (acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined),
        dict
      );
  };

  const updateThemeToggleLabel = () => {
    if (!themeToggle) return;
    const isLight = document.body.getAttribute("data-theme") === "light";
    const label = translate(isLight ? "theme.dark" : "theme.light");
    if (typeof label === "string") {
      themeToggle
        .querySelector(".theme-toggle__label")
        ?.replaceChildren(document.createTextNode(label));
    }
  };

  const applyTranslations = () => {
    document.documentElement.setAttribute("lang", currentLang);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const value = translate(el.getAttribute("data-i18n"));
      if (typeof value === "string") {
        el.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const value = translate(el.getAttribute("data-i18n-placeholder"));
      if (typeof value === "string") {
        el.setAttribute("placeholder", value);
      }
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
      const value = translate(el.getAttribute("data-i18n-aria-label"));
      if (typeof value === "string") {
        el.setAttribute("aria-label", value);
      }
    });

    langOptions?.forEach((option) => {
      option.classList.toggle(
        "is-active",
        option.getAttribute("data-lang-option") === currentLang
      );
    });

    updateThemeToggleLabel();
  };

  const setLanguage = (lang) => {
    if (lang !== "en" && lang !== "fr") return;
    currentLang = lang;
    localStorage.setItem("lang", lang);
    applyTranslations();
  };

  langOptions?.forEach((option) => {
    option.addEventListener("click", () => {
      const lang = option.getAttribute("data-lang-option");
      if (lang) setLanguage(lang);
    });
  });

  themeToggle?.addEventListener("click", () => {
    updateThemeToggleLabel();
  });

  window.getCurrentLang = () => currentLang;
  window.translateText = translate;

  applyTranslations();
});
