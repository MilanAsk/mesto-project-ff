const closeKey = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
};

function openPopup(popup) {
  popup.classList.add('popup_is-opened');

  document.addEventListener('keydown', closeKey);
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', closeKey);
}

const closePopupByOverlay = (evt) => {
  if (evt.currentTarget === evt.target || evt.target.classList.contains('popup__close')) {
    closePopup(evt.currentTarget);
  }
};
export { openPopup, closePopup, closePopupByOverlay };
