console.log('Hello, World!');

// index.js

import './index.css'; // добавьте импорт главного файла стилей
import { deleteCard, likeCard, addCardEvents, createCard, renderCards } from './components/card';
import {
  openPopup,
  closePopup,
  keyClose,
  handleFormSubmit,
  addCardSubmit,
} from './components/modal';

const mainContent = document.querySelector('.content');
const cardPlace = mainContent.querySelector('.places__list');

renderCards();

// Модалки
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

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
});

addCardButton.addEventListener('click', () => {
  openPopup(popupNewCard);
});

popupEditProfile.addEventListener('click', (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(popupEditProfile);
  }
});

popupNewCard.addEventListener('click', (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(popupNewCard);
  }
});

popupImage.addEventListener('click', (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(popupImage);
  }
});

// Формы
const formEditProfile = document.forms['edit-profile'];
const formAddCard = document.forms['new-place'];

// Слушатели форм
formEditProfile.addEventListener('submit', handleFormSubmit);
formAddCard.addEventListener('submit', addCardSubmit);

export {
  mainContent,
  cardPlace,
  popupImage,
  formAddCard,
  formEditProfile,
  popupEditProfile,
  popupNewCard,
};
