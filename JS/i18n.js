async function loadTranslations(locale) {
  try {
    const response = await fetch(`../lang/${locale}.json`);
    if (!response.ok) throw new Error("Translation file not found");
    const translations = await response.json();
    return translations;
  } catch (error) {
    console.warn(
      "Failed to load translations, falling back to default.",
      error
    );
  }
}

// helper: resolve path like "a.b.c" against translations
function resolvePath(obj, path) {
  return path
    .split(".")
    .reduce((acc, key) => (acc && acc[key] ? acc[key] : null), obj);
}

function applyTranslations(translations) {
  const metaDescription = document.querySelector("meta[name='description']");
  const metaKey = metaDescription.getAttribute("data-attr");
  const metaValue = resolvePath(translations, metaKey);
  if (metaValue) metaDescription.setAttribute("content", metaValue);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = resolvePath(translations, key);
    if (value) el.textContent = value;
  });

  const footer = document.querySelector("footer");
  const footerKey = footer.getAttribute("data-innerhtml");
  const footerValue = resolvePath(translations, footerKey);
  if (footerValue) footer.innerHTML = footerValue;
}

async function initTranslation() {
  const userLang = navigator.language || navigator.userLanguage;
  const lang = userLang.startsWith("es") ? "es" : "en";
  const translations = await loadTranslations(lang);
  document.documentElement.lang = lang;
  applyTranslations(translations);
}

document.addEventListener("DOMContentLoaded", initTranslation);
