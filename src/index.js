console.log('Hello, World!');

// index.js

import './index.css'; // добавьте импорт главного файла стилей
import { initialCards } from './cards';

const numbers = [2, 3, 5];

// Стрелочная функция. Не запнётся ли на ней Internet Explorer?
const doubledNumbers = numbers.map((number) => number * 2);

console.log(doubledNumbers); // 4, 6, 10

const mainContent = document.querySelector('.content');
// @todo: Темплейт карточки
const cardPlace = mainContent.querySelector('.places__list');

function deleteCard(event) {
  event.target.closest('.card').remove();
}

function addCardEvents(cardNode) {
  const deleteButton = cardNode.querySelector('.card__delete-button');

  deleteButton.addEventListener('click', deleteCard);
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

  addCardEvents(cardNode);

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

renderCards();

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки
