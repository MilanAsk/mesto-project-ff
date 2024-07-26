import { closeButton } from '../index';

const keyClose = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
};

function openPopup(popup) {
  popup.classList.add('popup_is-opened');

  closeButton.addEventListener('click', closePopupByOverlay);
  document.addEventListener('keydown', keyClose);
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');

  closeButton.removeEventListener('click', closePopupByOverlay);
  document.removeEventListener('keydown', keyClose);
}

const closePopupByOverlay = (evt) => {
  if (evt.currentTarget === evt.target || evt.target.classList.contains('popup__close')) {
    closePopup(evt.currentTarget);
  }
};
export { keyClose, openPopup, closePopup, closePopupByOverlay };
