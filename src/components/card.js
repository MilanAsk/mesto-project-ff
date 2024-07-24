import { initialCards } from '../cards';
import { cardPlace, popupImage } from '../index';
import { openPopup, closePopup } from './modal';

function deleteCard(event) {
  event.stopPropagation();

  event.target.closest('.card').remove();
}

function likeCard(evt) {
  evt.stopPropagation();

  evt.target.classList.toggle('card__like-button_is-active');
}

function addCardEvents(cardNode, cardImage, imageLink, titleText) {
  const deleteButton = cardNode.querySelector('.card__delete-button');
  const likeButton = cardNode.querySelector('.card__like-button');

  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', likeCard);

  cardImage.addEventListener('click', () => {
    const popupImageUrl = popupImage.querySelector('.popup__image');
    const popupImageText = popupImage.querySelector('.popup__caption');

    popupImageUrl.src = imageLink;
    popupImageText.textContent = titleText;

    openPopup(popupImage);
  });
}

function createCard(cardData) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardNode = cardTemplate.querySelector('.places__item.card').cloneNode(true);
  const titleNode = cardNode.querySelector('.card__title');
  const cardImage = cardNode.querySelector('.card__image');
  const titleText = cardData.name;
  const imageLink = cardData.link;

  titleNode.textContent = titleText;
  cardImage.src = imageLink;
  cardImage.alt = titleText;

  addCardEvents(cardNode, cardImage, imageLink, titleText);

  return cardNode;
}

function renderCards() {
  const container = document.createDocumentFragment();

  initialCards.forEach((element) => {
    const card = createCard(element);
    container.append(card);
  });

  cardPlace.append(container);
}

export { deleteCard, likeCard, addCardEvents, createCard, renderCards };
