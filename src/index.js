import './index.css';
import { initialCards } from './cards';
import { createCard, deleteCard, likeCard } from './components/card';
import { openPopup, closePopup, closePopupByOverlay } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';

const mainContent = document.querySelector('.content');
const cardPlace = mainContent.querySelector('.places__list');

const openPopupImage = (imageLink, titleText) => {
  const popupImageUrl = popupImage.querySelector('.popup__image');
  const popupImageText = popupImage.querySelector('.popup__caption');
  popupImageUrl.src = imageLink;
  popupImageText.textContent = titleText;
  openPopup(popupImage);
};

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-19',
  headers: {
    authorization: 'b1fc73a0-b339-4f23-8bc6-4511c8e7234e',
    'Content-Type': 'application/json',
  },
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

const checkRes = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// GET профиля
const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers,
  }).then(checkRes);
};

// const likeCounter = () => {
//   return fetch('https://nomoreparties.co/v1/wff-cohort-19/cards/likes/cards', {
//     method: 'PUT',
//     headers: {
//       authorization: 'b1fc73a0-b339-4f23-8bc6-4511c8e7234e',
//     },
//   })
//     .then(checkRes)
//     .then((data) => {
//       console.log(data);
//     });
// };
// likeCounter();

// GET массива карточек
const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers,
  }).then(checkRes);
};

// Рендер профиля и карточек
Promise.all([getUserInfo(), getCards()])
  .then(([user, cards]) => {
    const userId = user._id;
    nameInput.value = user.name;
    jobInput.value = user.about;

    cards.forEach((cardData) => {
      const card = createCard(cardData, deleteCard, likeCard, openPopupImage, userId);
      cardPlace.append(card);
    });

    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
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
const formAddCard = document.forms['new-place'];
const formEditAvatar = document.forms['edit-avatar'];

// Слушатели форм
formEditProfile.addEventListener('submit', editProfileSubmit);
formAddCard.addEventListener('submit', addCardSubmit);
formEditAvatar.addEventListener('submit', editAvatarSubmit);

const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const profileTitle = mainContent.querySelector('.profile__title');
const profileDescription = mainContent.querySelector('.profile__description');

const fetchWrapper = (path, config) => {
  return fetch(`${config.baseUrl}${path}`, { headers: config.headers, ...config });
};

const newSaveUserInfo = (nameData, aboutData) => {
  fetchWrapper(`/users/me`, {
    method: 'PATCH',
    body: JSON.stringify({
      name: nameData,
      about: aboutData,
    }),
  }).then(checkRes);
};

// Сохранение изменений в профиле
// const saveUserInfo = (nameData, aboutData) => {
//   fetch(`${config.baseUrl}/users/me`, {
//     method: 'PATCH',
//     headers: config.headers,
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

  newSaveUserInfo(profileTitle.textContent, profileDescription.textContent);

  closePopup(popupEditProfile);
}

// Пост новой карточки
const postCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
    headers: config.headers,
  }).then(checkRes);
};

function addCardSubmit(evt) {
  evt.preventDefault();

  const titleInput = formAddCard.elements['place-name'];
  const linkInput = formAddCard.elements.link;

  const cardData = {
    name: titleInput.value,
    link: linkInput.value,
  };

  postCard(cardData);

  const newCard = createCard(cardData, deleteCard, likeCard, openPopupImage);

  cardPlace.prepend(newCard);

  closePopup(popupNewCard);
  formAddCard.reset();
  clearValidation(popupNewCard, validationConfig);
}

const saveNewAvatar = (url) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    body: JSON.stringify({
      avatar: url,
    }),
    headers: config.headers,
  })
    .then(checkRes)
    .then((data) => {
      console.log(data);
    });
};

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
