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