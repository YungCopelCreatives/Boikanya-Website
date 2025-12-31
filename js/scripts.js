document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('appointmentForm');
  const fullName = document.getElementById('fullName');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const serviceType = document.getElementById('serviceType');
  const condition = document.getElementById('hvCondition');
  const dateInput = document.getElementById('appointmentDate');
  const description = document.getElementById('hvDesc');
  const consent = document.getElementById('consentCheck');

  // Set minimum date to today
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.setAttribute('min', `${yyyy}-${mm}-${dd}`);
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation guardrails
      if (!fullName.value.trim() || !email.value.trim() || !phone.value.trim() || !serviceType.value || !condition.value || !dateInput.value || !consent.checked) {
        alert('Please complete all required fields and consent to proceed.');
        return;
      }

      // If "Other" condition selected, ensure description is provided
      if (condition.value === 'other' && !description.value.trim()) {
        alert('Please describe your condition when selecting "Other".');
        description.focus();
        return;
      }

      const serviceText = serviceType.options[serviceType.selectedIndex]?.text || serviceType.value;
      const conditionText = condition.options[condition.selectedIndex]?.text || condition.value;

      const subject = `Appointment Request - ${serviceText} - ${dateInput.value} - ${fullName.value.trim()}`;
      const bodyLines = [
        `Name: ${fullName.value.trim()}`,
        `Email: ${email.value.trim()}`,
        `Phone: ${phone.value.trim()}`,
        `Service: ${serviceText}`,
        `Condition: ${conditionText}`,
        `Preferred Date: ${dateInput.value}`,
        '',
        'Additional Details:',
        `${description.value.trim() || 'N/A'}`,
        '',
        'Consent: I agree to Boikanya Biokinetics collecting and storing my information for appointment purposes.'
      ];

      const mailto = `mailto:dkbiokineticist@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

      try {
        window.location.href = mailto;
      } catch (err) {
        console.error('Failed to open mail client:', err);
        alert('Could not open your email client. Please email dkbiokineticist@gmail.com with your details.');
      }
    });
  }
});