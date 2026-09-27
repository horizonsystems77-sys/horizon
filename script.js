const html = document.documentElement;
const langToggle = document.getElementById("langToggle");
const langLabel = document.getElementById("langLabel");
const year = document.getElementById("year");

let currentLang = localStorage.getItem("hamza-lang") || "ar";

function applyLanguage(lang) {
  currentLang = lang;
  html.lang = lang;
  html.dir = lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-ar][data-en]").forEach(el => {
    el.textContent = el.getAttribute(lang === "ar" ? "data-ar" : "data-en");
  });
  langLabel.textContent = lang === "ar" ? "EN" : "AR";
  document.title = lang === "ar"
    ? "المهندس حمزه وسيم ياسر | Eng. Hamza Wasim Ali Yasser"
    : "Eng. Hamza Wasim Ali Yasser | المهندس حمزه وسيم ياسر";
  localStorage.setItem("hamza-lang", lang);
}

langToggle.addEventListener("click", () => {
  applyLanguage(currentLang === "ar" ? "en" : "ar");
});

year.textContent = new Date().getFullYear();
applyLanguage(currentLang);

// Reveal animations
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Certificate/CV lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");

document.querySelectorAll(".certificate-card").forEach(card => {
  card.addEventListener("click", () => {
    lightboxImage.src = card.dataset.image;
    lightboxImage.alt = currentLang === "ar" ? card.dataset.titleAr : card.dataset.titleEn;
    lightboxTitle.textContent = currentLang === "ar" ? card.dataset.titleAr : card.dataset.titleEn;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-close-lightbox]").forEach(el => {
  el.addEventListener("click", closeLightbox);
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
});
