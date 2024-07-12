const mainContent = document.querySelector('.content');
// @todo: Темплейт карточки
const cardPlace = mainContent.querySelector('.places__list');

function deleteCard(event) {
  event.target.closest('.card').remove();
}

function addCard(title, url) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardNode = cardTemplate.querySelector('.places__item.card').cloneNode(true);
  const titleNode = cardNode.querySelector('.card__title');
  const cardImage = cardNode.querySelector('.card__image');

  titleNode.textContent = title;
  cardImage.src = url;
  cardImage.alt = 'тут должна быть прекрасная картина';

  const deleteButton = cardNode.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);
  cardPlace.append(cardNode);
}

function addCardAll() {
  for (let i = 0; i < initialCards.length; i++) {
    addCard(initialCards[i].name, initialCards[i].link);
  }
}
addCardAll(deleteCard);

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
// const deleteButton = mainContent.querySelector('.card__delete-button');
// deleteButton.addEventListener('click', function (event) {
//   const eventTarget = event.target.closest('.card').remove();
// });
