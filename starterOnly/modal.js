function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalCloseBtn = document.querySelector(".close");
const modalThanks = document.querySelector('.modal-thanks');
const formModal = document.getElementById('formModal');

// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Launch modal form
function launchModal() {
  modalbg.style.display = "block";
  modalCloseBtn.addEventListener("click", closeModal);
  formModal.addEventListener("submit", submitForm);
}

// Close modal event
function closeModal() {
  modalbg.style.display = "none";
  modalThanks.style.display = "none";
  formModal.style.display = "block";
  formModal.reset(); // Reset form on close
}

// Submit form event
function submitForm(event) {
  event.preventDefault();

  // Validation logic
  if (validateForm()) {
    formModal.style.display = "none";
    showModalThanks();
  }
}

// Validation logic for the form
function validateForm() {
  const firstNameInput = document.getElementById('first');
  const lastNameInput = document.getElementById('last');
  const emailInput = document.getElementById('email');
  const birthdateInput = document.getElementById('birthdate');
  const quantityInput = document.getElementById('quantity');
  const locationInputs = document.querySelectorAll('input[name="location"]');
  const checkbox1Input = document.getElementById('checkbox1');

  let isValid = true;

  // Reset previous error states
  formData.forEach((element) => {
    element.removeAttribute('data-error');
    element.removeAttribute('data-error-visible');
  });

  // Validate first name
  if (firstNameInput.value.trim() === '') {
    setValidationError(firstNameInput, 'Le prénom est requis.');
    isValid = false;
  }

  // Validate last name
  if (lastNameInput.value.trim() === '') {
    setValidationError(lastNameInput, 'Le nom est requis.');
    isValid = false;
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    setValidationError(emailInput, 'Veuillez saisir une adresse e-mail valide.');
    isValid = false;
  }

  // Validate birthdate
  if (birthdateInput.value.trim() === '') {
    setValidationError(birthdateInput, 'La date de naissance est requise.');
    isValid = false;
  }

  // Validate quantity (number of GameOn tournaments participated)
  if (isNaN(quantityInput.value) || quantityInput.value < 0 || quantityInput.value > 99) {
    setValidationError(quantityInput, 'Veuillez entrer un nombre valide.');
    isValid = false;
  }

  // Validate location selection
  if (!Array.from(locationInputs).some((input) => input.checked)) {
    setValidationError(locationInputs[0], 'Veuillez sélectionner une ville.');
    isValid = false;
  }

  // Validate checkbox1 (terms of use)
  if (!checkbox1Input.checked) {
    setValidationError(checkbox1Input.nextElementSibling, 'Vous devez accepter les conditions d\'utilisation.');
    isValid = false;
  }

  return isValid;
}

// Helper function to set validation error
function setValidationError(element, errorMessage) {
  element.parentElement.setAttribute('data-error', errorMessage);
  element.parentElement.setAttribute('data-error-visible', 'true');
}


// Show modal thanks
function showModalThanks() {
  modalThanks.style.display = "block";

  const closeModalBtn = document.createElement('button');
  closeModalBtn.className = "btn-signup btn-thanks";
  closeModalBtn.textContent = "Fermer";
  closeModalBtn.addEventListener("click", closeModal);
  modalThanks.appendChild(closeModalBtn);
}
