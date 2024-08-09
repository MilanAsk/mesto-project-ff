// Открытие ошибки
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationConfig.inputErrorClass);

  errorElement.classList.add(validationConfig.errorClass);

  errorElement.textContent = errorMessage;
};

// Закрытие ошибки
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);

  errorElement.textContent = '';
};

// Проверка валидности
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

// Слушатели всех инпутов
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

// Тоггл кнопки
const toggleButtonState = (inputs, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputs)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

// Серч невалидных полей
const hasInvalidInput = (inputs) => {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Валидация форм
export function enableValidation(validationConfig) {
  const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));

  forms.forEach((form) => {
    // Слушатели сабмита
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, validationConfig);
  });
}

// Очистка ошибок
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
