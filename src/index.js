import './index.css';
import { createCard, deleteCard, likeCard } from './components/card';
import { openPopup, closePopup, closePopupByOverlay } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import { getUserInfo, getCards, postCard, saveNewAvatar, saveUserInfo } from './components/api';

const mainContent = document.querySelector('.content');
const cardPlace = mainContent.querySelector('.places__list');

// Рендер профиля и карточек
Promise.all([getUserInfo(), getCards()])
  .then(([user, cards]) => {
    const userId = user._id;
    // const ownerId = cards.owner['_id'];

    nameInput.value = user.name;
    jobInput.value = user.about;

    const container = document.createDocumentFragment();

    cards.forEach((cardData) => {
      const cardId = cardData._id;
      const ownerId = cardData.owner._id;

      const card = createCard(
        cardData,
        deleteCard,
        likeCard,
        openPopupImage,
        cardId,
        ownerId,
        userId
      );

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

// Модалки
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const closeButton = document.querySelector('.popup__close');
const popupEditAvatar = document.querySelector('.popup_avatar_edit');

const popupImageUrl = popupImage.querySelector('.popup__image');
const popupImageText = popupImage.querySelector('.popup__caption');

const openPopupImage = (imageLink, titleText) => {
  popupImageUrl.src = imageLink;
  popupImageText.textContent = titleText;
  openPopup(popupImage, false);
};

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

function renderLoading(isLoading) {
  const button = document.querySelector('.button');
  button.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
}

function editProfileSubmit(evt) {
  evt.preventDefault();

  renderLoading(true);

  saveUserInfo(nameInput.value, jobInput.value)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.log('Произошла ошибка:', err);
    })
    .finally(() => {
      renderLoading(false);
    });
}

const titleInput = formAddCard.elements['place-name'];
const linkInput = formAddCard.elements.link;

function addCardSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: titleInput.value,
    link: linkInput.value,
    likes: '',
  };

  renderLoading(true);

  postCard(cardData)
    .then((res) => {
      const newcardId = res._id;

      const newCard = createCard(cardData, deleteCard, likeCard, openPopupImage, newcardId);
      cardPlace.prepend(newCard);
      closePopup(popupNewCard);
      formAddCard.reset();
      clearValidation(popupNewCard, validationConfig);
    })
    .catch((err) => {
      console.log('Произошла ошибка:', err);
    })
    .finally(() => {
      renderLoading(false);
    });
}

const inputUrl = formEditAvatar.elements.link;

function editAvatarSubmit(evt) {
  evt.preventDefault();

  renderLoading(true);

  saveNewAvatar(inputUrl.value)
    .then((res) => {
      editAvatarButton.style.cssText = `background-image: url("${res.avatar}");`;
      closePopup(popupEditAvatar);
      formEditAvatar.reset();
    })
    .catch((err) => {
      console.log('Произошла ошибка:', err);
    })
    .finally(() => {
      renderLoading(false);
    });
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
