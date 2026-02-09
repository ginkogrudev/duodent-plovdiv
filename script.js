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

const menuToggle = document.getElementById('menu-toggle');
const closeMenu = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    mobileMenu.classList.toggle('translate-x-full');
    // Prevent scrolling when menu is open
    document.body.classList.toggle('overflow-hidden');
}

menuToggle.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);

// Close menu when a link is clicked
mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
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
// Function for Booking Clicks
function openBooking() {
    // This sends an event to Google Analytics
    gtag('event', 'generate_lead', {
        'event_category': 'Engagement',
        'event_label': 'Superdoc Booking Click'
    });
    
    window.open("https://superdoc.bg/klinika/dentalen-kabinet-duodent", "_blank");
}

document.getElementById('conciergeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const btn = form.querySelector('button');
    const originalText = btn.innerText;
    
    // 1. Capture Data
    const name = document.getElementById('p_name').value;
    const phone = document.getElementById('p_phone').value;
    const date = document.getElementById('p_date').value;
    const time = document.getElementById('p_time').value;
    const sendWA = document.getElementById('sendWhatsApp').checked;

    // 2. Visual Feedback
    btn.innerText = "ИЗПРАЩАНЕ...";
    btn.disabled = true;

    // 3. Send Email (via Web3Forms)
    const formData = new FormData(form);
    
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(async (response) => {
        if (response.status === 200) {
            
            // 4. TRIGGER WHATSAPP (The Magic)
            if (sendWA) {
                // Format: "Hello, I am [Name]. I would like to book for [Date] [Time]. My phone is [Phone]."
                const text = `Здравейте, казвам се ${name}. Искам да запазя час за ${date} (${time}). Телефонът ми е ${phone}.`;
                const encodedText = encodeURIComponent(text);
                
                // Replace with Dr. Giteva/Kasnakova's main mobile number (Format: 359...)
                const clinicPhone = "359899177396"; 
                
                // Open WhatsApp in new tab
                window.open(`https://wa.me/${clinicPhone}?text=${encodedText}`, '_blank');
            }

            // 5. Success State
            btn.innerText = "УСПЕШНО ИЗПРАТЕНО! ✅";
            btn.classList.replace('bg-blue-600', 'bg-green-600');
            
            // 6. Google Analytics Tracking
            if(typeof gtag === 'function'){
                gtag('event', 'conversion', {'event_category': 'form', 'event_label': 'Concierge Booking'});
            }

            setTimeout(() => {
                form.reset();
                btn.innerText = originalText;
                btn.disabled = false;
                btn.classList.replace('bg-green-600', 'bg-blue-600');
            }, 3000);
        }
    })
    .catch(error => {
        console.error(error);
        btn.innerText = "ГРЕШКА. МОЛЯ ОБАДЕТЕ СЕ.";
    });
});

// Function for Phone Calls
function trackCall(doctorName) {
    gtag('event', 'contact', {
        'event_category': 'Conversion',
        'event_label': 'Phone Call: ' + doctorName
    });
}