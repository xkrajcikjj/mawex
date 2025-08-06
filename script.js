// Moderný JavaScript pre interaktivitu stránky

// Funkcia na detekciu mobilných zariadení
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           ('ontouchstart' in window) ||
           (navigator.maxTouchPoints > 0) ||
           (navigator.msMaxTouchPoints > 0);
}

// Funkcia na aplikovanie mobilných štýlov pre galérie
function applyMobileGalleryStyles() {
    const galleryItems = document.querySelectorAll('.ems-gallery-item');
    const galleryImages = document.querySelectorAll('.ems-gallery-img');
    
    galleryItems.forEach(item => {
        item.style.cursor = 'default';
        item.style.pointerEvents = 'none';
    });
    
    galleryImages.forEach(img => {
        img.style.cursor = 'default';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Inicializácia všetkých funkcií
    initializeNavigation();
    initializeScrollEffects();
    initializeAccordion();
    initializeImageGallery();
    initializeAnimations();
    initializeFormHandling();
    updateCurrentYear();
    
    // Aplikovanie mobilných štýlov pre galérie
    if (isMobileDevice()) {
        applyMobileGalleryStyles();
    }
});

// Navigácia a mobilné menu
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('header');
    const dropdown = document.querySelector('.dropdown');
    const dropbtn = document.querySelector('.dropbtn');
    
    // Mobilné menu toggle
    if (navToggle && navbar) {
        navToggle.addEventListener('click', function() {
            navbar.classList.toggle('active');
            
            // Zatvorenie dropdown ak je otvorený
            if (dropdown) {
                dropdown.classList.remove('active');
            }
            
            // Animácia ikony
            const icon = navToggle.querySelector('.nav-toggle-icon');
            if (navbar.classList.contains('active')) {
                icon.innerHTML = '&#10005;'; // X symbol
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.innerHTML = '&#9776;'; // Hamburger symbol
                icon.style.transform = 'rotate(0deg)';
            }
        });
    }
    
    // Dropdown funkcionalita v mobilnom menu
    if (dropbtn && dropdown) {
        dropbtn.addEventListener('click', function(e) {
            // V mobilnom režime zabráň defaultnému správaniu
            if (window.innerWidth <= 950) {
                e.preventDefault();
                e.stopPropagation();
                dropdown.classList.toggle('active');
                
                // Animácia dropdown ikony
                const dropdownIcon = dropbtn.querySelector('.dropdown-icon');
                if (dropdown.classList.contains('active')) {
                    dropdownIcon.style.transform = 'rotate(45deg)';
                } else {
                    dropdownIcon.style.transform = 'rotate(0deg)';
                }
            }
        });
    }
    
    // Zatvorenie menu pri kliknutí na link (okrem dropdown tlačidla)
    const navLinks = document.querySelectorAll('.navbar a:not(.dropbtn)');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 950) {
                // Malé oneskorenie pre smooth prechod
                setTimeout(() => {
                    navbar.classList.remove('active');
                    const icon = navToggle.querySelector('.nav-toggle-icon');
                    icon.innerHTML = '&#9776;';
                    icon.style.transform = 'rotate(0deg)';
                    // Zatvorenie dropdown
                    if (dropdown) {
                        dropdown.classList.remove('active');
                        const dropdownIcon = dropbtn.querySelector('.dropdown-icon');
                        dropdownIcon.style.transform = 'rotate(0deg)';
                    }
                }, 150);
            }
        });
    });
    
    // Zatvorenie menu pri kliknutí mimo neho
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 950) {
            if (!header.contains(e.target) && navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                const icon = navToggle.querySelector('.nav-toggle-icon');
                icon.innerHTML = '&#9776;';
                icon.style.transform = 'rotate(0deg)';
                // Zatvorenie dropdown
                if (dropdown) {
                    dropdown.classList.remove('active');
                    const dropdownIcon = dropbtn.querySelector('.dropdown-icon');
                    dropdownIcon.style.transform = 'rotate(0deg)';
                }
            }
        }
    });
    
    // Reset pri zmene veľkosti okna
    window.addEventListener('resize', function() {
        if (window.innerWidth > 950) {
            navbar.classList.remove('active');
            if (dropdown) {
                dropdown.classList.remove('active');
            }
            const icon = navToggle.querySelector('.nav-toggle-icon');
            icon.innerHTML = '&#9776;';
            icon.style.transform = 'rotate(0deg)';
        }
    });
    
    // Smooth scrolling pre odkazy
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll efekty
function initializeScrollEffects() {
    const header = document.querySelector('header');
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // Header scroll efekt
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
            if (scrollToTopBtn) {
                scrollToTopBtn.classList.add('visible');
            }
        } else {
            header.classList.remove('scrolled');
            if (scrollToTopBtn) {
                scrollToTopBtn.classList.remove('visible');
            }
        }
    });
    
    // Scroll to top funkcia
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Parallax efekt pre hlavnú sekciu
    const mainSection = document.getElementById('main');
    if (mainSection) {
        window.addEventListener('scroll', function() {
            // Aktivovať parallax iba na obrazovkách väčších ako 950px
            if (window.innerWidth > 950) {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                mainSection.style.transform = `translateY(${rate}px)`;
            } else {
                // Na menších obrazovkách resetovať transform
                mainSection.style.transform = 'translateY(0px)';
            }
        });
        
        // Reset pri zmene veľkosti okna
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 950) {
                mainSection.style.transform = 'translateY(0px)';
            }
        });
    }
    
    // Intersection Observer pre animácie pri scrollovaní
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Pridanie pulse animácie pre produktové karty
                if (entry.target.classList.contains('image-card')) {
                    setTimeout(() => {
                        entry.target.classList.add('pulse-animation');
                        setTimeout(() => {
                            entry.target.classList.remove('pulse-animation');
                        }, 2000);
                    }, 200);
                }
            }
        });
    }, observerOptions);
    
    // Sledovanie elementov
    const animatedElements = document.querySelectorAll('.image-card, .product-section, .ems-gallery-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Accordion funkčnosť
function initializeAccordion() {
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            const content = document.getElementById(target);
            const isActive = this.classList.contains('active');
            
            // Zatvorenie všetkých ostatných accordionov
            accordionBtns.forEach(otherBtn => {
                if (otherBtn !== this) {
                    otherBtn.classList.remove('active');
                    const otherTarget = otherBtn.getAttribute('data-target');
                    const otherContent = document.getElementById(otherTarget);
                    if (otherContent) {
                        otherContent.classList.remove('active');
                    }
                }
            });
            
            // Toggle aktuálneho accordionu
            if (!isActive) {
                this.classList.add('active');
                if (content) {
                    content.classList.add('active');
                }
            } else {
                this.classList.remove('active');
                if (content) {
                    content.classList.remove('active');
                }
            }
        });
    });
}

