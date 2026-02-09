/**
 * DuoDent Professional Logic
 * Developed by GG Solutions (GinkoGrudev.com)
 */

/**
 * SEO & Conversion Logic
 */

// 1. Dynamic Title Change (Micro-conversion trick)
window.addEventListener('blur', () => {
    document.title = "Върнете се! Вашата усмивка Ви чака 🦷";
});
window.addEventListener('focus', () => {
    document.title = "DuoDent | Модерна стоматология Пловдив";
});

// 2. Schema.org Injection (CRITICAL for Local SEO)
// This tells Google exactly where the clinic is and who the doctors are.
const schemaData = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "DuoDent Dental Clinic",
  "image": "https://yourdomain.com/logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ul. Kutlovitsa 6",
    "addressLocality": "Plovdiv",
    "postalCode": "4000",
    "addressCountry": "BG"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 42.1491, // Replace with actual
    "longitude": 24.7495
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:30"
  },
  "telephone": "+359899177396"
};

const script = document.createElement('script');
script.type = "application/ld+json";
script.innerHTML = JSON.stringify(schemaData);
document.head.appendChild(script);

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    checkCookieConsent();
});

function toggleAccordion(el) {
    const hint = document.getElementById('tap-hint');
    const isExpanded = el.classList.contains('accordion-expanded');
    
    // Close others if open (Optional)
    document.querySelectorAll('.hero-column').forEach(h => h.classList.remove('accordion-expanded'));

    if (!isExpanded) {
        el.classList.add('accordion-expanded');
        hint.innerText = "Кликнете за затваряне";
    } else {
        el.classList.remove('accordion-expanded');
        hint.innerText = "Кликнете за детайли";
    }
}

// Build-on-scroll Observer
const observerOptions = { threshold: 0.2 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Accordion Toggle Logic
function toggleAccordion(el) {
    const hint = document.getElementById('tap-hint');
    const isExpanded = el.classList.contains('accordion-expanded');
    
    // Reset any other states if needed
    if (!isExpanded) {
        el.classList.add('accordion-expanded');
        hint.innerText = "Кликнете за затваряне";
    } else {
        el.classList.remove('accordion-expanded');
        hint.innerText = "Кликнете за детайли";
    }
}

// Scroll Performance for Navbar
function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('py-2', 'shadow-md');
            navbar.classList.remove('py-4');
        } else {
            navbar.classList.add('py-4');
            navbar.classList.remove('py-2', 'shadow-md');
        }
    });
}

// Google Suite & Cookie Logic
function checkCookieConsent() {
    const consent = localStorage.getItem('duodent_cookies');
    if (!consent) {
        document.getElementById('cookie-bar').classList.remove('hidden');
    }
}

function acceptCookies() {
    localStorage.setItem('duodent_cookies', 'true');
    document.getElementById('cookie-bar').classList.add('hidden');
    
    // Trigger Google Analytics Push
    if(window.dataLayer) {
        window.dataLayer.push({'event': 'cookie_consent_accepted'});
    }
}

// Funnel Action
function openBooking() {
    // You can replace this with a Superdoc redirect or a Modal trigger
    window.open('https://superdoc.bg/', '_blank');
}