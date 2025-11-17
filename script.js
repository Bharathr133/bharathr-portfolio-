document.addEventListener('DOMContentLoaded', function() {
  // Initialize EmailJS
  emailjs.init("VdMoWyii0_W4uT7mJ");

  // Loading Screen
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }, 2000);
  }

  // Image Flip Animation
  const flipContainer = document.getElementById('flip-container');
  if (flipContainer) {
    flipContainer.addEventListener('click', function() {
      this.classList.toggle('flipped');
    });
  }

  // Enhanced Inactivity Toast (5 seconds)
  const inactivityToast = document.getElementById('inactivity-toast');
  let inactivityTimer;
  let toastShown = false;
  let autoSlideTimer;

  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(showInactivityToast, 5000); // 5 seconds
  }

  function showInactivityToast() {
    if (!toastShown && document.visibilityState === 'visible') {
      inactivityToast.classList.remove('toast-hidden');
      inactivityToast.classList.add('toast-visible');
      toastShown = true;
      
      // Start auto-slide for certificates if user is inactive
      startAutoSlide();
    }
  }

  function hideInactivityToast() {
    if (toastShown) {
      inactivityToast.classList.remove('toast-visible');
      inactivityToast.classList.add('toast-hidden');
      toastShown = false;
    }
    resetInactivityTimer();
    stopAutoSlide();
  }

  // Events that reset the timer
  const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
  events.forEach(event => {
    document.addEventListener(event, hideInactivityToast, true);
  });

  // Handle page visibility
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
      resetInactivityTimer();
    } else {
      clearTimeout(inactivityTimer);
      hideInactivityToast();
    }
  });

  resetInactivityTimer();

  // Enhanced Mobile Menu Toggle - Professional Right Side
  const menuBtn = document.getElementById('menu-btn');
  const nav = document.getElementById('nav');
  const hamburger = document.querySelector('.hamburger');

  // Create menu overlay
  const menuOverlay = document.createElement('div');
  menuOverlay.className = 'menu-overlay';
  document.body.appendChild(menuOverlay);

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = nav.classList.toggle('active');
      menuBtn.classList.toggle('active');
      menuOverlay.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (isActive) {
        document.body.style.overflow = 'hidden';
        document.body.classList.add('menu-open');
      } else {
        document.body.style.overflow = '';
        document.body.classList.remove('menu-open');
      }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('#nav a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuBtn.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        document.body.classList.remove('menu-open');
      });
    });

    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', () => {
      nav.classList.remove('active');
      menuBtn.classList.remove('active');
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('active')) {
        nav.classList.remove('active');
        menuBtn.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        document.body.classList.remove('menu-open');
      }
    });
  }

  // Header scroll effect
  window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }
  });

  // Typewriter Effect
  const typewriter = document.getElementById('typewriter');
  if (typewriter) {
    const phrases = [
      "Java Developer",
      "Full Stack Developer",
      "Machine Learning Enthusiast",
      "Tech Explorer",
      "Problem Solver"
    ];

    let i = 0;
    function rotateText() {
      typewriter.textContent = phrases[i];
      typewriter.style.opacity = '0';
      setTimeout(() => {
        typewriter.textContent = phrases[i];
        typewriter.style.opacity = '1';
        i = (i + 1) % phrases.length;
      }, 500);
    }
    setInterval(rotateText, 2000);
    rotateText();
  }

  // Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      backToTopBtn.classList.toggle('active', window.scrollY > 300);
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Animate Skill Bars on Scroll - For About Section
  const aboutSkillBars = document.querySelectorAll('.about .skill-progress');
  const aboutSection = document.getElementById('about');

  function animateAboutSkillBars() {
    aboutSkillBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width + '%';
      }, 100);
    });
  }

  if (aboutSection && aboutSkillBars.length > 0) {
    const aboutObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateAboutSkillBars();
          aboutObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    aboutObserver.observe(aboutSection);
  }

  // Animate Skill Bars on Scroll - For Skills Section
  const skillBars = document.querySelectorAll('.skills .skill-progress');
  const skillsSection = document.getElementById('skills');

  function animateSkillBars() {
    skillBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width + '%';
      }, 100);
    });
  }

  if (skillsSection && skillBars.length > 0) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillBars();
          skillsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    skillsObserver.observe(skillsSection);
  }

  // Scroll Animation with GSAP
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.section-title, .about-img, .about-text, .skill-category, .project-card, .timeline-item, .contact-info, .contact-form, .certifications, .internship-card').forEach(element => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
      });
    });
  }

  // Hover effects to floating elements
  document.querySelectorAll('.floating-card, .float-btn, .float').forEach(element => {
    element.addEventListener('mouseenter', () => {
      element.style.animationPlayState = 'paused';
    });
    element.addEventListener('mouseleave', () => {
      element.style.animationPlayState = 'running';
    });
  });

  // Motion text effect
  const motionText = document.querySelector('.motion-text');
  if (motionText) {
    setInterval(() => {
      motionText.style.transform = motionText.style.transform === 'translateY(-5px)' ? 
        'translateY(0)' : 'translateY(-5px)';
    }, 1000);
  }

  // Footer current year
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Enhanced Certificate Lightbox - Professional Center View
  const lightbox = document.getElementById('cert-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.close-lightbox');
  const viewButtons = document.querySelectorAll('.view-btn');

  if (lightbox && lightboxImg && closeBtn) {
    viewButtons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const certPath = 'certificates/' + this.getAttribute('data-cert');
        
        // Show loading state
        lightboxImg.style.opacity = '0';
        lightboxImg.src = certPath;
        
        // Open lightbox
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        document.body.classList.add('lightbox-open');
        
        // Wait for image to load
        lightboxImg.onload = function() {
          lightboxImg.style.opacity = '1';
        };
      });
    });

    // Close lightbox function
    function closeLightbox() {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
      document.body.classList.remove('lightbox-open');
      lightboxImg.src = '';
      lightboxImg.style.opacity = '1';
    }

    closeBtn.addEventListener('click', closeLightbox);

    // Close when clicking outside the content (on overlay)
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightbox.style.display === 'flex') {
        closeLightbox();
      }
    });

    // Prevent scroll on lightbox content
    lightbox.addEventListener('wheel', function(e) {
      e.stopPropagation();
    });

    // Handle window resize
    window.addEventListener('resize', function() {
      if (lightbox.style.display === 'flex') {
        // Keep lightbox centered on resize
        lightbox.scrollTop = 0;
      }
    });
  }

  // Certificate Slider Auto Slide
  const certSlider = document.querySelector('.cert-slider');
  const certSlides = document.querySelectorAll('.cert-slide');
  const sliderPrev = document.querySelector('.slider-prev');
  const sliderNext = document.querySelector('.slider-next');
  let currentSlide = 0;

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(() => {
      nextSlide();
    }, 3000);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % certSlides.length;
    updateSlider();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + certSlides.length) % certSlides.length;
    updateSlider();
  }

  function updateSlider() {
    if (certSlider) {
      const slideWidth = certSlides[0].offsetWidth + 24; // 24px gap
      certSlider.scrollTo({
        left: currentSlide * slideWidth,
        behavior: 'smooth'
      });
    }
  }

  // Add event listeners for slider controls
  if (sliderNext) {
    sliderNext.addEventListener('click', () => {
      nextSlide();
      hideInactivityToast(); // Reset inactivity timer
    });
  }

  if (sliderPrev) {
    sliderPrev.addEventListener('click', () => {
      prevSlide();
      hideInactivityToast(); // Reset inactivity timer
    });
  }

  // Basic Code Protection
  // Disable right-click
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
  });

  // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
  document.addEventListener('keydown', function(e) {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && e.key === 'I') ||
      (e.ctrlKey && e.shiftKey && e.key === 'J') ||
      (e.ctrlKey && e.key === 'u')
    ) {
      e.preventDefault();
      return false;
    }
  });

  // Prevent image dragging
  document.querySelectorAll('img').forEach(img => {
    img.setAttribute('draggable', 'false');
  });

  // Clear console on open (basic protection)
  if (typeof console !== "undefined") {
    console.log('%c🔒 Protected Content', 'color: #6366f1; font-size: 16px; font-weight: bold;');
    console.log('%cThis portfolio is protected. Please respect the intellectual property.', 'color: #94a3b8;');
  }

  // Enhanced Contact Form Validation
  const contactForm = document.getElementById('contactForm');
  const downloadBtn = document.getElementById('download-resume-btn');
  let formSubmissionInProgress = false;
  const offensiveWords = ['loude', 'chut','fuck','chutt','ddhdhdghs','louda','lorem','ipsum','example', 'test', 'dummy', 'placeholder','assshdhs','fucking','fuck you','name','youname','Bharath R']; 

  function showCustomAlert(message, redirectAfter = false) {
    const alert = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('custom-alert-message');
    const okButton = document.getElementById('custom-alert-ok');
    
    if (!alert || !alertMessage || !okButton) return;
    
    alertMessage.textContent = message;
    alert.style.display = 'flex';
    
    okButton.onclick = function() {
      alert.style.display = 'none';
      if (redirectAfter) {
        window.location.href = '/';
      }
    };
  }

  function downloadResume() {
    try {
      // Check if already downloaded
      if (localStorage.getItem('resumeDownloaded') === 'true') {
        showCustomAlert('You have already downloaded my resume. Thank you for your interest!');
        return false;
      }
      
      const link = document.createElement('a');
      link.href = 'resume.pdf';
      link.download = 'Bharath_R_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Mark as downloaded
      localStorage.setItem('resumeDownloaded', 'true');
      return true;
    } catch (error) {
      console.error('Download failed:', error);
      showCustomAlert('Download error. Please try again later.');
      return false;
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone) {
    return !phone || /^[\d\s\-+]{10,15}$/.test(phone);
  }

  function containsGibberish(text) {
    return /([bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]{4,})/.test(text);
  }

  function containsOffensive(text, words) {
    const lowerText = text.toLowerCase();
    return words.some(word => lowerText.includes(word.toLowerCase()));
  }

  function showError(id, message) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = message;
      const input = document.getElementById(id.replace('-error', ''));
      if (input) input.classList.add('invalid');
    }
  }

  function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
      el.textContent = '';
    });
    document.querySelectorAll('.form-control').forEach(el => {
      el.classList.remove('invalid');
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      if (formSubmissionInProgress) return;
      
      clearErrors();
      formSubmissionInProgress = true;

      const submitBtn = this.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      const formData = new FormData(this);

      // Validate inputs
      const name = formData.get('from_name').trim();
      const email = formData.get('from_email').trim();
      const phone = formData.get('phone').trim();
      const message = formData.get('message').trim();
      const honeypot = formData.get('website');

      let isValid = true;

      // Honeypot check
      if (honeypot) {
        console.log('Bot detected');
        isValid = false;
      }

      // Name validation
      if (name.length < 5 || /[^a-zA-Z \-']/.test(name)) {
        showError('name-error', 'Please enter a valid name (5+ letters)');
        isValid = false;
      }

      // Email validation
      if (!validateEmail(email)) {
        showError('email-error', 'Please enter a valid email');
        isValid = false;
      }

      // Phone validation
      if (!validatePhone(phone)) {
        showError('phone-error', 'Please enter 10-15 digit phone number');
        isValid = false;
      }

      // Message validation
      if (message.length < 20) {
        showError('message-error', 'Message must be 20+ characters');
        isValid = false;
      } else if (containsGibberish(message)) {
        showError('message-error', 'Please write a meaningful message');
        isValid = false;
      } else if (containsOffensive(message, offensiveWords)) {
        showError('message-error', 'Please remove inappropriate language');
        isValid = false;
      }

      if (!isValid) {
        formSubmissionInProgress = false;
        return;
      }

      try {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Send email with professional template
        await emailjs.send("service_kuyco8a", "template_gdh7qcu", {
          from_name: name,
          from_email: email,
          phone: phone,
          message: message,
          reply_to: email
        });
        
        this.reset();
        
        // CASE 1: User came from Download CV click
        if (localStorage.getItem('downloadRequested') === 'true') {
          localStorage.setItem('allowDownload', 'true');
          showCustomAlert('Thank you! You may now download my resume by clicking the Download CV button.');
          document.getElementById('download-resume-btn').scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
          });
        }
        // CASE 2: Direct contact form submission
        else {
          showCustomAlert('Thanks for contacting me! I will get back to you ASAP!', true);
        }

      } catch (error) {
        console.error('Error:', error);
        showCustomAlert('Message failed to send. Please try again later.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        formSubmissionInProgress = false;
      }
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Already downloaded
      if (localStorage.getItem('resumeDownloaded') === 'true') {
        showCustomAlert('You have already downloaded my resume. Thank you for your interest!');
        return;
      }
      
      // Download allowed after form submission
      if (localStorage.getItem('allowDownload') === 'true') {
        if (downloadResume()) {
          showCustomAlert('Resume downloaded successfully!');
          localStorage.removeItem('allowDownload');
          localStorage.removeItem('downloadRequested');
          window.location.href = '/'; // Redirect to home after download
        }
        return;
      }
      
      // First time click - request contact info
      localStorage.setItem('downloadRequested', 'true');
      showCustomAlert('To download my resume, please complete the contact form first.');
      document.getElementById('contact').scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    });
  }
});
// Quick Contact Button Animation
const quickButtons = document.querySelectorAll('.quick-btn');
quickButtons.forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    this.style.animationPlayState = 'paused';
  });
  
  btn.addEventListener('mouseleave', function() {
    this.style.animationPlayState = 'running';
  });
});

// Stats Counter Animation
const statsSection = document.querySelector('.stats');
const statNumbers = document.querySelectorAll('.stat-card h3');

function animateStats() {
  statNumbers.forEach(stat => {
    const target = parseInt(stat.textContent);
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent = target + '+';
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(current) + '+';
      }
    }, 30);
  });
}

// Intersection Observer for Stats
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  statsObserver.observe(statsSection);
}