const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationConfig.inputErrorClass);

  errorElement.classList.add(validationConfig.errorClass);

  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);

  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, validationConfig);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  }
};

const setEventListeners = (formElement, validationConfig) => {
  const inputs = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const submitButtonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputs, submitButtonElement, validationConfig);
    });
  });
  toggleButtonState(inputs, submitButtonElement, validationConfig);
};

const toggleButtonState = (inputs, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputs)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

const hasInvalidInput = (inputs) => {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

export function enableValidation(validationConfig) {
  const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));

  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, validationConfig);
  });
}

export function clearValidation(formElement, validationConfig) {
  const inputs = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));

  inputs.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });
  toggleButtonState(
    inputs,
    formElement.querySelector(validationConfig.submitButtonSelector),
    validationConfig
  );
}
