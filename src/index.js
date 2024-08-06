import './index.css';
import { initialCards } from './cards';
import { createCard, deleteCard, likeCard } from './components/card';
import { openPopup, closePopup, closePopupByOverlay } from './components/modal';

const mainContent = document.querySelector('.content');
const cardPlace = mainContent.querySelector('.places__list');

const openPopupImage = (imageLink, titleText) => {
  const popupImageUrl = popupImage.querySelector('.popup__image');
  const popupImageText = popupImage.querySelector('.popup__caption');
  popupImageUrl.src = imageLink;
  popupImageText.textContent = titleText;
  openPopup(popupImage);
};

function renderCards() {
  const container = document.createDocumentFragment();

  initialCards.forEach((element) => {
    const card = createCard(element, deleteCard, likeCard, openPopupImage);
    container.append(card);
  });

  cardPlace.append(container);
}

renderCards();

// Модалки
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const closeButton = document.querySelector('.popup__close');

// Анимация открытия модалок
popupEditProfile.classList.add('popup_is-animated');
popupNewCard.classList.add('popup_is-animated');
popupImage.classList.add('popup_is-animated');

//Кнопки, открывающие модалки
const editProfileButton = mainContent.querySelector('.profile__edit-button');
const addCardButton = mainContent.querySelector('.profile__add-button');

//Слушатели модалок
editProfileButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

addCardButton.addEventListener('click', () => {
  openPopup(popupNewCard);
});

popupEditProfile.addEventListener('click', closePopupByOverlay);
popupNewCard.addEventListener('click', closePopupByOverlay);

popupImage.addEventListener('click', closePopupByOverlay);

// Формы
const formEditProfile = document.forms['edit-profile'];
const formAddCard = document.forms['new-place'];

// Слушатели форм
formEditProfile.addEventListener('submit', editProfileSubmit);
formAddCard.addEventListener('submit', addCardSubmit);

const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const profileTitle = mainContent.querySelector('.profile__title');
const profileDescription = mainContent.querySelector('.profile__description');

function editProfileSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupEditProfile);
}

function addCardSubmit(evt) {
  evt.preventDefault();

  const titleInput = formAddCard.elements['place-name'];
  const linkInput = formAddCard.elements.link;

  const cardData = {
    name: titleInput.value,
    link: linkInput.value,
  };

  const newCard = createCard(cardData, deleteCard, likeCard, openPopupImage);

  cardPlace.prepend(newCard);

  closePopup(popupNewCard);
  formAddCard.reset();
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

// показ ошибки
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

// скрытие ошибки
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

// проверка валидности
const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, validationConfig);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  }
};

// слушалки ввода на все поля всех форм
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

// изменение состояния кнопки
const toggleButtonState = (inputs, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputs)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

// поиск невалидных полей ввода
const hasInvalidInput = (inputs) => {
  return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// включение валидации всех форм
export function enableValidation(validationConfig) {
  const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));

  forms.forEach((form) => {
    // добавляем слушалки сабмита и инпута на все формы
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, validationConfig);
  });
}

// очистка ошибок валидации
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
