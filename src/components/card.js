function deleteCard(event) {
  event.stopPropagation();

  event.target.closest('.card').remove();
}

function likeCard(evt) {
  evt.stopPropagation();

  evt.target.classList.toggle('card__like-button_is-active');
}

function addCardEvents(
  cardNode,
  cardImage,
  imageLink,
  titleText,
  deleteCard,
  likeCard,
  openPopupImage
) {
  const deleteButton = cardNode.querySelector('.card__delete-button');
  const likeButton = cardNode.querySelector('.card__like-button');

  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', likeCard);

  cardImage.addEventListener('click', () => {
    openPopupImage(imageLink, titleText);
  });
}
function createCard(cardData, deleteCard, likeCard, openPopupImage) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardNode = cardTemplate.querySelector('.places__item.card').cloneNode(true);
  const titleNode = cardNode.querySelector('.card__title');
  const cardImage = cardNode.querySelector('.card__image');
  const titleText = cardData.name;
  const imageLink = cardData.link;

  titleNode.textContent = titleText;
  cardImage.src = imageLink;
  cardImage.alt = titleText;

  addCardEvents(cardNode, cardImage, imageLink, titleText, deleteCard, likeCard, openPopupImage);

  return cardNode;
}

export { createCard, deleteCard, likeCard };
