document.addEventListener('DOMContentLoaded', function() {
  // Theme Management
  const colorPicker = document.getElementById('colorPicker');
  const root = document.documentElement;
  
  // Load saved theme color
  const savedColor = localStorage.getItem('themeColor');
  if (savedColor) {
    updateThemeColor(savedColor);
    colorPicker.value = savedColor;
  }

  // Update theme color
  colorPicker.addEventListener('change', function() {
    const color = colorPicker.value;
    updateThemeColor(color);
    localStorage.setItem('themeColor', color);
  });

  function updateThemeColor(color) {
    root.style.setProperty('--primary-color', color);
    document.querySelectorAll('.cta-button, .submit-btn').forEach(button => {
      button.style.backgroundColor = color;
    });
    document.querySelectorAll('.card i').forEach(icon => {
      icon.style.color = color;
    });
  }

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Animation Box Interactions
  const box1 = document.getElementById('box1');
  const box2 = document.getElementById('box2');
  const box3 = document.getElementById('box3');

  // Box 1 - Hover Animation
  box1.addEventListener('mouseenter', function() {
    this.style.transform = 'rotate(360deg)';
    this.style.backgroundColor = '#00ff00';
  });

  box1.addEventListener('mouseleave', function() {
    this.style.transform = 'rotate(0deg)';
    this.style.backgroundColor = '#ff0000';
  });

  // Box 2 - Click Animation
  box2.addEventListener('click', function() {
    this.style.transform = 'scale(0.8)';
    this.style.backgroundColor = '#0000ff';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
      this.style.backgroundColor = '#ff0000';
    }, 500);
  });

  // Box 3 - Drag and Drop
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  box3.addEventListener('mousedown', dragStart);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', dragEnd);

  function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;

    if (e.target === box3) {
      isDragging = true;
    }
  }

  function drag(e) {
    if (isDragging) {
      e.preventDefault();
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      xOffset = currentX;
      yOffset = currentY;

      setTranslate(currentX, currentY, box3);
    }
  }

  function dragEnd() {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
  }

  function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  }

  // Form Handling
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
    };

    // Save form data to localStorage
    localStorage.setItem('contactFormData', JSON.stringify(formData));
    
    // Show success message
    alert('Message sent successfully!');
    contactForm.reset();
  });

  // Load saved form data if exists
  const savedFormData = localStorage.getItem('contactFormData');
  if (savedFormData) {
    const formData = JSON.parse(savedFormData);
    document.getElementById('name').value = formData.name;
    document.getElementById('email').value = formData.email;
    document.getElementById('message').value = formData.message;
  }

  // CTA Button Animation
  const ctaButton = document.getElementById('animateButton');
  ctaButton.addEventListener('click', function() {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 100);
  });

  // Scroll Animation
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card, .animation-box').forEach(element => {
    observer.observe(element);
  });
}); 