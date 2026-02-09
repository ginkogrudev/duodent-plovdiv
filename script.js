/**
 * DuoDent Professional Logic
 * Developed by GG Solutions (GinkoGrudev.com)
 */

// 1. Dynamic Title Change (Micro-conversion trick)
window.addEventListener('blur', () => {
    document.title = "Върнете се! Вашата усмивка Ви чака 🦷";
});
window.addEventListener('focus', () => {
    document.title = "DuoDent | Модерна стоматология Пловдив";
});

// 2. Mobile Menu Logic
const menuToggle = document.getElementById('menu-toggle');
const closeMenu = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    mobileMenu.classList.toggle('translate-x-full');
    document.body.classList.toggle('overflow-hidden');
}

if(menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
}

// 3. Schema.org Injection (SEO)
const schemaData = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "DuoDent Dental Clinic",
  "image": "https://www.duodentplovdiv.com/img/logo.png", // Ensure you have a logo or remove this line
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ul. Kutlovitsa 6",
    "addressLocality": "Plovdiv",
    "postalCode": "4000",
    "addressCountry": "BG"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 42.1491,
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

// 4. Initialization
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    checkCookieConsent();

    // Scroll Observer for Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

// 5. Navbar Logic
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

// 6. Accordion Logic
function toggleAccordion(el) {
    const isExpanded = el.classList.contains('accordion-expanded');
    
    // Close others
    document.querySelectorAll('.hero-column').forEach(h => h.classList.remove('accordion-expanded'));

    if (!isExpanded) {
        el.classList.add('accordion-expanded');
    } else {
        el.classList.remove('accordion-expanded');
    }
}

// 7. Cookie Logic
function checkCookieConsent() {
    if (!localStorage.getItem('duodent_cookies')) {
        document.getElementById('cookie-bar').classList.remove('hidden');
    }
}

function acceptCookies() {
    localStorage.setItem('duodent_cookies', 'true');
    document.getElementById('cookie-bar').classList.add('hidden');
    if(window.dataLayer) {
        window.dataLayer.push({'event': 'cookie_consent_accepted'});
    }
}

// 8. Analytics & Conversion Tracking
function openBooking() {
    if(typeof gtag === 'function') {
        gtag('event', 'generate_lead', {
            'event_category': 'Engagement',
            'event_label': 'Superdoc Booking Click'
        });
    }
    window.open("https://superdoc.bg/klinika/dentalen-kabinet-duodent", "_blank");
}

function trackCall(doctorName) {
    if(typeof gtag === 'function') {
        gtag('event', 'contact', {
            'event_category': 'Conversion',
            'event_label': 'Phone Call: ' + doctorName
        });
    }
}

// 9. CUSTOM FORM LOGIC (Pure JS - No Web3Forms)
const conciergeForm = document.getElementById('conciergeForm');

if (conciergeForm) {
    conciergeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = this.querySelector('button');
        const originalText = btn.innerText;
        
        // Capture Data
        const name = document.getElementById('p_name').value;
        const phone = document.getElementById('p_phone').value;
        const date = document.getElementById('p_date').value;
        const time = document.getElementById('p_time').value;
        const sendWA = document.getElementById('sendWhatsApp').checked;
        const openCal = document.getElementById('openCalendar').checked;

        // Visual Feedback
        btn.innerText = "ОБРАБОТВАНЕ...";
        btn.disabled = true;

        // Construct Message
        const message = `Здравейте, казвам се ${name}. Искам да запазя час за ${date} (${time}). Телефонът ми е ${phone}.`;

        // Action 1: WhatsApp
        if (sendWA) {
            const clinicPhone = "359899177396"; 
            window.open(`https://wa.me/${clinicPhone}?text=${encodeURIComponent(message)}`, '_blank');
        }

        // Action 2: Google Calendar
        if (openCal) {
            const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Час+при+DuoDent&details=${encodeURIComponent(message)}`;
            setTimeout(() => {
                window.open(calUrl, '_blank');
            }, 1000);
        }

        // Analytics
        if(typeof gtag === 'function'){
            gtag('event', 'conversion', {'event_category': 'form', 'event_label': 'Concierge Booking'});
        }

        // Reset
        btn.innerText = "УСПЕШНО ЗАЯВЕНО! ✅";
        btn.classList.replace('bg-blue-600', 'bg-green-600');

        setTimeout(() => {
            this.reset();
            btn.innerText = originalText;
            btn.disabled = false;
            btn.classList.replace('bg-green-600', 'bg-blue-600');
        }, 3000);
    });
}