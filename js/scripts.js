// Client-side interactions, Apple UI controls, and luxury form handlers for Boikanya Biokinetics

document.addEventListener('DOMContentLoaded', function () {
  
  // 1. Scrolled Navbar Floating Island Animation
  const navbar = document.querySelector('.navbar-luxury');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Apple Segmented Control / Pathway Explorer Tab Switcher
  const segmentButtons = document.querySelectorAll('.segment-btn');
  segmentButtons.forEach(button => {
    button.addEventListener('click', function () {
      const targetId = this.getAttribute('data-target');
      const parentContainer = this.closest('.pathway-explorer-section') || document;
      
      // Update buttons
      parentContainer.querySelectorAll('.segment-btn').forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Update panes
      parentContainer.querySelectorAll('.pathway-pane').forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === targetId) {
          pane.classList.add('active');
        }
      });
    });
  });

  // 3. Date Minimum Setter for Appointment Forms
  const dateInputs = document.querySelectorAll('input[type="date"]');
  if (dateInputs.length > 0) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInputs.forEach(input => {
      input.setAttribute('min', `${yyyy}-${mm}-${dd}`);
    });
  }

  // 4. Consultation / Appointment Form Submission
  const appointmentForms = document.querySelectorAll('#appointmentForm, #homeAppointmentForm');
  appointmentForms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameField = this.querySelector('input[name="name"], #app_name, #fullName');
      const emailField = this.querySelector('input[name="email"], #app_email, #email');
      const phoneField = this.querySelector('input[name="phone"], #app_phone, #phone');
      const serviceField = this.querySelector('select[name="service"], #app_service, #serviceType');
      const notesField = this.querySelector('textarea[name="notes"], textarea[name="message"], #app_notes');
      const feedback = this.querySelector('.form-feedback-alert') || document.getElementById('appointmentFeedback');

      const showMessage = (text, isSuccess) => {
        if (feedback) {
          feedback.className = `form-feedback-alert ${isSuccess ? 'success' : 'error'}`;
          feedback.innerHTML = text;
          feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      };

      if (!nameField || !nameField.value.trim()) {
        showMessage('Please provide your full name.', false);
        nameField?.focus();
        return;
      }
      if (!emailField || !emailField.value.trim() || !emailField.value.includes('@')) {
        showMessage('Please provide a valid email address.', false);
        emailField?.focus();
        return;
      }
      if (!phoneField || !phoneField.value.trim()) {
        showMessage('Please enter your contact phone / WhatsApp number.', false);
        phoneField?.focus();
        return;
      }

      const consentField = this.querySelector('input[name="consent"]');
      if (consentField && !consentField.checked) {
        showMessage('Please tick the consent box so we can contact you.', false);
        consentField.focus();
        return;
      }

      const serviceVal = serviceField ? (serviceField.options[serviceField.selectedIndex]?.text || serviceField.value) : 'Biokinetics Consultation';
      const notesVal = notesField?.value.trim() || 'No additional notes.';

      // Send the request to the Care Coordinator on WhatsApp, prefilled with the form details.
      const lines = [
        'Hello Boikanya, I would like to request a consultation.',
        `Name: ${nameField.value.trim()}`,
        `Email: ${emailField.value.trim()}`,
        `Phone: ${phoneField.value.trim()}`,
        `Service: ${serviceVal}`,
        `Notes: ${notesVal}`
      ];
      const waUrl = 'https://wa.me/27671728818?text=' + encodeURIComponent(lines.join('\n'));
      window.open(waUrl, '_blank', 'noopener');

      const safeName = nameField.value.trim().replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
      showMessage(`<strong>Thank you, ${safeName}!</strong> WhatsApp has opened with your request. Press send and our Care Coordinator will contact you to confirm your session. If WhatsApp did not open, <a href="${waUrl}" target="_blank" rel="noopener">tap here</a> or call 067 172 8818.`, true);

      // Reset form
      form.reset();

      // Optional redirect to live calendar if requested
      if (!window.location.pathname.includes('appointment.html')) {
        setTimeout(() => {
          const calendarSection = document.getElementById('bookem-booking');
          if (calendarSection) {
            calendarSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 1500);
      }
    });
  });

  // 5. Contact Form Handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    // Prefill the message when a page links here with ?topic=..., e.g. from the Wellness programmes
    const topic = new URLSearchParams(window.location.search).get('topic');
    const topicBox = document.getElementById('contactMessage');
    if (topic && topicBox && !topicBox.value) {
      topicBox.value = 'Enquiry: ' + topic.slice(0, 80) + '\n\n';
    }

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('name') || document.getElementById('contactName');
      const emailInput = document.getElementById('email') || document.getElementById('contactEmail');
      const messageInput = document.getElementById('message') || document.getElementById('contactMessage');
      const feedback = document.getElementById('contactFeedback');

      const showMessage = (text, isSuccess) => {
        if (feedback) {
          feedback.className = `form-feedback-alert ${isSuccess ? 'success' : 'error'}`;
          feedback.innerHTML = text;
          feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      };

      if (!nameInput || !nameInput.value.trim()) {
        showMessage('Please enter your full name.', false);
        nameInput?.focus();
        return;
      }
      if (!emailInput || !emailInput.value.trim() || !emailInput.value.includes('@')) {
        showMessage('Please enter a valid email address.', false);
        emailInput?.focus();
        return;
      }
      if (!messageInput || !messageInput.value.trim()) {
        showMessage('Please write your message.', false);
        messageInput?.focus();
        return;
      }

      const contactConsent = contactForm.querySelector('input[name="consent"]');
      if (contactConsent && !contactConsent.checked) {
        showMessage('Please tick the consent box so we can contact you.', false);
        contactConsent.focus();
        return;
      }

      // Open the visitor's email app with the message ready to send to the practice.
      const subject = 'Website enquiry from ' + nameInput.value.trim();
      const body = messageInput.value.trim() + '\n\n' + nameInput.value.trim() + '\n' + emailInput.value.trim();
      const mailUrl = 'mailto:admin@boikanya.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      window.location.href = mailUrl;

      const safeName = nameInput.value.trim().replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
      showMessage(`<strong>Thank you, ${safeName}!</strong> Your email app has opened with your message to admin@boikanya.com. Press send and we will reply soon. You can also WhatsApp us on 067 172 8818.`, true);
      contactForm.reset();
    });
  }

  // 6. Architectural Stage Showcase Controller
  const stageTabs = document.querySelectorAll('.stage-tab-btn');
  const stageSlides = document.querySelectorAll('.stage-slide-view');
  const stageProgressBar = document.getElementById('stage-progress-bar');
  const stageLinkText = document.getElementById('stage-link-text');
  const stageQuickLink = document.getElementById('stage-view-details-link');
  const clinicalStageDeck = document.getElementById('clinical-stage-deck');

  if (stageTabs.length > 0 && stageSlides.length > 0) {
    let currentStageIndex = 0;
    const stageDuration = 6000; // 6 seconds per stage
    let stageTimer = null;
    let isHovered = false;

    const stageLinks = [
      { text: "EXPLORE ORTHOPAEDIC PROTOCOLS", url: "service.html#ortho-rehab" },
      { text: "DISCOVER AFRICAN PLAY THERAPY", url: "service.html#play-therapy" },
      { text: "VIEW NEURO RECOVERY PROTOCOLS", url: "service.html#neuro-rehab" },
      { text: "LEARN ABOUT METABOLIC LONGEVITY", url: "service.html#chronic-care" }
    ];

    function activateStage(index) {
      currentStageIndex = index;

      // Update tabs
      stageTabs.forEach((tab, i) => {
        if (i === index) {
          tab.classList.add('active');
          tab.setAttribute('aria-selected', 'true');
        } else {
          tab.classList.remove('active');
          tab.setAttribute('aria-selected', 'false');
        }
      });

      // Update visual slides
      stageSlides.forEach((slide, i) => {
        if (i === index) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      // Update bottom quick link
      if (stageLinkText && stageLinks[index]) {
        stageLinkText.textContent = stageLinks[index].text;
      }
      if (stageQuickLink && stageLinks[index]) {
        stageQuickLink.setAttribute('href', stageLinks[index].url);
      }

      // Reset & animate progress bar
      if (stageProgressBar) {
        stageProgressBar.style.transition = 'none';
        stageProgressBar.style.width = '0%';
        void stageProgressBar.offsetWidth; // Trigger DOM reflow
        if (!isHovered) {
          stageProgressBar.style.transition = `width ${stageDuration}ms linear`;
          stageProgressBar.style.width = '100%';
        }
      }
    }

    function startAutoStage() {
      stopAutoStage();
      if (!isHovered) {
        if (stageProgressBar) {
          stageProgressBar.style.transition = `width ${stageDuration}ms linear`;
          stageProgressBar.style.width = '100%';
        }
        stageTimer = setTimeout(() => {
          const nextIndex = (currentStageIndex + 1) % stageTabs.length;
          activateStage(nextIndex);
          startAutoStage();
        }, stageDuration);
      }
    }

    function stopAutoStage() {
      if (stageTimer) {
        clearTimeout(stageTimer);
        stageTimer = null;
      }
      if (stageProgressBar) {
        stageProgressBar.style.transition = 'none';
      }
    }

    // Attach click listeners to tabs
    stageTabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        activateStage(i);
        startAutoStage();
      });
    });

    // Pause on hover
    if (clinicalStageDeck) {
      clinicalStageDeck.addEventListener('mouseenter', () => {
        isHovered = true;
        stopAutoStage();
      });
      clinicalStageDeck.addEventListener('mouseleave', () => {
        isHovered = false;
        startAutoStage();
      });
    }

    // Initialize first stage
    activateStage(0);
    startAutoStage();
  }

  // 7. Auto-populate triage goals if on appointment page
  if (window.location.search && window.location.pathname.includes('appointment')) {
    const urlParams = new URLSearchParams(window.location.search);
    const goal = urlParams.get('goal');
    const serviceSelect = document.getElementById('serviceSelect') || document.querySelector('select[name="service"]');
    if (serviceSelect && goal) {
      const goalMapping = {
        'ortho': 'Orthopaedic & Musculoskeletal Rehabilitation',
        'post-surgery': 'Post-Surgical Joint Rehabilitation',
        'play-therapy': 'Indigenous African Games Play Therapy',
        'neuro': 'Neurological & Stroke Rehabilitation',
        'vitality': 'Discovery Vitality Fitness Assessment',
        'chronic': 'Chronic Disease Management (Hypertension/Diabetes)'
      };
      if (goalMapping[goal]) {
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].text.toLowerCase().includes(goal) || serviceSelect.options[i].value.toLowerCase().includes(goal)) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
      }
    }
  }

});

