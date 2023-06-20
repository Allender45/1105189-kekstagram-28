import {renderPhotos} from './other-users-pictures.js';
import './forms.js';
import {getData} from './api.js';
import './filters.js';

let pictures = [];
const ERROR_DELAY = 5000;

const onSuccess = (data) => {
  pictures = data.slice();
  renderPhotos(pictures);
  const filters = document.querySelectorAll('.img-filters__button');
  filters.forEach((filter) => {
    filter.classList.remove('visually-hidden');
  });
};

const onError = (errorText) => {
  const container = document.querySelector('body');
  const template = document.querySelector('#fetch-error').content;
  const message = template.cloneNode(true);
  container.appendChild(message);
  document.querySelector('.error__title').textContent = errorText;

  setTimeout(() => {
    container.querySelector('.error').remove();
  }, ERROR_DELAY);
};

getData(onSuccess, onError);

export {onSuccess, onError, pictures};
