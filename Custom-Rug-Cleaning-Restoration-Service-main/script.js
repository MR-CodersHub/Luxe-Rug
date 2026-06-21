document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Scroll Reveal Animations (Intersection Observer)
     ========================================================================== */
  const scrollElements = document.querySelectorAll('.scroll-reveal');
  
  if (scrollElements.length > 0) {
    const elementObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });
    
    scrollElements.forEach(el => elementObserver.observe(el));
  }


  /* ==========================================================================
     2. Animated Numerical Counters (About Us & Home 2)
     ========================================================================== */
  const counterNumbers = document.querySelectorAll('.counter-number');
  
  if (counterNumbers.length > 0) {
    const startCounter = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const duration = 2000;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;
      
      const counterTimer = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.textContent = target.toLocaleString() + '+';
          clearInterval(counterTimer);
        } else {
          el.textContent = Math.floor(current).toLocaleString() + '+';
        }
      }, stepTime);
    };
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });
    
    counterNumbers.forEach(num => counterObserver.observe(num));
  }


  /* ==========================================================================
     3. Generalized Before-and-After Multi-Slider Engine
     ========================================================================== */
  const setupBeforeAfterSliders = () => {
    const sliders = document.querySelectorAll('.before-after-container');
    
    sliders.forEach(slider => {
      if (slider.getAttribute('data-slider-initialized')) return;
      slider.setAttribute('data-slider-initialized', 'true');
      
      const beforeImgWrapper = slider.querySelector('.image-before-wrapper');
      const handle = slider.querySelector('.slider-handle');
      if (!beforeImgWrapper || !handle) return;
      
      let isDragging = false;
      
      const moveSlider = (clientX) => {
        const rect = slider.getBoundingClientRect();
        if (rect.width === 0) return;
        const position = clientX - rect.left;
        let percentage = (position / rect.width) * 100;
        
        if (percentage < 0) percentage = 0;
        if (percentage > 100) percentage = 100;
        
        beforeImgWrapper.style.width = `${percentage}%`;
        handle.style.left = `${percentage}%`;
      };
      
      // Mouse Events
      slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        moveSlider(e.clientX);
      });
      
      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        moveSlider(e.clientX);
      });
      
      window.addEventListener('mouseup', () => {
        isDragging = false;
      });
      
      // Touch Events (Mobile responsiveness)
      slider.addEventListener('touchstart', (e) => {
        isDragging = true;
        moveSlider(e.touches[0].clientX);
      });
      
      window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        moveSlider(e.touches[0].clientX);
      });
      
      window.addEventListener('touchend', () => {
        isDragging = false;
      });
    });
  };

  // Run slider setup
  setupBeforeAfterSliders();


  /* ==========================================================================
     4. Testimonial Sliding Carousel
     ========================================================================== */
  const slider = document.getElementById('testimonial-slider');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('slider-prev-btn');
  const nextBtn = document.getElementById('slider-next-btn');
  const dotsContainer = document.getElementById('carousel-dots-container');
  
  if (slider && slides.length > 0 && prevBtn && nextBtn && dotsContainer) {
    let currentSlideIndex = 0;
    let autoPlayTimer;
    
    // Clear and build dots
    dotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to testimonial slide ${index + 1}`);
      dotsContainer.appendChild(dot);
      
      dot.addEventListener('click', () => {
        goToSlide(index);
        resetAutoPlay();
      });
    });
    
    const dots = document.querySelectorAll('.carousel-dot');
    
    const goToSlide = (index) => {
      if (index >= slides.length) index = 0;
      if (index < 0) index = slides.length - 1;
      
      currentSlideIndex = index;
      slider.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
      
      slides.forEach(slide => slide.classList.remove('active'));
      slides[currentSlideIndex].classList.add('active');
      
      dots.forEach(dot => dot.classList.remove('active'));
      dots[currentSlideIndex].classList.add('active');
    };
    
    const nextSlide = () => goToSlide(currentSlideIndex + 1);
    const prevSlide = () => goToSlide(currentSlideIndex - 1);
    
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoPlay();
    });
    
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoPlay();
    });
    
    const startAutoPlay = () => {
      autoPlayTimer = setInterval(nextSlide, 6000);
    };
    
    const resetAutoPlay = () => {
      clearInterval(autoPlayTimer);
      startAutoPlay();
    };
    
    startAutoPlay();
    
    const carouselWrapper = document.querySelector('.testimonial-carousel-wrapper');
    if (carouselWrapper) {
      carouselWrapper.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
      carouselWrapper.addEventListener('mouseleave', startAutoPlay);
    }
  }


  /* ==========================================================================
     5. Advanced Case File Lightbox & Project Registry (Gallery Page)
     ========================================================================== */
  const projectDatabase = {
    tabriz: {
      tag: "Persian Tabriz",
      title: "19th Century Tabriz Heirloom",
      desc: "An irreplaceable family heirloom woven in the historic workshops of northwest Persia. Hand-treated with delicate botanical cleansing solutions to preserve its highly-prized madder red dyes.",
      origin: "Northwest Persia (c. 1890) - Heritage Wool",
      damage: "Severe fringe unraveling, edge warp erosion, heavy soot contamination.",
      report: "42 hours of fine warp reconstruction, custom edge knot-securing, and 12-stage submersive organic dust extraction wash.",
      before: "assets/rug_before.png",
      after: "assets/rug_after.png"
    },
    kashan: {
      tag: "Silk Kashan",
      title: "Imperial Kashan Pure Silk",
      desc: "A collector-grade pure silk masterpiece displaying high knot density and intricate floral medallions. Rescued from deep pet stain contamination using modern enzyme neutralization.",
      origin: "Central Persia (c. 1920) - 100% Pure Silk Pile",
      damage: "Pet urine acid discoloration, pile fuzzing, border color bleeds.",
      report: "Chemical tannin extraction, localized vinegar stabilizer bath, pile micro-trimming, and cold-air dry-tension conditioning.",
      before: "assets/ethnic_rug_bazaar.jpg",
      after: "assets/colorful_rug_pattern.jpg"
    },
    heriz: {
      tag: "Vintage Heriz",
      title: "Vintage Geometric Heriz",
      desc: "Characterized by bold geometric medallions and heavy wool pile. Fully restored from red wine spills and structural furniture friction damage.",
      origin: "East Azerbaijan Province (c. 1910) - Durable Highland Wool",
      damage: "Severe red wine stain spots, 4-inch diagonal boundary tear.",
      report: "Targeted alcohol stain extraction, foundation cotton warp re-threading, and hand-knotted pile re-weaving matching aged dyes.",
      before: "assets/rug_before.png",
      after: "assets/rug_after.png"
    },
    isfahan: {
      tag: "Antique Isfahan",
      title: "Isfahan Antique Medallion",
      desc: "Woven in the legendary city of Isfahan with exceptional symmetry and wool-on-silk foundation. Hand-restored to museum standards.",
      origin: "Central Iran (c. 1930) - Kork Wool Pile on Fine Silk Warp",
      damage: "Light moth grazing, minor fringe wear, dust accumulation.",
      report: "Moth larvae sanitization wash, hand-overcast edge binding, and delicate lanolin pile replenishment conditioning.",
      before: "assets/dark_oriental_rug.jpg",
      after: "assets/oriental_rug_detail.jpg"
    }
  };

  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-grid .gallery-card');
  
  if (filterBtns.length > 0 && galleryCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        galleryCards.forEach(card => {
          const categories = card.getAttribute('data-category').split(' ');
          if (filterValue === 'all' || categories.includes(filterValue)) {
            card.classList.remove('hidden');
            setTimeout(() => {
              card.classList.add('reveal-active');
            }, 50);
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // Setup Enhanced Lightbox modal
  const setupEnhancedLightbox = () => {
    const viewButtons = document.querySelectorAll('.view-case-btn');
    const lightbox = document.getElementById('lightbox-modal');
    
    if (viewButtons.length === 0 || !lightbox) return;
    
    const closeBtn = document.getElementById('lightbox-close');
    const imgAfter = document.getElementById('lightbox-img-after');
    const imgBefore = document.getElementById('lightbox-img-before');
    const sliderWrapper = document.getElementById('lightbox-before-wrapper');
    const sliderHandle = document.getElementById('lightbox-slider-handle');
    
    const projectTag = document.getElementById('lightbox-project-tag');
    const projectTitle = document.getElementById('lightbox-project-title');
    const projectDesc = document.getElementById('lightbox-project-desc');
    const specOrigin = document.getElementById('lightbox-spec-origin');
    const specDamage = document.getElementById('lightbox-spec-damage');
    const specReport = document.getElementById('lightbox-spec-report');
    
    viewButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const projectKey = btn.getAttribute('data-project');
        const projectData = projectDatabase[projectKey];
        
        if (!projectData) return;
        
        // Populating project data
        projectTag.textContent = projectData.tag;
        projectTitle.textContent = projectData.title;
        projectDesc.textContent = projectData.desc;
        specOrigin.textContent = projectData.origin;
        specDamage.textContent = projectData.damage;
        specReport.textContent = projectData.report;
        
        // Setting up images
        imgAfter.src = projectData.after;
        imgBefore.src = projectData.before;
        
        // Reset slider position in lightbox
        if (sliderWrapper && sliderHandle) {
          sliderWrapper.style.width = '50%';
          sliderHandle.style.left = '50%';
        }
        
        // Open lightbox
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Re-initialize slider logic on the newly loaded images
        setTimeout(() => {
          setupBeforeAfterSliders();
        }, 100);
      });
    });
    
    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };
    
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) {
        closeLightbox();
      }
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  };

  setupEnhancedLightbox();


  /* ==========================================================================
     6. FAQ Accordion Expanding panels (FAQ Page)
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const btn = item.querySelector('.faq-question-btn');
      const panel = item.querySelector('.faq-answer-panel');
      
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close other FAQs
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer-panel').style.maxHeight = null;
        });
        
        // Toggle current FAQ
        if (!isActive) {
          item.classList.add('active');
          panel.style.maxHeight = panel.scrollHeight + "px";
        } else {
          item.classList.remove('active');
          panel.style.maxHeight = null;
        }
      });
    });
  }


  /* ==========================================================================
     7. Dynamic Pricing Calculator Math Engine & Redirection (Pricing Page)
     ========================================================================== */
  const setupPricingCalculator = () => {
    const widthEl = document.getElementById('calc-width');
    const heightEl = document.getElementById('calc-height');
    const materialEl = document.getElementById('calc-material');
    const serviceEl = document.getElementById('calc-service');
    const stainsEl = document.getElementById('calc-stains');
    const restorationEl = document.getElementById('calc-restoration');
    
    const odorEl = document.getElementById('add-odor');
    const mothEl = document.getElementById('add-moth');
    const padEl = document.getElementById('add-pad');
    
    const bookBtn = document.getElementById('calc-book-btn');
    
    if (!widthEl || !heightEl || !materialEl || !serviceEl || !stainsEl || !restorationEl) return;
    
    const updateCalculator = () => {
      const width = parseInt(widthEl.value, 10);
      const height = parseInt(heightEl.value, 10);
      const sqft = width * height;
      
      // Update dimensions labeling
      document.getElementById('width-val').textContent = `${width} ft`;
      document.getElementById('height-val').textContent = `${height} ft`;
      document.getElementById('res-sqft').textContent = `${sqft} sq ft (${width}x${height})`;
      
      // 1. Base Material Rates
      let baseRate = 4.00;
      switch (materialEl.value) {
        case 'wool': baseRate = 4.00; break;
        case 'persian': baseRate = 6.00; break;
        case 'silk': baseRate = 10.00; break;
        case 'antique': baseRate = 8.00; break;
        case 'cotton': baseRate = 3.50; break;
        case 'synthetic': baseRate = 3.00; break;
      }
      const basePrice = sqft * baseRate;
      
      // 2. Service Tier Modifiers
      let serviceRate = 0.00;
      switch (serviceEl.value) {
        case 'bronze': serviceRate = 0.00; break;
        case 'silver': serviceRate = 2.00; break;
        case 'gold': serviceRate = 5.00; break;
      }
      const servicePrice = sqft * serviceRate;
      
      // 3. Stain Extraction Fees
      let stainRate = 0.00;
      switch (stainsEl.value) {
        case 'none': stainRate = 0.00; break;
        case 'light': stainRate = 0.50; break;
        case 'med': stainRate = 1.00; break;
        case 'severe': stainRate = 2.00; break;
      }
      const stainsPrice = sqft * stainRate;
      
      // 4. Structural Restoration flat rates
      let repairPrice = 0.00;
      switch (restorationEl.value) {
        case 'none': repairPrice = 0.00; break;
        case 'minor': repairPrice = 50.00; break;
        case 'major': repairPrice = 200.00; break;
      }
      
      // 5. Specialty Add-ons (checkboxes)
      let addonRate = 0.00;
      if (odorEl && odorEl.checked) addonRate += 1.50;
      if (mothEl && mothEl.checked) addonRate += 1.00;
      if (padEl && padEl.checked) addonRate += 2.50;
      const addonsPrice = sqft * addonRate;
      
      const totalPrice = basePrice + servicePrice + stainsPrice + repairPrice + addonsPrice;
      
      // Inject text values
      document.getElementById('break-base').textContent = `$${basePrice.toFixed(2)}`;
      document.getElementById('break-service').textContent = `$${servicePrice.toFixed(2)}`;
      document.getElementById('break-stains').textContent = `$${stainsPrice.toFixed(2)}`;
      document.getElementById('break-repair').textContent = `$${repairPrice.toFixed(2)}`;
      document.getElementById('break-addons').textContent = `$${addonsPrice.toFixed(2)}`;
      document.getElementById('break-subtotal').textContent = `$${totalPrice.toFixed(2)}`;
      
      // Number count-up animation
      animatePriceField(totalPrice);
    };

    let animInterval;
    const animatePriceField = (target) => {
      const field = document.getElementById('calc-final-price');
      if (!field) return;
      
      clearInterval(animInterval);
      
      const currentVal = parseFloat(field.textContent.replace('$', '').replace(',', '')) || 0;
      const difference = target - currentVal;
      
      if (Math.abs(difference) < 1) {
        field.textContent = `$${Math.round(target)}`;
        return;
      }
      
      const duration = 400; // ms
      const stepTime = 20; // ms
      const steps = duration / stepTime;
      const stepVal = difference / steps;
      let count = 0;
      let runningPrice = currentVal;
      
      animInterval = setInterval(() => {
        runningPrice += stepVal;
        count++;
        
        if (count >= steps) {
          field.textContent = `$${Math.round(target)}`;
          clearInterval(animInterval);
        } else {
          field.textContent = `$${Math.round(runningPrice)}`;
        }
      }, stepTime);
    };
    
    // Attach input listeners
    [widthEl, heightEl].forEach(slider => {
      slider.addEventListener('input', updateCalculator);
    });
    
    [materialEl, serviceEl, stainsEl, restorationEl].forEach(dropdown => {
      dropdown.addEventListener('change', updateCalculator);
    });
    
    [odorEl, mothEl, padEl].forEach(chk => {
      if (chk) chk.addEventListener('change', updateCalculator);
    });
    
    // Calculator redirect to Booking Concierge
    if (bookBtn) {
      bookBtn.addEventListener('click', () => {
        const sessionPayload = {
          width: widthEl.value,
          height: heightEl.value,
          material: materialEl.value,
          service: serviceEl.value,
          stains: stainsEl.value,
          restoration: restorationEl.value,
          price: document.getElementById('break-subtotal').textContent
        };
        
        sessionStorage.setItem('luxeEstimate', JSON.stringify(sessionPayload));
        window.location.href = 'booking.html';
      });
    }

    // Initial update
    updateCalculator();
  };

  setupPricingCalculator();


  /* ==========================================================================
     8. Real-Time Booking form validation, Toggles & Concierge success view
     ========================================================================== */
  const bookingForm = document.getElementById('pickup-booking-form');
  let generatedCodeDetails = null; // Storing user booking in-memory for tracking query
  
  if (bookingForm) {
    const formWrapper = document.getElementById('booking-form-wrapper');
    const successWrapper = document.getElementById('booking-success-wrapper');
    const submitBtn = document.getElementById('booking-submit-trigger');
    
    // Address & time fields added
    const nameEl = document.getElementById('booking-name');
    const emailEl = document.getElementById('booking-email');
    const phoneEl = document.getElementById('booking-phone');
    const streetEl = document.getElementById('booking-street');
    const cityEl = document.getElementById('booking-city');
    const zipEl = document.getElementById('booking-zip');
    
    const rugTypeEl = document.getElementById('booking-rug-type');
    const serviceEl = document.getElementById('booking-service');
    const sizeEl = document.getElementById('booking-size');
    const dateEl = document.getElementById('booking-date');
    const slotEl = document.getElementById('booking-time-slot');
    
    const confirmOverlay = document.getElementById('confirm-overlay');
    const confirmSubmitBtn = document.getElementById('confirm-submit-btn');
    const confirmEditBtn = document.getElementById('confirm-edit-btn');
    
    // Set date input minimum value to tomorrow
    if (dateEl) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];
      dateEl.setAttribute('min', tomorrowStr);
    }
    
    // File upload logic
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('booking-file');
    const filePreview = document.getElementById('upload-preview');
    
    if (dropZone && fileInput && filePreview) {
      dropZone.addEventListener('click', () => fileInput.click());
      
      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
      });
      
      ['dragleave', 'dragend'].forEach(type => {
        dropZone.addEventListener(type, () => dropZone.classList.remove('dragover'));
      });
      
      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
          fileInput.files = e.dataTransfer.files;
          updateFilePreview(e.dataTransfer.files[0]);
        }
      });
      
      fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
          updateFilePreview(fileInput.files[0]);
        }
      });
      
      const updateFilePreview = (file) => {
        filePreview.textContent = `Attached: ${file.name} (${Math.round(file.size / 1024)} KB)`;
        filePreview.style.display = 'block';
      };
    }
    
    // Recalculate Booking Cost summary
    const updateBookingCosts = () => {
      const summaryBox = document.getElementById('booking-summary-box');
      const basePriceEl = document.getElementById('booking-base-price');
      const totalPriceEl = document.getElementById('booking-total-price');
      
      if (!rugTypeEl || !serviceEl || !summaryBox || !basePriceEl || !totalPriceEl) return;
      
      if (rugTypeEl.value === "" || serviceEl.value === "") {
        summaryBox.style.display = 'none';
        return;
      }
      
      summaryBox.style.display = 'block';
      
      // Try to parse dimensions
      let sqft = 80;
      if (sizeEl && sizeEl.value) {
        const parts = sizeEl.value.match(/(\d+)\s*[xX*]\s*(\d+)/);
        if (parts && parts.length >= 3) {
          sqft = parseInt(parts[1], 10) * parseInt(parts[2], 10);
        }
      }
      
      let baseRate = 4.00;
      switch (rugTypeEl.value) {
        case 'wool': baseRate = 4.00; break;
        case 'persian': baseRate = 6.00; break;
        case 'silk': baseRate = 10.00; break;
        case 'kilim': baseRate = 3.50; break;
        case 'antique': baseRate = 8.00; break;
        case 'synthetic': baseRate = 3.00; break;
        case 'cotton': baseRate = 3.50; break;
      }
      
      let serviceRate = 0.00;
      switch (serviceEl.value) {
        case 'bronze': serviceRate = 0.00; break;
        case 'silver': serviceRate = 2.00; break;
        case 'gold': serviceRate = 5.00; break;
      }
      
      const basePrice = sqft * (baseRate + serviceRate);
      const total = basePrice;
      
      basePriceEl.textContent = `$${basePrice.toFixed(2)}`;
      totalPriceEl.textContent = `$${total.toFixed(2)}`;
    };

    // Attach local calculators
    [rugTypeEl, serviceEl, sizeEl].forEach(el => {
      el.addEventListener('change', updateBookingCosts);
      el.addEventListener('input', updateBookingCosts);
    });

    // Validation Helpers
    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    
    const validatePhone = (phone) => {
      return /^[\+]?[(]?[0-9]{3}[)]?[-s\.]?[0-9]{3}[-s\.]?[0-9]{4,6}$/.test(phone.replace(/\s+/g, ''));
    };

    const validateZip = (zip) => {
      return /^\d{5}$/.test(zip.trim());
    };
    
    const setFieldError = (inputEl, errorElId, isValid, message) => {
      if (!inputEl) return;
      const parent = inputEl.closest('.form-group');
      const errorEl = document.getElementById(errorElId);
      
      if (isValid) {
        if (parent) parent.classList.remove('invalid');
        inputEl.classList.remove('invalid');
        if (errorEl) errorEl.style.display = 'none';
      } else {
        if (parent) parent.classList.add('invalid');
        inputEl.classList.add('invalid');
        if (errorEl) {
          errorEl.textContent = message;
          errorEl.style.display = 'block';
        }
      }
    };

    // Focus/Blur real-time checks
    if (nameEl) nameEl.addEventListener('blur', () => setFieldError(nameEl, 'name-error', nameEl.value.trim().length >= 2, 'Name must be at least 2 characters.'));
    if (emailEl) emailEl.addEventListener('blur', () => setFieldError(emailEl, 'email-error', validateEmail(emailEl.value.trim()), 'Please enter a valid email address.'));
    if (phoneEl) phoneEl.addEventListener('blur', () => setFieldError(phoneEl, 'phone-error', validatePhone(phoneEl.value.trim()), 'Please enter a valid phone number.'));
    if (streetEl) streetEl.addEventListener('blur', () => setFieldError(streetEl, 'street-error', streetEl.value.trim().length > 0, 'Please enter your collection street address.'));
    if (cityEl) cityEl.addEventListener('blur', () => setFieldError(cityEl, 'city-error', cityEl.value.trim().length > 0, 'Please enter your city.'));
    if (zipEl) zipEl.addEventListener('blur', () => setFieldError(zipEl, 'zip-error', validateZip(zipEl.value), 'Please enter a valid 5-digit ZIP code.'));

    if (rugTypeEl) rugTypeEl.addEventListener('change', () => setFieldError(rugTypeEl, 'type-error', rugTypeEl.value !== "", 'Please select a rug type.'));
    if (serviceEl) serviceEl.addEventListener('change', () => setFieldError(serviceEl, 'service-error', serviceEl.value !== "", 'Please select a service.'));
    if (dateEl) dateEl.addEventListener('change', () => setFieldError(dateEl, 'date-error', dateEl.value !== "", 'Please pick a future pickup date.'));
    if (slotEl) slotEl.addEventListener('change', () => setFieldError(slotEl, 'time-slot-error', slotEl.value !== "", 'Please select a preferred time slot.'));

    // Handle Form Submit Event
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const isNameValid = nameEl ? nameEl.value.trim().length >= 2 : true;
      setFieldError(nameEl, 'name-error', isNameValid, 'Name must be at least 2 characters.');
      
      const isEmailValid = emailEl ? validateEmail(emailEl.value.trim()) : true;
      setFieldError(emailEl, 'email-error', isEmailValid, 'Please enter a valid email address.');
      
      const isPhoneValid = phoneEl ? validatePhone(phoneEl.value.trim()) : true;
      setFieldError(phoneEl, 'phone-error', isPhoneValid, 'Please enter a valid phone number.');

      const isStreetValid = streetEl ? streetEl.value.trim().length > 0 : true;
      setFieldError(streetEl, 'street-error', isStreetValid, 'Please enter your collection street address.');

      const isCityValid = cityEl ? cityEl.value.trim().length > 0 : true;
      setFieldError(cityEl, 'city-error', isCityValid, 'Please enter your city.');

      const isZipValid = zipEl ? validateZip(zipEl.value) : true;
      setFieldError(zipEl, 'zip-error', isZipValid, 'Please enter a valid 5-digit ZIP code.');
      
      const isTypeValid = rugTypeEl ? rugTypeEl.value !== "" : true;
      setFieldError(rugTypeEl, 'type-error', isTypeValid, 'Please select a rug type.');
      
      const isServiceValid = serviceEl ? serviceEl.value !== "" : true;
      setFieldError(serviceEl, 'service-error', isServiceValid, 'Please select a service.');
      
      const isDateValid = dateEl ? dateEl.value !== "" : true;
      setFieldError(dateEl, 'date-error', isDateValid, 'Please pick a future pickup date.');

      const isSlotValid = slotEl ? slotEl.value !== "" : true;
      setFieldError(slotEl, 'time-slot-error', isSlotValid, 'Please select a preferred time slot.');
      
      const isFormValid = isNameValid && isEmailValid && isPhoneValid && isStreetValid && isCityValid && isZipValid && isTypeValid && isServiceValid && isDateValid && isSlotValid;
      
      if (isFormValid && confirmOverlay) {
        // Populating confirmation modal
        document.getElementById('confirm-name').textContent = nameEl.value;
        document.getElementById('confirm-contact').textContent = `${emailEl.value} | ${phoneEl.value}`;
        document.getElementById('confirm-address').textContent = `${streetEl.value}${document.getElementById('booking-suite').value ? ', ' + document.getElementById('booking-suite').value : ''}, ${cityEl.value}, ZIP ${zipEl.value}`;
        
        // Text values
        const selectedType = rugTypeEl.options[rugTypeEl.selectedIndex].text;
        const selectedService = serviceEl.options[serviceEl.selectedIndex].text;
        document.getElementById('confirm-rug-details').textContent = `${selectedType} (${selectedService})`;
        
        const selectedTimeSlot = slotEl.options[slotEl.selectedIndex].text;
        document.getElementById('confirm-schedule').textContent = `${dateEl.value} [${selectedTimeSlot}]`;
        
        // Dynamic price in modal if shown
        const summaryBox = document.getElementById('booking-summary-box');
        const priceRow = document.getElementById('confirm-price-row');
        if (summaryBox && summaryBox.style.display !== 'none') {
          priceRow.style.display = 'flex';
          document.getElementById('confirm-price').textContent = document.getElementById('booking-total-price').textContent;
        } else {
          priceRow.style.display = 'none';
        }
        
        // Show modal overlay
        confirmOverlay.classList.add('active');
      }
    });

    // Confirmation Buttons
    if (confirmEditBtn) {
      confirmEditBtn.addEventListener('click', () => {
        confirmOverlay.classList.remove('active');
      });
    }

    if (confirmSubmitBtn) {
      confirmSubmitBtn.addEventListener('click', () => {
        confirmOverlay.classList.remove('active');
        
        // Set loading triggers on form submit trigger button
        if (submitBtn) {
          submitBtn.classList.add('submitting');
          submitBtn.disabled = true;
        }
        
        setTimeout(() => {
          if (submitBtn) submitBtn.classList.remove('submitting');
          
          // Fade form, show draw checkmark success card
          if (formWrapper && successWrapper) {
            formWrapper.style.opacity = '0';
            setTimeout(() => {
              formWrapper.style.display = 'none';
              successWrapper.style.display = 'block';
              successWrapper.style.opacity = '0';
              setTimeout(() => {
                successWrapper.style.opacity = '1';
                // Trigger dynamic confetti particles
                triggerConfetti();
              }, 50);
            }, 300);
          }
          
          // Populate success labels
          const generatedCode = `LUX-${Math.floor(1000 + Math.random() * 9000)}-WASH`;
          
          document.getElementById('success-client-name').textContent = nameEl.value;
          document.getElementById('success-pickup-time').textContent = `${dateEl.value} (${slotEl.options[slotEl.selectedIndex].text})`;
          document.getElementById('success-client-address').textContent = `${streetEl.value}, ${cityEl.value}`;
          document.getElementById('success-tracking-id').textContent = generatedCode;
          
          // Save generated code in in-memory tracking DB
          generatedCodeDetails = {
            code: generatedCode,
            details: {
              progress: 16.7,
              status: "Collection Scheduled & Team Assigned",
              location: "Logistics Hub, Beverly Hills Workshop",
              milestone: "Digital Concierge Intake Logged",
              delivery: "Calculated upon Collection",
              activeNode: "node-pickup",
              completedNodes: []
            }
          };
          
          bookingForm.reset();
          if (filePreview) filePreview.style.display = 'none';
          document.getElementById('booking-summary-box').style.display = 'none';
        }, 1500);
      });
    }

    // Dynamic pre-fill check from calculator
    const prefillBooking = () => {
      const rawPayload = sessionStorage.getItem('luxeEstimate');
      if (!rawPayload) return;
      
      try {
        const est = JSON.parse(rawPayload);
        
        if (sizeEl) sizeEl.value = `${est.width}x${est.height} ft`;
        if (rugTypeEl && est.material) rugTypeEl.value = est.material;
        if (serviceEl && est.service) serviceEl.value = est.service;
        
        // Write note
        const notesEl = document.getElementById('booking-notes');
        if (notesEl) {
          let str = `Pre-filled Estimate Details:\n- Estimated Price: ${est.price}\n- Dimensions: ${est.width} ft x ${est.height} ft`;
          if (est.stains && est.stains !== 'none') str += `\n- Stain Severity: ${est.stains}`;
          if (est.restoration && est.restoration !== 'none') str += `\n- Restoration Requested: ${est.restoration}`;
          notesEl.value = str;
        }
        
        // Calculate costs right away
        updateBookingCosts();
        
        // Remove item so it doesn't prefill on fresh reload
        sessionStorage.removeItem('luxeEstimate');
      } catch (err) {
        console.error("Error pre-filling booking fields:", err);
      }
    };
    
    // Run pre-fill checks
    prefillBooking();

    // Success Screen Track Button trigger
    const successTrackBtn = document.getElementById('success-track-btn');
    if (successTrackBtn) {
      successTrackBtn.addEventListener('click', () => {
        const trackingCode = document.getElementById('success-tracking-id').textContent;
        const trackingInput = document.getElementById('tracking-code-input');
        const trackingTerminal = document.querySelector('.tracking-terminal');
        
        if (trackingInput && trackingCode) {
          trackingInput.value = trackingCode;
          // Trigger timeline search
          locateRugJourney(trackingCode);
          
          if (trackingTerminal) {
            trackingTerminal.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    }
  }

  // Pure JavaScript custom particle shower
  const triggerConfetti = () => {
    const wrap = document.getElementById('booking-success-wrapper');
    if (!wrap) return;
    
    const colors = ['#C5A030', '#E2C755', '#0F2240', '#2563EB', '#F8FAFC'];
    
    for (let i = 0; i < 50; i++) {
      const p = document.createElement('div');
      p.style.position = 'absolute';
      p.style.width = `${Math.random() * 8 + 5}px`;
      p.style.height = `${Math.random() * 12 + 6}px`;
      p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      p.style.top = `30%`;
      p.style.left = `${Math.random() * 80 + 10}%`;
      p.style.pointerEvents = 'none';
      p.style.zIndex = '999';
      p.style.borderRadius = '2px';
      p.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      wrap.appendChild(p);
      
      const duration = Math.random() * 1800 + 1200; // ms
      const startTime = performance.now();
      const startX = parseFloat(p.style.left);
      const startY = 30;
      
      const animateDown = (time) => {
        const elapsed = time - startTime;
        const progress = elapsed / duration;
        
        if (progress < 1) {
          p.style.top = `${startY + progress * 60}%`;
          p.style.left = `${startX + Math.sin(progress * 8) * 6}%`;
          p.style.opacity = `${1 - progress}`;
          p.style.transform = `rotate(${progress * 720}deg)`;
          requestAnimationFrame(animateDown);
        } else {
          p.remove();
        }
      };
      
      requestAnimationFrame(animateDown);
    }
  };


  /* ==========================================================================
     9. Rug Journey Tracking Terminal Engine (Booking Page)
     ========================================================================== */
  const trackingDatabase = {
    'LUX-2026-WASH': {
      progress: 50,
      status: "Deep Wash & Conditioning Phase",
      location: "Artisan Wash Hall C, Beverly Hills Workshop",
      milestone: "Atmospheric Dry Dusting & Inspection complete",
      delivery: "May 28, 2026 (12:00 PM - 2:00 PM)",
      activeNode: "node-wash",
      completedNodes: ["node-pickup", "node-inspection"]
    },
    'LUX-777-GOLD': {
      progress: 83,
      status: "Conditioning & Natural Drying Phase",
      location: "Lanolin Restoration Room, Beverly Hills Workshop",
      milestone: "Weft-Thread Re-weaving & Edge Securing complete",
      delivery: "May 25, 2026 (10:00 AM - 12:00 PM)",
      activeNode: "node-drying",
      completedNodes: ["node-pickup", "node-inspection", "node-wash", "node-repair"]
    }
  };

  const locateRugJourney = (code) => {
    code = code.trim().toUpperCase();
    
    const container = document.getElementById('tracking-timeline-container');
    const errorEl = document.getElementById('tracking-error-container');
    const progressBar = document.getElementById('timeline-progress-line');
    
    if (!container || !errorEl || !progressBar) return;
    
    // Query registry
    let data = trackingDatabase[code];
    
    // Check if it's the custom user-generated booking in this session
    if (!data && generatedCodeDetails && code === generatedCodeDetails.code) {
      data = generatedCodeDetails.details;
    }
    
    if (data) {
      errorEl.style.display = 'none';
      container.style.display = 'block';
      
      setTimeout(() => {
        container.style.opacity = '1';
      }, 50);
      
      // Inject details
      document.getElementById('track-status-text').textContent = data.status;
      document.getElementById('track-location-text').textContent = data.location;
      document.getElementById('track-milestone-text').textContent = data.milestone;
      document.getElementById('track-delivery-text').textContent = data.delivery;
      
      // Fill timeline progress line
      progressBar.style.width = `${data.progress}%`;
      
      // Reset all nodes
      const allNodes = document.querySelectorAll('.timeline-node');
      allNodes.forEach(node => {
        node.classList.remove('active', 'completed');
      });
      
      // Light up completed nodes
      data.completedNodes.forEach(id => {
        const nodeEl = document.getElementById(id);
        if (nodeEl) nodeEl.classList.add('completed');
      });
      
      // Light up active glowing node
      const activeNodeEl = document.getElementById(data.activeNode);
      if (activeNodeEl) activeNodeEl.classList.add('active');
      
    } else {
      // Show error, hide results
      container.style.display = 'none';
      container.style.opacity = '0';
      errorEl.style.display = 'block';
    }
  };

  // Bind tracking buttons and inputs
  const trackingBtn = document.getElementById('tracking-btn');
  const trackingInput = document.getElementById('tracking-code-input');
  
  if (trackingBtn && trackingInput) {
    trackingBtn.addEventListener('click', () => {
      locateRugJourney(trackingInput.value);
    });
    
    trackingInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        locateRugJourney(trackingInput.value);
      }
    });
  }

  // Bind click events to demo codes
  const washDemo = document.getElementById('demo-code-wash');
  const goldDemo = document.getElementById('demo-code-gold');
  
  if (washDemo && goldDemo && trackingInput) {
    washDemo.addEventListener('click', () => {
      trackingInput.value = 'LUX-2026-WASH';
      locateRugJourney('LUX-2026-WASH');
    });
    
    goldDemo.addEventListener('click', () => {
      trackingInput.value = 'LUX-777-GOLD';
      locateRugJourney('LUX-777-GOLD');
    });
  }


  /* ==========================================================================
     10. Simple Contact Page Inquiry Form
     ========================================================================== */
  const contactForm = document.getElementById('inquiry-contact-form');
  if (contactForm) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const successAlert = document.getElementById('contact-success-alert');
    
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const msg = document.getElementById('contact-message').value.trim();
      
      if (name.length > 0 && email.length > 0 && msg.length > 0) {
        submitBtn.classList.add('submitting');
        submitBtn.disabled = true;
        
        setTimeout(() => {
          submitBtn.classList.remove('submitting');
          if (successAlert) successAlert.style.display = 'flex';
          contactForm.reset();
          
          setTimeout(() => {
            if (successAlert) successAlert.style.display = 'none';
            submitBtn.disabled = false;
          }, 6000);
        }, 1200);
      }
    });
  }
  
});
