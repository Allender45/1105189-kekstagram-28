import {delay} from './utils.js';
const BASE_URL = 'https://28.javascript.pages.academy/kekstagram/';
const Route = {
  GET_DATA: 'data',
  SEND_DATA: ''
};
const Method = {
  GET: 'GET',
  POST: 'POST'
};
const ErrorText = {
  GET_DATA: 'Не удалось получить данные',
  SEND_DATA: 'Не удалось отправить данные'
};


const showFetchErrorMessage = async (error) => {
  const container = document.querySelector('body');
  const template = document.querySelector('#fetch-error').content;
  const message = template.cloneNode(true);
  container.appendChild(message);
  document.querySelector('.error__title').textContent = error;
  await delay(5000);
  container.removeChild(document.querySelector('.error'));
};

const load = (route, error, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      showFetchErrorMessage(error);
    });

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (data) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, data);

export {getData, sendData};
