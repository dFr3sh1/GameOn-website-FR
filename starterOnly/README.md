# Projet GameOn

In the framework of the formation of design and development front-end of app in React and Js I had to forked this project and complete the functions in order to validate a suscribe form. 

Also the css responsive had to be modified to respond to the technical sheets and the mockup receieved for this project.

In this project I started to understand the use and the logic of the functions, the access to the DOM and the conditional structurres.

Each cell of the subscribe form has been checked wiht a function. Creating a modular program where each function can be customized upon user needs.

### Technolgoies
-   HMTL
-   CSS
-   Javascript
-   ChatGPT (To check errors in the functions)

With the prompt "As a lead front-end developer with over 15 years' experience, factor the following snippet: "

// For the form validation
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

The prcedent snippet was my first proposal to validate the subscription form before requiring ChatGPT to factor it.