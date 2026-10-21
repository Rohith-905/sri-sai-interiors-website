/* Sri Sai Interiors website settings.
   Add your business phone and WhatsApp numbers before launch.
   Use international format, digits only. India country code is 91.
   Example format: 919876543210 (example only, not a real business number). */
const BUSINESS_PHONE = "919989287532";
const BUSINESS_WHATSAPP = "919989287532";

const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const enquiryForm = document.getElementById("enquiryForm");
const formStatus = document.getElementById("formStatus");
const floatingWhatsapp = document.getElementById("floatingWhatsapp");
const callBusiness = document.getElementById("callBusiness");

document.getElementById("year").textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

function validWhatsAppNumber(number) {
  return /^\d{10,15}$/.test(number);
}

function openWhatsApp(message) {
  if (!validWhatsAppNumber(BUSINESS_WHATSAPP)) {
    formStatus.textContent = "WhatsApp is not configured correctly yet. Please contact the business by phone.";
    return;
  }
  const url = "https://wa.me/" + BUSINESS_WHATSAPP + "?text=" + encodeURIComponent(message);
  window.open(url, "_blank", "noopener,noreferrer");
}

if (validWhatsAppNumber(BUSINESS_WHATSAPP)) {
  floatingWhatsapp.href = "https://wa.me/" + BUSINESS_WHATSAPP;
} else {
  floatingWhatsapp.addEventListener("click", (event) => {
    event.preventDefault();
    formStatus.textContent = "Please check the WhatsApp number configured for this website.";
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  });
}

enquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "";
  const formData = new FormData(enquiryForm);
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const service = String(formData.get("service") || "").trim();
  if (!name || !phone || !service) {
    formStatus.textContent = "Please complete your name, phone number, and service.";
    return;
  }
  const message = [
    "Hello Sri Sai Interiors, I would like to enquire about an interior project.",
    "",
    "Name: " + name,
    "Phone: " + phone,
    "Service: " + service,
    "Project location: " + (String(formData.get("location") || "").trim() || "Not provided"),
    "Approximate budget: " + (String(formData.get("budget") || "").trim() || "Not decided"),
    "Project details: " + (String(formData.get("details") || "").trim() || "Not provided")
  ].join("\n");
  openWhatsApp(message);
});

if (validWhatsAppNumber(BUSINESS_PHONE)) {
  callBusiness.href = "tel:+" + BUSINESS_PHONE;
  callBusiness.textContent = "Call Sri Sai Interiors";
} else {
  callBusiness.addEventListener("click", (event) => {
    event.preventDefault();
    formStatus.textContent = "Please add your business phone number in script.js before publishing the website.";
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  });
}

// Accessible category filters for the inspiration gallery.
const galleryFilters = document.querySelectorAll(".gallery-filter");
const galleryItems = document.querySelectorAll("#inspirationGallery .gallery-item");
galleryFilters.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;
    galleryFilters.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    galleryItems.forEach((item) => {
      item.hidden = selectedCategory !== "all" && item.dataset.category !== selectedCategory;
    });
  });
});


// Full-size accessible image viewer for inspiration photos.
const galleryViewer = document.createElement("div");
galleryViewer.className = "gallery-image-viewer";
galleryViewer.setAttribute("role", "dialog");
galleryViewer.setAttribute("aria-modal", "true");
galleryViewer.setAttribute("aria-label", "Inspiration photo viewer");
galleryViewer.setAttribute("tabindex", "-1");
galleryViewer.innerHTML = '<div class="gallery-viewer-content"><button class="gallery-viewer-close" type="button" aria-label="Close image viewer">×</button><img alt=""><p class="gallery-viewer-caption"></p></div>';
document.body.appendChild(galleryViewer);
const galleryViewerImage = galleryViewer.querySelector("img");
const galleryViewerCaption = galleryViewer.querySelector(".gallery-viewer-caption");
const galleryViewerClose = galleryViewer.querySelector(".gallery-viewer-close");
let galleryLastFocused = null;
function closeGalleryViewer() {
  galleryViewer.classList.remove("is-open");
  document.body.style.overflow = "";
  if (galleryLastFocused) galleryLastFocused.focus();
}
document.querySelectorAll("#inspirationGallery .gallery-image-wrap img").forEach((image) => {
  image.closest(".gallery-image-wrap").addEventListener("click", () => {
    galleryLastFocused = image.closest(".gallery-image-wrap");
    galleryViewerImage.src = image.src.replace(/w=\d+/, "w=1800");
    galleryViewerImage.alt = image.alt;
    galleryViewerCaption.textContent = image.closest(".gallery-item").querySelector("figcaption").textContent.trim() + " · Inspiration photo";
    galleryViewer.classList.add("is-open");
    document.body.style.overflow = "hidden";
    galleryViewerClose.focus();
  });
});
galleryViewerClose.addEventListener("click", closeGalleryViewer);
galleryViewer.addEventListener("click", (event) => {
  if (event.target === galleryViewer) closeGalleryViewer();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && galleryViewer.classList.contains("is-open")) closeGalleryViewer();
});
