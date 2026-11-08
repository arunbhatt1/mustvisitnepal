'use strict';

/**
 * Shared Form Validation Helper for Must Visit Nepal
 * Validates fields based on declared rules, manages accessible error states,
 * and clears errors dynamically on user input.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^(\+?977[- ]?)?[0-9]{9,10}$/;

/**
 * Validate a form according to field rules.
 * @param {HTMLFormElement} form
 * @param {Object} rules - Map of field name/id to rule configuration
 * @returns {boolean}
 */
function validateForm(form, rules) {
  let isValid = true;
  let firstInvalidElement = null;

  for (const [fieldId, rule] of Object.entries(rules)) {
    const field = form.querySelector(`#${fieldId}`) || form.querySelector(`[name="${fieldId}"]`);
    if (!field) continue;

    const errorSpan = form.querySelector(`#${fieldId}-error`) ||
                      form.querySelector(`#${fieldId}Err`) ||
                      form.querySelector(`#${fieldId}Er`);

    const value = field.value.trim();
    let errorMessage = '';

    if (rule.required && value === '') {
      errorMessage = rule.requiredMessage || `${rule.label || 'This field'} is required.`;
    } else if (value !== '') {
      if (rule.type === 'email' && !EMAIL_REGEX.test(value)) {
        errorMessage = rule.invalidMessage || 'Please enter a valid email address.';
      } else if (rule.type === 'phone' && !PHONE_REGEX.test(value.replace(/\s+/g, ''))) {
        errorMessage = rule.invalidMessage || 'Please enter a valid phone number (+977 or 10 digits).';
      } else if (rule.minLength && value.length < rule.minLength) {
        errorMessage = `Must be at least ${rule.minLength} characters.`;
      }
    }

    if (errorMessage) {
      isValid = false;
      field.classList.add('error');
      field.setAttribute('aria-invalid', 'true');
      if (errorSpan) {
        errorSpan.textContent = errorMessage;
        errorSpan.classList.add('error-text');
      }
      if (!firstInvalidElement) {
        firstInvalidElement = field;
      }
    } else {
      field.classList.remove('error');
      field.removeAttribute('aria-invalid');
      if (errorSpan) {
        errorSpan.textContent = '';
      }
    }
  }

  if (firstInvalidElement) {
    firstInvalidElement.focus();
  }

  return isValid;
}

/**
 * Attach dynamic error-clearing listeners on all input/change events.
 * @param {HTMLFormElement} form
 */
function attachErrorClearingListeners(form) {
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    const clearError = () => {
      if (input.classList.contains('error')) {
        input.classList.remove('error');
        input.removeAttribute('aria-invalid');
        const fieldId = input.id || input.name;
        const errorSpan = form.querySelector(`#${fieldId}-error`) ||
                          form.querySelector(`#${fieldId}Err`) ||
                          form.querySelector(`#${fieldId}Er`);
        if (errorSpan) {
          errorSpan.textContent = '';
        }
      }
    };
    input.addEventListener('input', clearError);
    input.addEventListener('change', clearError);
  });
}

// Export for module or global use
window.validateForm = validateForm;
window.attachErrorClearingListeners = attachErrorClearingListeners;
