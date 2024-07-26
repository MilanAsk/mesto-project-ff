import './index.css';
import { initialCards } from './cards';
import { createCard } from './components/card';
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
    const card = createCard(element);
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

  evt = {
    name: titleInput.value,
    link: linkInput.value,
  };

  const newCard = createCard(evt);

  cardPlace.prepend(newCard);

  closePopup(popupNewCard);
  formAddCard.reset();
}

export {
  closeButton,
  mainContent,
  cardPlace,
  popupImage,
  formAddCard,
  formEditProfile,
  popupEditProfile,
  popupNewCard,
  openPopupImage,
};
