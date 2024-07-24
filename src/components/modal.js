import {
  formAddCard,
  formEditProfile,
  cardPlace,
  popupNewCard,
  popupEditProfile,
  mainContent,
} from '../index';
import { createCard } from './card';

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

function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const nameInput = formEditProfile.elements.name;
  const jobInput = formEditProfile.elements.description;
  const profileTitle = mainContent.querySelector('.profile__title');
  const profileDescription = mainContent.querySelector('.profile__description');

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupEditProfile);
}

function addCardSubmit(evt) {
  evt.preventDefault();

  const titleInput = formAddCard.elements['place-name'];
  const linkInput = formAddCard.elements.link;

  evt.name = titleInput.value;
  evt.link = linkInput.value;

  const newCard = createCard(evt);

  cardPlace.prepend(newCard);

  closePopup(popupNewCard);
  formAddCard.reset();
}

export { keyClose, openPopup, closePopup, handleFormSubmit, addCardSubmit };
