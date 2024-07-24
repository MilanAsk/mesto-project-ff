const keyClose = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
};

function openPopup(popup) {
  const closeButton = popup.querySelector('.popup__close');

  const closeFunction = () => closePopup(popup);

  popup.classList.add('popup_is-opened');

  closeButton.addEventListener('click', closeFunction);
  document.addEventListener('keydown', keyClose);
}

function closePopup(popup) {
  const closeButton = popup.querySelector('.popup__close');

  const closeFunction = () => closePopup(popup);

  popup.classList.remove('popup_is-opened');

  closeButton.removeEventListener('click', closeFunction);
  document.removeEventListener('keydown', keyClose);
}

const closePopupByOverlay = (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.currentTarget);
  }
};
export { keyClose, openPopup, closePopup, closePopupByOverlay };
