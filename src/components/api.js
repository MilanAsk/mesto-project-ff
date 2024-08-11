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

const saveUserInfo = (nameData, aboutData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameData,
      about: aboutData,
    }),
  }).then(checkRes);
};

function putLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers,
  }).then(checkRes);
}

function deleteLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(checkRes);
}

function deleteCardOnServer(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(checkRes);
}

export {
  getUserInfo,
  getCards,
  config,
  checkRes,
  postCard,
  saveNewAvatar,
  saveUserInfo,
  putLike,
  deleteLike,
  deleteCardOnServer,
};
