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

//Added a event listener to close the modal pressing Esc key
window.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

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
  const formElements = [
    'first',
    'last',
    'email',
    'birthdate',
    'quantity',
    'location',
    'checkbox1',
  ];

  let isValid = true;

  // Reset previous error states
  formData.forEach((element) => resetErrorState(element));

  // Validate each form element
  formElements.forEach((elementId) => {
    const inputElement = document.getElementById(elementId);
    const validationFunction = validationRules[elementId];

    if (!validationFunction(inputElement)) {
      isValid = false;
    }
  });

  return isValid;
}

// Helper function to reset error state
function resetErrorState(element) {
  element.removeAttribute('data-error');
  element.removeAttribute('data-error-visible');
}

// Validation rules for each form element
const validationRules = {
  first: (element) => validateNameLength(element, 2, 'Le prénom est requis et doit comporté au moins deux caractères.'),
  last: (element) => validateNameLength(element, 2, 'Le nom est requis et doit comporté au moins deux caractères.'),
  email: (element) => validateEmail(element, 'Veuillez saisir une adresse e-mail valide.'),
  birthdate: (element) => validateRequired(element, 'La date de naissance est requise.'),
  quantity: (element) => validateNumberRange(element, 0, 99, 'Veuillez entrer un nombre valide.'),
  location: (element) => validateLocation(element, 'Veuillez sélectionner une ville.'),
  checkbox1: (element) => validateCheckbox(element.nextElementSibling, 'Vous devez accepter les conditions d\'utilisation.'),
};

// Helper function to validate required fields
function validateRequired(element, errorMessage) {
  if (element.value.trim() === '') {
    setValidationError(element, errorMessage);
    return false;
  }
  return true;
}

function validateNameLength(element, minLength, errorMessage) {
  if (element.value.trim().length < minLength) {
    setValidationError(element, errorMessage);
    return false;
  }
  return true;
}

// Helper function to validate email
function validateEmail(element, errorMessage) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(element.value.trim())) {
    setValidationError(element, errorMessage);
    return false;
  }
  return true;
}

// Helper function to validate number range
function validateNumberRange(element, min, max, errorMessage) {
  const value = parseFloat(element.value);
  if (isNaN(value) || value < min || value > max) {
    setValidationError(element, errorMessage);
    return false;
  }
  return true;
}

// Helper function to validate location
function validateLocation(element, errorMessage) {
  const locationInputs = document.querySelectorAll('input[name="location"]');
  if (!Array.from(locationInputs).some((input) => input.checked)) {
    setValidationError(locationInputs[0], errorMessage);
    return false;
  }
  return true;
}

// Helper function to validate checkbox
function validateCheckbox(element, errorMessage) {
  const checkboxInput = element.previousElementSibling;
  if (!checkboxInput.checked) {
    setValidationError(element, errorMessage);
    return false;
  }
  return true;
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
