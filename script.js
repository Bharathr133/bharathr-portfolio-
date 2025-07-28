document.addEventListener('DOMContentLoaded', function() {
  // Initialize EmailJS
  emailjs.init("VdMoWyii0_W4uT7mJ");

  // Mobile Menu Toggle
  const menuBtn = document.getElementById('menu-btn');
  const nav = document.getElementById('nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
      menuBtn.innerHTML = nav.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('#nav a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
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
      "Computer Science Engineer",
      "Full Stack Developer",
      "Machine Learning Enthusiast",
      "Tech Explorer",
      "Problem Solver"
    ];

    let i = 0;
    function rotateText() {
      typewriter.textContent = phrases[i];
      i = (i + 1) % phrases.length;
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

  // Animate Skill Bars on Scroll
  const skillBars = document.querySelectorAll('.skill-progress');
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
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillBars();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    observer.observe(skillsSection);
  }

  // Scroll Animation with GSAP
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.section-title, .about-img, .about-text, .skill-category, .project-card, .timeline-item, .contact-info, .contact-form, .certifications').forEach(element => {
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

  // Certificates slider and lightbox functionality
  const slider = document.querySelector('.cert-slider');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const lightbox = document.querySelector('.cert-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.close-lightbox');
  const viewButtons = document.querySelectorAll('.view-btn');

  if (slider && prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => {
      slider.scrollBy({ left: 350, behavior: 'smooth' });
    });
    prevBtn.addEventListener('click', () => {
      slider.scrollBy({ left: -350, behavior: 'smooth' });
    });
  }

  if (lightbox && lightboxImg && closeBtn) {
    viewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const certPath = 'certificates/' + btn.getAttribute('data-cert');
        lightboxImg.src = certPath;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });

    closeBtn.addEventListener('click', () => {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Auto-scroll certificates with pause on hover
  if (slider) {
    let scrollInterval;
    let isHovering = false;
    const scrollSpeed = 3000; // 3 seconds between slides
    
    slider.addEventListener('mouseenter', () => {
      isHovering = true;
      clearInterval(scrollInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
      isHovering = false;
      startAutoScroll();
    });

    function startAutoScroll() {
      if (!isHovering) {
        scrollInterval = setInterval(() => {
          if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 50) {
            slider.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            slider.scrollBy({ left: 350, behavior: 'smooth' });
          }
        }, scrollSpeed);
      }
    }

    function isElementVisible(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom > 0
      );
    }

    if (isElementVisible(slider)) startAutoScroll();
    
    window.addEventListener('scroll', () => {
      if (isElementVisible(slider)) {
        if (!scrollInterval) startAutoScroll();
      } else {
        clearInterval(scrollInterval);
        scrollInterval = null;
      }
    });
  }
});