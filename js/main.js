import {renderPhotos} from './other-users-pictures.js';
import './image-preview-form.js';
import {getData} from './api.js';
import './sorting-filters.js';
import './scale-image.js';
import './image-effects-slider.js';

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
