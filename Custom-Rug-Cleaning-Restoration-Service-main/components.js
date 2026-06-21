document.addEventListener('DOMContentLoaded', () => {
  const headerPlaceholder = document.getElementById('header-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');

  // Define Header HTML Content (Sticky Navigation with Dropdown menus)
  const headerHTML = `
    <!-- Floating Contact Buttons -->
    <div class="floating-contact">
      <a href="tel:+18005557847" class="float-btn float-call" aria-label="Call Us Now">
        <i class="fa-solid fa-phone"></i>
        <span class="tooltip">Call Us</span>
      </a>
      <a href="https://wa.me/18005557847" class="float-btn float-whatsapp" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <i class="fa-brands fa-whatsapp"></i>
        <span class="tooltip">WhatsApp</span>
      </a>
    </div>

    <header class="header" id="navbar">
      <div class="container nav-container">
        <a href="index.html" class="logo">
          <span class="logo-accent">Luxe</span>Rug
        </a>
        
        <!-- Desktop Navigation Menu -->
        <nav class="nav-menu-wrapper" id="nav-menu">
          <ul class="nav-list">
            <li class="nav-item"><a href="index.html" class="nav-link">Home</a></li>
            <li class="nav-item"><a href="home2.html" class="nav-link">Home 2</a></li>
            <li class="nav-item"><a href="about.html" class="nav-link">About</a></li>
            <li class="nav-item"><a href="services.html" class="nav-link">Services</a></li>
            <li class="nav-item dropdown-parent">
              <a href="#" class="nav-link dropdown-trigger">Guides <i class="fa-solid fa-chevron-down" style="font-size: 0.7rem; margin-left: 2px;"></i></a>
              <ul class="dropdown-menu">
                <li><a href="material-guide.html" class="dropdown-item-link">Material Guide</a></li>
                <li><a href="stain-guide.html" class="dropdown-item-link">Stain Removal Tips</a></li>
                <li><a href="process.html" class="dropdown-item-link">Our 6-Step Process</a></li>
              </ul>
            </li>
            <li class="nav-item"><a href="gallery.html" class="nav-link">Gallery</a></li>
            <li class="nav-item"><a href="blog.html" class="nav-link">Blog</a></li>
            <li class="nav-item"><a href="contact.html" class="nav-link">Contact</a></li>
            <li class="nav-item mobile-only-cta"><a href="booking.html" class="btn btn-accent btn-sm book-pickup-btn">Book Pickup</a></li>
          </ul>
        </nav>
        
        <div class="nav-actions">
          <button class="theme-toggle-btn animated-toggle" id="theme-toggle-header" title="Toggle Light/Dark Mode" aria-label="Toggle Light/Dark Mode">
            <span class="theme-icon-container">
              <i class="fa-solid fa-sun icon-sun"></i>
              <i class="fa-solid fa-moon icon-moon"></i>
            </span>
          </button>
          <button class="rtl-toggle-btn" id="rtl-toggle-header" title="Toggle RTL/LTR" aria-label="Toggle Right-to-Left mode">
            <span class="rtl-icon">RTL</span>
          </button>
          <a href="booking.html" class="btn btn-accent btn-sm book-pickup-btn">Book Pickup</a>
          <button class="hamburger-menu" id="hamburger-btn" aria-label="Open Navigation Menu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </button>
        </div>
      </div>
    </header>
  `;

  // Define Footer HTML Content (Top CTA banner and structures)
  const footerHTML = `
    <!-- Premium Large CTA Section -->
    <section class="large-cta-section section-padding">
      <div class="cta-background"></div>
      <div class="cta-overlay"></div>
      <div class="container text-center cta-container scroll-reveal fade-up">
        <h2>Schedule Your Rug Restoration Today</h2>
        <p>Book online or speak to our concierge specialists for a free, no-obligation estimate and complimentary white-glove collection.</p>
        <div class="cta-buttons">
          <a href="booking.html" class="btn btn-accent">Book Online Now</a>
          <a href="tel:+18005557847" class="btn btn-outline-white"><i class="fa-solid fa-phone"></i> Call 1-800-555-7847</a>
        </div>
      </div>
    </section>

    <!-- Footer Structure -->
    <footer class="footer">
      <div class="container footer-grid">
        
        <!-- Col 1: Brand -->
        <div class="footer-col brand-col">
          <a href="index.html" class="logo footer-logo"><span class="logo-accent">Luxe</span>Rug</a>
          <p class="footer-brand-desc">
            Professional, fully insured artisan workshop specializing in luxury, antique, Persian, and silk rug restoration and organic pool hand-washing.
          </p>
          <div class="social-links">
            <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="Pinterest"><i class="fa-brands fa-pinterest-p"></i></a>
            <a href="#" aria-label="Yelp"><i class="fa-brands fa-yelp"></i></a>
          </div>
        </div>

        <!-- Col 2: Services -->
        <div class="footer-col">
          <h4 class="footer-title">Our Services</h4>
          <ul class="footer-links">
            <li><a href="services.html">Artisan Rug Washing</a></li>
            <li><a href="services.html">Structural Rug Repair</a></li>
            <li><a href="services.html">Fringe Rebuilding</a></li>
            <li><a href="services.html">Pet Odor Elimination</a></li>
            <li><a href="services.html">Color Bleed Correction</a></li>
            <li><a href="services.html">Moth Proofing Shield</a></li>
          </ul>
        </div>

        <!-- Col 3: Quick Links -->
        <div class="footer-col">
          <h4 class="footer-title">Quick Links</h4>
          <ul class="footer-links">
            <li><a href="about.html">About Our Workshop</a></li>
            <li><a href="process.html">Our 6-Step Process</a></li>
            <li><a href="gallery.html">Before & After Gallery</a></li>
            <li><a href="testimonials.html">Customer Reviews</a></li>
            <li><a href="blog.html">Rug Care News</a></li>
            <li><a href="contact.html">Contact Us</a></li>
          </ul>
        </div>

        <!-- Col 4: Newsletter -->
        <div class="footer-col newsletter-col">
          <h4 class="footer-title">Subscribe to Care Tips</h4>
          <p>Get professional care tips and exclusive restoration discounts directly to your inbox.</p>
          <form class="newsletter-form" id="newsletter-form" novalidate>
            <div class="newsletter-input-group">
              <input type="email" class="form-control" id="newsletter-email" placeholder="Your Email Address" required aria-label="Email address for newsletter">
              <button type="submit" class="btn btn-accent" aria-label="Subscribe"><i class="fa-solid fa-paper-plane"></i></button>
            </div>
            <span class="error-msg" id="newsletter-error">Please enter a valid email</span>
            <span class="success-msg" id="newsletter-success">Thank you for subscribing!</span>
          </form>
        </div>

      </div>

      <!-- Bottom Copyright -->
      <div class="footer-bottom">
        <div class="container footer-bottom-flex">
          <p class="copyright-text">&copy; 2026 LuxeRug Inc. All rights reserved.</p>
          <div class="footer-policy-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  `;

  // 1. Inject Header HTML
  if (headerPlaceholder) {
    headerPlaceholder.outerHTML = headerHTML;
  }

  // 2. Inject Footer HTML
  if (footerPlaceholder) {
    footerPlaceholder.outerHTML = footerHTML;
  }

  // Define bindings that should occur after components have been loaded into DOM
  initializeInjectedComponents();
});

