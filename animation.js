// Typing Effect
var textElement = document.querySelector('.typing-text');
var texts = [
  "Front End Web Developer",
  "React Specialist",
  "JavaScript Developer",
  "UI/UX Enthusiast"
];
var textIndex = 0;
var charIndex = 0;
var isDeleting = false;
var typingSpeed = window.innerWidth < 480 ? 150 : 100;

function type() {
  var currentText = texts[textIndex];
  
  if (isDeleting) {
    textElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    textElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }
  
  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typingSpeed = 1500;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typingSpeed = 500;
  }
  
  setTimeout(type, typingSpeed);
}

// Highlight active navigation section
function highlightActiveSection() {
  var navLinks = document.querySelectorAll('nav a');
  var fromTop = window.scrollY + 200;
  var currentSection = '';
  
  // Find current section
  document.querySelectorAll('section').forEach(function(section) {
    if (section.offsetTop <= fromTop) {
      currentSection = section.id;
    }
  });
  
  // Update active link
  navLinks.forEach(function(link) {
    link.classList.toggle('active', link.hash === '#' + currentSection);
  });
}

// Scroll animation with IntersectionObserver
function setupScrollAnimations() {
  var threshold = window.innerWidth < 480 ? 0.1 : 0.25;
  
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, index) {
      if (entry.isIntersecting) {
        setTimeout(function() {
          entry.target.classList.add('visible');
        }, window.innerWidth < 480 ? index * 50 : index * 100);
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: threshold,
    rootMargin: window.innerWidth < 480 ? '0px 0px -50px 0px' : '0px 0px -100px 0px'
  });
  
  document.querySelectorAll('section').forEach(function(section) {
    observer.observe(section);
  });
}

// Smooth scrolling
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      var target = document.querySelector(this.hash);
      if (!target) return;
      
      var offset = 90;
      var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset; 
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

// Initialize particles
function initParticles() {
  if (window.innerWidth > 480) {
    particlesJS("particles-js", {
      particles: {
        number: { 
          value: window.innerWidth < 768 ? 30 : 60,
          density: { enable: true, value_area: 800 } 
        },
        color: {
          value: "#3b82f6"
        },
        shape: {
          type: "circle"
        },
        opacity: {
          value: 1,
          random: true
        },
        size: {
          value: 3,
          random: true
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#3b82f6",
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab"
          },
          onclick: {
            enable: true,
            mode: "push"
          }
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.5
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  }
}

// Form handling with AJAX
function handleFormSubmit(event) {
  event.preventDefault();
  
  var form = event.target;
  var formData = new FormData(form);
  
  fetch('send_email.php', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(data => {
    showSuccess();
  })
  .catch(error => {
    console.error('Error:', error);
    alert('There was an error sending your message. Please try again later.');
  });
}

function showSuccess() {
  var form = document.getElementById('contactForm');
  var successMessage = document.createElement('div');
  successMessage.className = 'success-message';
  successMessage.textContent = 'Your message has been sent successfully!';
  
  form.reset();
  form.appendChild(successMessage);
  
  setTimeout(() => {
    successMessage.remove();
  }, 5000);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
  type();
  highlightActiveSection();
  setupScrollAnimations();
  setupSmoothScrolling();
  initParticles();
  
  window.addEventListener('scroll', highlightActiveSection);
  
  // Add form event listener
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
});