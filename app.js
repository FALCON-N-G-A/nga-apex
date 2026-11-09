(function () {
  const storageKey = "nga-site-lang";
  const buttons = document.querySelectorAll("[data-lang-btn]");
  const nodes = document.querySelectorAll("[data-ar]");

  function apply(lang) {
    const isAr = lang !== "en";
    document.documentElement.lang = isAr ? "ar" : "en";
    document.body.dir = isAr ? "rtl" : "ltr";
    document.title = isAr
      ? "NGA Apex — تحميل المنظومة"
      : "NGA Apex — Official Downloads";

    nodes.forEach((el) => {
      const value = isAr ? el.getAttribute("data-ar") : el.getAttribute("data-en");
      if (value == null) return;
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.value = value;
      } else if (el.hasAttribute("data-html")) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    });

    buttons.forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang-btn") === (isAr ? "ar" : "en"));
    });

    try {
      localStorage.setItem(storageKey, isAr ? "ar" : "en");
    } catch (_) {
      /* ignore */
    }
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => apply(btn.getAttribute("data-lang-btn")));
  });

  const saved = (() => {
    try {
      return localStorage.getItem(storageKey);
    } catch (_) {
      return null;
    }
  })();
  apply(saved === "en" ? "en" : "ar");
})();
