const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-19',
  headers: {
    authorization: 'b1fc73a0-b339-4f23-8bc6-4511c8e7234e',
    'Content-Type': 'application/json',
  },
};

const checkRes = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers,
  }).then(checkRes);
};

const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers,
  }).then(checkRes);
};

const postCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
      likes: cardData.likes.length,
    }),
    headers: config.headers,
  }).then(checkRes);
};

function renderLoading(isLoading) {
  const button = document.querySelector('.button');
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}

const saveNewAvatar = (url) => {
  renderLoading(true);
  console.log(button.textContent);
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    body: JSON.stringify({
      avatar: url,
    }),
    headers: config.headers,
  })
    .then(checkRes)
    .finally(() => {
      renderLoading(false);
    });
};

const saveUserInfo = (nameData, aboutData) => {
  fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameData,
      about: aboutData,
    }),
  }).then(checkRes);
};

export { getUserInfo, getCards, config, checkRes, postCard, saveNewAvatar, saveUserInfo };
