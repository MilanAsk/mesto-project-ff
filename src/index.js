import './index.css';
import { createCard, deleteCard, likeCard } from './components/card';
import { openPopup, closePopup, closePopupByOverlay } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import {
  getUserInfo,
  getCards,
  config,
  postCard,
  saveNewAvatar,
  saveUserInfo,
} from './components/api';

const mainContent = document.querySelector('.content');
const cardPlace = mainContent.querySelector('.places__list');

const openPopupImage = (imageLink, titleText) => {
  const popupImageUrl = popupImage.querySelector('.popup__image');
  const popupImageText = popupImage.querySelector('.popup__caption');
  popupImageUrl.src = imageLink;
  popupImageText.textContent = titleText;
  openPopup(popupImage, false);
};

// Рендер профиля и карточек
Promise.all([getUserInfo(), getCards()])
  .then(([user, cards]) => {
    const userId = user._id;
    nameInput.value = user.name;
    jobInput.value = user.about;
    console.log(cards[0]._id, 'первая карточка');
    const container = document.createDocumentFragment();

    cards.forEach((cardData) => {
      const cardId = cardData._id;
      // console.log(cardId, 'cardData');
      const card = createCard(cardData, deleteCard, likeCard, openPopupImage, cardId, userId);

      const deleteButton = card.querySelector('.card__delete-button');

      if (cardData.owner._id !== user._id) {
        deleteButton.style.cssText = 'display: none';
      }

      container.append(card);
    });

    cardPlace.append(container);

    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    editAvatarButton.style.cssText = `background-image: url("${user.avatar}");`;
  })
  .catch((err) => {
    alert(err);
  });

// function renderCards() {
//   const container = document.createDocumentFragment();

//   initialCards.forEach((element) => {
//     const card = createCard(element, deleteCard, likeCard, openPopupImage);
//     container.append(card);
//   });

//   cardPlace.append(container);
// }

// renderCards();

// Модалки
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const closeButton = document.querySelector('.popup__close');
const popupEditAvatar = document.querySelector('.popup_avatar_edit');

// Анимация открытия модалок
popupEditProfile.classList.add('popup_is-animated');
popupNewCard.classList.add('popup_is-animated');
popupImage.classList.add('popup_is-animated');
popupEditAvatar.classList.add('popup_is-animated');

//Кнопки, открывающие модалки
const editProfileButton = mainContent.querySelector('.profile__edit-button');
const addCardButton = mainContent.querySelector('.profile__add-button');
const editAvatarButton = mainContent.querySelector('.profile__image');

// Наведение на аватар
editAvatarButton.addEventListener('mouseover', profileImageHover);

function profileImageHover(evt) {
  evt.stopPropagation();

  const profileImageOverlay = mainContent.querySelector('.profile__image-overlay');
  const profileImageSvg = mainContent.querySelector('.profile__image-svg');

  profileImageOverlay.style.cssText = 'opacity: 1';
  profileImageSvg.style.cssText = 'opacity: 1';

  editAvatarButton.addEventListener('mouseout', () => {
    profileImageOverlay.style.cssText = 'opacity: 0';
    profileImageSvg.style.cssText = 'opacity: 0';
  });
}

//Слушатели модалок
editProfileButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

addCardButton.addEventListener('click', () => {
  openPopup(popupNewCard);
});

editAvatarButton.addEventListener('click', () => {
  openPopup(popupEditAvatar);
});

popupEditProfile.addEventListener('click', closePopupByOverlay);
popupEditAvatar.addEventListener('click', closePopupByOverlay);
popupNewCard.addEventListener('click', closePopupByOverlay);
popupImage.addEventListener('click', closePopupByOverlay);

// Формы
const formEditProfile = document.forms['edit-profile'];
export const formAddCard = document.forms['new-place'];
const formEditAvatar = document.forms['edit-avatar'];

// Слушатели форм
formEditProfile.addEventListener('submit', editProfileSubmit);
formAddCard.addEventListener('submit', addCardSubmit);
formEditAvatar.addEventListener('submit', editAvatarSubmit);

const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const profileTitle = mainContent.querySelector('.profile__title');
const profileDescription = mainContent.querySelector('.profile__description');

// const fetchWrapper = (path, requestConfig) => {
//   return fetch(`${config.baseUrl}${path}`, { headers: config.headers, ...requestConfig });
// };
// const SaveUserInfo = (nameData, aboutData) => {
//   fetchWrapper(`/users/me`, {
//     method: 'PATCH',
//     body: JSON.stringify({
//       name: nameData,
//       about: aboutData,
//     }),
//   }).then(checkRes);
// };

function editProfileSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  saveUserInfo(profileTitle.textContent, profileDescription.textContent);

  closePopup(popupEditProfile);
}

function addCardSubmit(evt) {
  evt.preventDefault();

  const titleInput = formAddCard.elements['place-name'];
  const linkInput = formAddCard.elements.link;

  const cardData = {
    name: titleInput.value,
    link: linkInput.value,
    likes: '',
  };

  postCard(cardData);

  const newCard = createCard(cardData, deleteCard, likeCard, openPopupImage);

  cardPlace.prepend(newCard);

  closePopup(popupNewCard);
  formAddCard.reset();
  clearValidation(popupNewCard, validationConfig);
}

function editAvatarSubmit(evt) {
  evt.preventDefault();

  const inputUrl = formEditAvatar.elements.link.value;

  editAvatarButton.style.cssText = `background-image: url("${inputUrl}");`;

  saveNewAvatar(inputUrl);

  closePopup(popupEditAvatar);
  formEditAvatar.reset();
}

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

enableValidation(validationConfig);
