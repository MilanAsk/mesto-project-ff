import { deleteCardOnServer, putLike, deleteLike } from './api';

function deleteCard(evt, id) {
  evt.stopPropagation();
  deleteCardOnServer(id)
    .then(() => {
      evt.target.closest('.card').remove();
    })
    .catch((err) => {
      console.log('Произошла ошибка:', err);
    });
}

function likeCard(evt, id) {
  evt.stopPropagation();

  const card = evt.target.closest('.card');
  const likeCounter = card.querySelector('.card__like-counter');

  // handleLike(evt, card, id);
  if (!evt.target.classList.contains('card__like-button_is-active')) {
    putLike(id)
      .then((data) => {
        evt.target.classList.add('card__like-button_is-active');
        likeCounter.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log('Произошла ошибка:', err);
      });
  } else {
    deleteLike(id)
      .then((data) => {
        evt.target.classList.remove('card__like-button_is-active');
        likeCounter.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log('Произошла ошибка:', err);
      });
  }
}

function addCardEvents(
  cardNode,
  cardImage,
  imageLink,
  titleText,
  deleteCard,
  likeCard,
  openPopupImage,
  cardId
) {
  const deleteButton = cardNode.querySelector('.card__delete-button');
  const likeButton = cardNode.querySelector('.card__like-button');

  deleteButton.addEventListener('click', (evt) => deleteCard(evt, cardId));
  likeButton.addEventListener('click', (evt) => likeCard(evt, cardId));

  cardImage.addEventListener('click', () => {
    openPopupImage(imageLink, titleText);
  });
}
function createCard(cardData, deleteCard, likeCard, openPopupImage, cardId, ownerId, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardNode = cardTemplate.querySelector('.places__item.card').cloneNode(true);
  const titleNode = cardNode.querySelector('.card__title');
  const cardImage = cardNode.querySelector('.card__image');
  const likeCounter = cardNode.querySelector('.card__like-counter');
  const deleteButton = cardNode.querySelector('.card__delete-button');

  const titleText = cardData.name;
  const imageLink = cardData.link;
  const cardLikes = cardData.likes.length;

  titleNode.textContent = titleText;
  cardImage.src = imageLink;
  cardImage.alt = titleText;
  likeCounter.textContent = cardLikes;

  if (ownerId !== userId) {
    deleteButton.style.cssText = 'display: none';
  }

  addCardEvents(
    cardNode,
    cardImage,
    imageLink,
    titleText,
    deleteCard,
    likeCard,
    openPopupImage,
    cardId
  );

  return cardNode;
}

export { createCard, deleteCard, likeCard };
