import { config, checkRes } from './api';

function deleteCard(evt, id) {
  evt.stopPropagation();

  evt.target.closest('.card').remove();

  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(checkRes);
}

function likeCard(evt, id) {
  evt.stopPropagation();

  const card = evt.target.closest('.card');
  const likeCounter = card.querySelector('.card__like-counter');

  if (!evt.target.classList.contains('card__like-button_is-active')) {
    evt.target.classList.add('card__like-button_is-active');
    console.log(evt.target, 'сюда я нажал');
    console.log(id, 'на эту карточку');
    fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: config.headers,
    })
      .then(checkRes)
      .then((data) => {
        likeCounter.textContent = data.likes.length;
      });
  } else {
    evt.target.classList.remove('card__like-button_is-active');

    fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: config.headers,
    })
      .then(checkRes)
      .then((data) => {
        likeCounter.textContent = data.likes.length;
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
function createCard(cardData, deleteCard, likeCard, openPopupImage, cardId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardNode = cardTemplate.querySelector('.places__item.card').cloneNode(true);
  const titleNode = cardNode.querySelector('.card__title');
  const cardImage = cardNode.querySelector('.card__image');
  const likeCounter = cardNode.querySelector('.card__like-counter');
  const titleText = cardData.name;
  const imageLink = cardData.link;
  const cardLikes = cardData.likes.length;

  titleNode.textContent = titleText;
  cardImage.src = imageLink;
  cardImage.alt = titleText;
  likeCounter.textContent = cardLikes;

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
