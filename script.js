document.addEventListener('DOMContentLoaded', function() {
  // Initialize EmailJS
  (function() {
    emailjs.init("VdMoWyii0_W4uT7mJ"); // Your EmailJS Public Key
  })();

  // Mobile Menu Toggle
  const menuBtn = document.getElementById('menu-btn');
  const nav = document.getElementById('nav');

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

  // Header scroll effect
  window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Typewriter Effect
  const phrases = [
    "Computer Science Engineer",
    "Full Stack Developer",
    "Machine Learning Enthusiast",
    "Tech Explorer",
    "Problem Solver"
  ];

  let i = 0;
  let typewriter = document.getElementById('typewriter');

  function rotateText() {
    typewriter.textContent = phrases[i];
    i = (i + 1) % phrases.length;
  }

  setInterval(rotateText, 2000);
  rotateText();

  // Contact Form Submission
  document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    emailjs.sendForm('service_kuyco8a', 'template_gdh7qcu', this)
      .then(() => {
        alert('Message sent successfully!');
        this.reset();
      }, (error) => {
        alert('Failed to send message. Please try again later.');
        console.error(error);
      });
  });

  // Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Animate Skill Bars on Scroll
  const skillBars = document.querySelectorAll('.skill-progress');

  function animateSkillBars() {
    skillBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width + '%';
      }, 100);
    });
  }

  // Scroll Animation with GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Animate elements on scroll
  gsap.utils.toArray('.section-title, .about-img, .about-text, .skill-category, .project-card, .timeline-item, .contact-info, .contact-form').forEach(element => {
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

  // Initialize skill bars animation when skills section is in view
  const skillsSection = document.getElementById('skills');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  if (skillsSection) {
    observer.observe(skillsSection);
  }

  // Add hover effects to floating elements
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
});