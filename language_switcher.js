document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("theme-toggle");
  const modeLight = document.getElementById("mode-light");
  const modeDark = document.getElementById("mode-dark");
  const body = document.body;
  const languageSelect = document.getElementById("language-select");
  const elementsToTranslate = {
    title: document.querySelector("header h1"),
    welcomeMessage: document.querySelector(".hero h2"),
    shopNow: document.querySelector(".hero .btn"),
    aboutUsTitle: document.querySelector(".about h2"),
    aboutUsText: document.querySelector(".about p"),
    filters: document.querySelector(".filters h2"),
    priceLow: document.querySelector('#price-sort option[value="price-low"]'),
    priceHigh: document.querySelector('#price-sort option[value="price-high"]'),
    // product_1: document.querySelector(".p1"),
    addToCart: document.querySelectorAll(".card button"),
    footerText: document.querySelector("footer p"),
  };

  let currentLanguage = localStorage.getItem("language") || "en";
  let currentTheme = localStorage.getItem("theme") || "light";
  setTheme(currentTheme);
  languageSelect.value = currentLanguage;
  // values ftom json fle
  fetch("lang.json")
    .then((response) => response.json())
    .then((data) => {
      const langData = data[currentLanguage];
      updateTexts(langData);

      languageSelect.addEventListener("change", function () {
        currentLanguage = this.value;
        localStorage.setItem("language", currentLanguage);
        const newLangData = data[currentLanguage];
        updateTexts(newLangData);
      });
    });
  // for theme
  themeToggle.addEventListener("click", function () {
    currentTheme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", currentTheme);
    setTheme(currentTheme);
  });

  // txt updation code
  function updateTexts(langData) {
    for (const key in elementsToTranslate) {
      if (elementsToTranslate[key]) {
        if (key === "addToCart") {
          elementsToTranslate[key].forEach((button) => {
            button.textContent = langData[key];
          });
        } else {
          elementsToTranslate[key].textContent = langData[key];
        }
      }
    }
  }
  //   function for theme
  function setTheme(theme) {
    if (theme === "dark") {
      body.classList.add("dark-mode");
      modeLight.style.display = "none";
      modeDark.style.display = "inline";
    } else {
      body.classList.remove("dark-mode");
      modeLight.style.display = "inline";
      modeDark.style.display = "none";
    }
  }
});
