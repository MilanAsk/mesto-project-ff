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

const saveNewAvatar = (url) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    body: JSON.stringify({
      avatar: url,
    }),
    headers: config.headers,
  }).then(checkRes);
};

export { getUserInfo, getCards, config, checkRes, postCard, saveNewAvatar };
