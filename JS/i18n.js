async function loadTranslations(locale) {
  try {
    let response = await fetch(`./lang/${locale}.json`); // for index.html
    if (!response.ok) {
      console.log("Primary fetch failed; attempting fallback...");
      response = await fetch(`../lang/${locale}.json`); // for HTML/project-name.html
      if (!response.ok) throw new Error("Translation file not found");
    }
    console.log(`${locale}.json loaded successfully.`);
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

  document.querySelectorAll("[data-i18n], [data-i18n-html]").forEach((el) => {
    // const key = el.getAttribute("data-i18n") || el.getAttribute("data-i18n-html");
    const key = el.dataset.i18n || el.dataset.i18nHtml;
    const value = resolvePath(translations, key);
    // if (value) el[el.getAttribute("data-i18n") ? "textContent" : "innerHTML"] = value;
    if (value) el[el.dataset.i18n ? "textContent" : "innerHTML"] = value;
  });
}

async function initTranslation() {
  const userLang = navigator.language || navigator.userLanguage;
  const lang = userLang.startsWith("es") ? "es" : "en";
  const translations = await loadTranslations(lang);
  document.documentElement.lang = lang;
  applyTranslations(translations);
}

document.addEventListener("DOMContentLoaded", initTranslation);