// Galéria obrázkov s lightbox efektom
function initializeImageGallery() {
    const galleryImages = document.querySelectorAll('.ems-gallery-img');
    
    // Vytvorenie lightbox overlay
    const lightboxOverlay = document.createElement('div');
    lightboxOverlay.className = 'lightbox-overlay';
    lightboxOverlay.innerHTML = `
        <div class="lightbox-container">
            <img class="lightbox-image" src="" alt="">
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-prev">&#8249;</button>
            <button class="lightbox-next">&#8250;</button>
        </div>
    `;
    document.body.appendChild(lightboxOverlay);
    
    // CSS pre lightbox
    const lightboxStyles = `
        .lightbox-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            padding: 60px 80px 40px 80px;
            box-sizing: border-box;
        }
        
        .lightbox-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        .lightbox-container {
            position: relative;
            max-width: calc(100% - 160px);
            max-height: calc(100% - 160px);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .lightbox-image {
            max-width: 80%;
            max-height: 80%;
            width: auto;
            height: auto;
            object-fit: contain;
            border-radius: 8px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }
        
        .lightbox-close,
        .lightbox-prev,
        .lightbox-next {
            position: absolute;
            background: rgba(255, 255, 255, 0.95);
            border: none;
            color: #333;
            font-size: 2rem;
            font-weight: bold;
            padding: 12px 16px;
            cursor: pointer;
            border-radius: 50%;
            transition: all 0.3s ease;
            z-index: 10001;
            line-height: 1;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .lightbox-close {
            top: 15px;
            right: 15px;
        }
        
        .lightbox-prev {
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
        }
        
        .lightbox-next {
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
        }
        
        .lightbox-close:hover,
        .lightbox-prev:hover,
        .lightbox-next:hover {
            background: #4A90E2;
            color: white;
            transform: scale(1.1);
        }
        
        .lightbox-prev:hover {
            transform: translateY(-50%) scale(1.1);
        }
        
        .lightbox-next:hover {
            transform: translateY(-50%) scale(1.1);
        }
        
        @media (max-width: 768px) {
            .lightbox-overlay {
                padding: 20px;
            }
            
            .lightbox-container {
                max-width: calc(100% - 60px);
                max-height: calc(100% - 120px);
            }
            
            .lightbox-image {
                max-width: 85%;
                max-height: 85%;
            }
            
            .lightbox-image[src*="ems_contouring"] {
                max-width: 50% !important;
                max-height: 50% !important;
                padding: 0.8rem !important;
            }
            
            .lightbox-close {
                top: 10px;
                right: 10px;
                font-size: 1.8rem;
                width: 45px;
                height: 45px;
                padding: 8px;
            }
            
            .lightbox-prev,
            .lightbox-next {
                font-size: 1.8rem;
                width: 45px;
                height: 45px;
                padding: 8px;
            }
            
            .lightbox-prev {
                left: 10px;
            }
            
            .lightbox-next {
                right: 10px;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = lightboxStyles;
    document.head.appendChild(styleSheet);
    
    let currentImageIndex = 0;
    let currentGallery = [];
    
    // Event listenery pre galériu
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            // Zakázať lightbox na mobilných zariadeniach
            if (isMobileDevice()) {
                return; // Nepokračovať vo vykonávaní lightbox funkcie
            }
            
            const gallery = this.getAttribute('data-gallery');
            currentGallery = Array.from(document.querySelectorAll(`[data-gallery="${gallery}"]`));
            currentImageIndex = parseInt(this.getAttribute('data-index'));
            
            showLightbox(this.src);
        });
    });
    
    // Lightbox funkcionalita
    function showLightbox(imageSrc) {
        const lightboxImage = lightboxOverlay.querySelector('.lightbox-image');
        lightboxImage.src = imageSrc;
        
        // Detekcia EMS contouring obrázkov a aplikovanie špeciálnych štýlov
        if (imageSrc.includes('ems_contouring/')) {
            lightboxImage.style.background = '#ffffff';
            lightboxImage.style.padding = '1rem';
            lightboxImage.style.maxWidth = '35%';
            lightboxImage.style.maxHeight = '35%';
            lightboxImage.style.borderRadius = '12px';
        } else {
            lightboxImage.style.background = 'transparent';
            lightboxImage.style.padding = '0';
            lightboxImage.style.maxWidth = '80%';
            lightboxImage.style.maxHeight = '80%';
            lightboxImage.style.borderRadius = '8px';
        }
        
        lightboxOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function hideLightbox() {
        lightboxOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
        const nextImage = currentGallery[currentImageIndex];
        showLightbox(nextImage.src);
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
        const prevImage = currentGallery[currentImageIndex];
        showLightbox(prevImage.src);
    }
    
    // Event listenery pre lightbox ovládanie
    lightboxOverlay.querySelector('.lightbox-close').addEventListener('click', hideLightbox);
    lightboxOverlay.querySelector('.lightbox-next').addEventListener('click', showNextImage);
    lightboxOverlay.querySelector('.lightbox-prev').addEventListener('click', showPrevImage);
    
    lightboxOverlay.addEventListener('click', function(e) {
        if (e.target === lightboxOverlay) {
            hideLightbox();
        }
    });
    
    // Klávesové skratky
    document.addEventListener('keydown', function(e) {
        if (lightboxOverlay.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    hideLightbox();
                    break;
                case 'ArrowLeft':
                    showPrevImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
}

// Animácie a efekty
function initializeAnimations() {
    // Floating animácia pre produktové karty
    const productCards = document.querySelectorAll('.image-card');
    productCards.forEach((card, index) => {
        // Rozdielne timing pre každú kartu
        setTimeout(() => {
            card.style.animation = `float 6s ease-in-out infinite ${index * 0.5}s`;
        }, index * 200);
    });
    
    // CSS pre floating animáciu
    const floatingStyles = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
        }
    `;
    
    const floatingStyleSheet = document.createElement('style');
    floatingStyleSheet.textContent = floatingStyles;
    document.head.appendChild(floatingStyleSheet);
    
    // Typing efekt pre hlavný nadpis
    const mainTitle = document.querySelector('.section-title');
    if (mainTitle) {
        const originalText = mainTitle.textContent;
        mainTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                mainTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Spustenie po načítaní stránky
        setTimeout(typeWriter, 300);
    }
}

// Formuláre a kontakt
function initializeFormHandling() {
    // Ak budete pridávať kontaktný formulár, tu bude logika
    const contactLinks = document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Tracking pre kontaktné akcie
            console.log('Kontaktná akcia:', this.href);
        });
    });
}

// Aktualizácia roku
function updateCurrentYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Optimalizácia výkonu
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading pre obrázky
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Responsive navigation optimalization
window.addEventListener('resize', debounce(() => {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    
    if (window.innerWidth > 768) {
        navbar.classList.remove('active');
        if (navToggle) {
            const icon = navToggle.querySelector('.nav-toggle-icon');
            icon.innerHTML = '&#9776;';
        }
    }
}, 250));

// Service Worker pre PWA (ak bude potrebné)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Accessibility vylepšenia
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Google Analytics / tracking (ak bude potrebné)
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Export funkcií pre testovanie
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeNavigation,
        initializeScrollEffects,
        initializeAccordion,
        debounce
    };
}
