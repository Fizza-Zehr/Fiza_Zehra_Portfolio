"use strict";
function validateContactForm(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "That doesn't look like a valid email address.";
  }

  if (!values.subject.trim()) {
    errors.subject = "Please add a short subject.";
  }

  if (!values.message.trim()) {
    errors.message = "Please write a message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Please write at least 10 characters so I have something to go on.";
  }

  return errors;
}

function showFieldError(fieldName, message) {
  const errorEl = document.getElementById(`${fieldName}Error`);
  const inputEl = document.getElementById(`${fieldName}Input`);
  if (errorEl) errorEl.textContent = message || "";
  if (inputEl) inputEl.parentElement.classList.toggle("field--invalid", Boolean(message));
}

function clearAllErrors(fields) {
  fields.forEach((field) => showFieldError(field, ""));
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const successBanner = document.getElementById("formSuccess");
  if (!form) return;

  const fields = ["name", "email", "subject", "message"];

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const values = {
      name: document.getElementById("nameInput").value,
      email: document.getElementById("emailInput").value,
      subject: document.getElementById("subjectInput").value,
      message: document.getElementById("messageInput").value,
    };

    clearAllErrors(fields);
    const errors = validateContactForm(values);

    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([field, message]) => showFieldError(field, message));
      successBanner.hidden = true;
      // Move focus to the first invalid field for quicker correction.
      const firstInvalid = Object.keys(errors)[0];
      document.getElementById(`${firstInvalid}Input`).focus();
      return;
    }

    // No backend in this task — simulate a successful send.
    form.reset();
    successBanner.hidden = false;
    successBanner.textContent = `Thanks, ${values.name.trim()} — your message has been noted. I'll get back to you soon.`;
    successBanner.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  // Clear a field's error as soon as the user starts fixing it.
  fields.forEach((field) => {
    const input = document.getElementById(`${field}Input`);
    input.addEventListener("input", () => showFieldError(field, ""));
  });
});
