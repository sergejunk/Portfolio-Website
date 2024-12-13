// Initialize i18next
i18next.init({
  lng: 'en', // Default language
  resources: translations, // Translation JSON
}, function (err, t) {
  updateContent(); // Update content initially
});

// Function to update content dynamically
function updateContent() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const i18nKey = el.getAttribute("data-i18n");
    const translatedText = i18next.t(i18nKey);

    // Check if the element is an input or textarea for placeholder translation
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      el.setAttribute("placeholder", translatedText); // Update the placeholder attribute
    } else {
      el.innerHTML = translatedText; // Default behavior for other elements
    }
  });
}

// Handle dropdown language selection
document.querySelectorAll(".dropdown-content button").forEach((button) => {
  button.addEventListener("click", () => {
    const selectedLang = button.getAttribute("data-lang");
    i18next.changeLanguage(selectedLang, () => {
      updateContent(); // Reapply translations after changing language
    });
  });
});