// Bind general event handlers to injected elements
function initializeInjectedComponents() {
  /* ==========================================================================
     Theme Switcher (Dark/Light Mode)
     ========================================================================== */
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  if (themeToggleBtns.length > 0) {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    const applyTheme = (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    };
    
    applyTheme(currentTheme);
    
    themeToggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(currentTheme);
      });
    });
  }

  /* ==========================================================================
     RTL / LTR Direction Toggle
     ========================================================================== */
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');
  if (rtlToggleBtns.length > 0) {
    const savedDir = localStorage.getItem('dir');
    const applyDir = (dir) => {
      document.documentElement.setAttribute('dir', dir);
      document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
      localStorage.setItem('dir', dir);
      rtlToggleBtns.forEach(btn => {
        btn.querySelector('.rtl-icon').textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      });
    };
    applyDir(savedDir || 'ltr');
    rtlToggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('dir') || 'ltr';
        applyDir(current === 'rtl' ? 'ltr' : 'rtl');
      });
    });
  }

  /* ==========================================================================
     Sticky Header Logic
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('sticky');
      } else {
        navbar.classList.remove('sticky');
      }
    });
  }

  /* ==========================================================================
     Mobile Hamburger Navigation Drawer
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  
  if (hamburgerBtn && navMenu) {
    const toggleMobileMenu = () => {
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    };
    
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
    
    const mobileLinks = navMenu.querySelectorAll('.nav-link:not(.dropdown-trigger)');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          toggleMobileMenu();
        }
      });
    });
    
    // Close mobile menu if clicked outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && e.target !== hamburgerBtn && !hamburgerBtn.contains(e.target)) {
        toggleMobileMenu();
      }
    });
  }

  /* ==========================================================================
     Dropdown Trigger Logic (Hover / Click on Mobile)
     ========================================================================== */
  const dropdownParent = document.querySelector('.dropdown-parent');
  const dropdownTrigger = document.querySelector('.dropdown-trigger');
  
  if (dropdownTrigger && dropdownParent) {
    dropdownTrigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 900) {
        e.preventDefault(); // Stop linking on mobile tap, open dropdown instead
        dropdownParent.classList.toggle('mobile-open');
      }
    });
  }

  /* ==========================================================================
     Active Link Highlighting
     ========================================================================== */
  const currentPath = window.location.pathname;
  let pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  if (pageName === '') pageName = 'index.html'; // Default to index for root /
  
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-item-link');
  let matched = false;
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const linkHref = link.getAttribute('href');
    if (linkHref === pageName) {
      link.classList.add('active');
      matched = true;
      
      // If it's a dropdown option, highlight the parent dropdown-trigger as well
      const parentDropdown = link.closest('.dropdown-parent');
      if (parentDropdown) {
        const parentTrigger = parentDropdown.querySelector('.dropdown-trigger');
        if (parentTrigger) parentTrigger.classList.add('active');
      }
    }
  });

  // Fallback: If on details pages or pricing, verify if parent dropdown should highlight
  if (!matched) {
    if (pageName.includes('blog-details')) {
      const blogLink = Array.from(navLinks).find(l => l.getAttribute('href') === 'blog.html');
      if (blogLink) blogLink.classList.add('active');
    }
  }

  /* ==========================================================================
     Footer Newsletter Form Validation
     ========================================================================== */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    const newsletterEmail = document.getElementById('newsletter-email');
    const newsletterError = document.getElementById('newsletter-error');
    const newsletterSuccess = document.getElementById('newsletter-success');
    
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailVal = newsletterEmail.value.trim();
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
      
      if (isValid) {
        if (newsletterError) newsletterError.style.display = 'none';
        if (newsletterSuccess) newsletterSuccess.style.display = 'block';
        newsletterEmail.value = '';
        newsletterEmail.classList.remove('invalid');
        
        setTimeout(() => {
          if (newsletterSuccess) newsletterSuccess.style.display = 'none';
        }, 5000);
      } else {
        if (newsletterSuccess) newsletterSuccess.style.display = 'none';
        if (newsletterError) newsletterError.style.display = 'block';
        newsletterEmail.classList.add('invalid');
      }
    });
  }
}
