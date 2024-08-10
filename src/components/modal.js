import { clearValidation } from './validation';
import { validationConfig, formAddCard } from '../index';

const keyClose = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
};

function openPopup(popup, withValidation = true) {
  popup.classList.add('popup_is-opened');

  document.addEventListener('keydown', keyClose);

  withValidation && clearValidation(popup, validationConfig);
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');

  formAddCard.reset();
  document.removeEventListener('keydown', keyClose);
}

const closePopupByOverlay = (evt) => {
  if (evt.currentTarget === evt.target || evt.target.classList.contains('popup__close')) {
    closePopup(evt.currentTarget);
  }
};
export { keyClose, openPopup, closePopup, closePopupByOverlay };
