console.log('Hello, World!');

// index.js

import './index.css'; // добавьте импорт главного файла стилей
import { initialCards } from './cards';

const numbers = [2, 3, 5];

// Стрелочная функция. Не запнётся ли на ней Internet Explorer?
const doubledNumbers = numbers.map((number) => number * 2);

console.log(doubledNumbers); // 4, 6, 10

const mainContent = document.querySelector('.content');
// @todo: Темплейт карточки
const cardPlace = mainContent.querySelector('.places__list');

function deleteCard(event) {
  event.stopPropagation();

  event.target.closest('.card').remove();
}

function likeCard(evt) {
  evt.stopPropagation();

  evt.target.classList.toggle('card__like-button_is-active');
}

function addCardEvents(cardNode) {
  const deleteButton = cardNode.querySelector('.card__delete-button');
  const likeButton = cardNode.querySelector('.card__like-button');

  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', likeCard);
}

function createCard(cardData) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardNode = cardTemplate.querySelector('.places__item.card').cloneNode(true);
  const titleNode = cardNode.querySelector('.card__title');
  const cardImage = cardNode.querySelector('.card__image');
  const titleText = cardData.name;
  const imageLink = cardData.link;

  titleNode.textContent = titleText;
  cardImage.src = imageLink;
  cardImage.alt = titleText;

  addCardEvents(cardNode);
  cardImage.addEventListener('click', () => {
    const popupImageUrl = popupImage.querySelector('.popup__image');
    const popupImageText = popupImage.querySelector('.popup__caption');

    popupImageUrl.src = imageLink;
    popupImageText.textContent = titleText;

    openPopup(popupImage);
  });

  return cardNode;
}

function renderCards() {
  const container = document.createDocumentFragment();

  initialCards.forEach((element) => {
    const card = createCard(element);
    container.append(card);
  });

  cardPlace.append(container);
}

renderCards();

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

popupEditProfile.classList.add('popup_is-animated');
popupNewCard.classList.add('popup_is-animated');
popupImage.classList.add('popup_is-animated');

const editProfileButton = mainContent.querySelector('.profile__edit-button');
const addCardButton = mainContent.querySelector('.profile__add-button');

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

const keyClose = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
};

function openPopup(popup) {
  const closeButton = popup.querySelector('.popup__close');

  popup.classList.add('popup_is-opened');

  closeButton.addEventListener('click', function popupEvent() {
    closePopup(popup);
  });
  document.addEventListener('keydown', keyClose);
}

function closePopup(popup) {
  const closeButton = popup.querySelector('.popup__close');

  popup.classList.remove('popup_is-opened');

  closeButton.removeEventListener('click', function popupEvent() {
    closePopup(popup);
  });
  document.removeEventListener('keydown', keyClose);
}

const profileTitle = mainContent.querySelector('.profile__title');
const profileDescription = mainContent.querySelector('.profile__description');
// const formEditProfile = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// const nameInput = formEditProfile.querySelector('.popup__input_type_name'); // Воспользуйтесь инструментом .querySelector()
// const jobInput = formEditProfile.querySelector('.popup__input_type_description'); // Воспользуйтесь инструментом .querySelector()
const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;

nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupEditProfile);
}

formEditProfile.addEventListener('submit', handleFormSubmit);

const formAddCard = document.forms['new-place'];
const titleInput = formAddCard.elements['place-name'];
const linkInput = formAddCard.elements.link;

function addCardSubmit(evt) {
  evt.preventDefault();

  evt.name = titleInput.value;
  evt.link = linkInput.value;

  const newCard = createCard(evt);

  cardPlace.prepend(newCard);

  closePopup(popupNewCard);
  formAddCard.reset();
}

formAddCard.addEventListener('submit', addCardSubmit);
