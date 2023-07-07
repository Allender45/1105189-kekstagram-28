const Urls = {
  GET: 'https://28.javascript.pages.academy/kekstagram/data',
  POST: 'https://28.javascript.pages.academy/kekstagram/'
};

const load = (onSuccess, onError, method = 'GET', body = null) =>
  fetch(Urls[method], {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    }).then((data) => onSuccess(data))
    .catch(() => {
      onError('Ошибка загрузки');
    });

const getData = (onSuccess, onError) => load(onSuccess, onError);

const sendData = (onSuccess, onError, data) => load(onSuccess, onError,'POST', data);

export {getData, sendData, load};
