import { clearValidation } from './validation';
import { validationConfig } from '../index';

const keyClose = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
};

function openPopup(popup) {
  popup.classList.add('popup_is-opened');

  document.addEventListener('keydown', keyClose);

  clearValidation(popup, validationConfig);
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', keyClose);
}

const closePopupByOverlay = (evt) => {
  if (evt.currentTarget === evt.target || evt.target.classList.contains('popup__close')) {
    closePopup(evt.currentTarget);
  }
};
export { keyClose, openPopup, closePopup, closePopupByOverlay };
