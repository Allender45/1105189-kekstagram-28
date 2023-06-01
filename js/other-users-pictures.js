import {showBigPicture} from './big-picture.js';
import {getData, load} from './api.js';
import {onSuccess, onError} from './main.js';

const container = document.querySelector('.pictures.container');
const template = document.querySelector('#picture').content;
const otherUsersPhotoFragment = document.createDocumentFragment();
let pictures = [];

const renderPhoto = (image) => {
  const picture = template.cloneNode(true);
  picture.querySelector('.picture__img').src = image.url;
  picture.querySelector('.picture__comments').textContent = image.comments.length;
  picture.querySelector('.picture__likes').textContent = image.likes;
  picture.querySelector('.picture__img').addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPicture(image);
  });
  return picture;
};

const renderPhotos = (array) => {
  array.forEach((photo) => {
    otherUsersPhotoFragment.appendChild(renderPhoto(photo));
  });
  container.appendChild(otherUsersPhotoFragment);
};

const defaultFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');

defaultFilter.addEventListener('click', () => {
  defaultFilter.classList.add('img-filters__button--active');
  randomFilter.classList.remove('img-filters__button--active');
  discussedFilter.classList.remove('img-filters__button--active');

  setTimeout(() => {
    document.querySelectorAll('a.picture').forEach((el) => el.remove());
    getData(onSuccess, onError);
  }, 500);
});

randomFilter.addEventListener('click', () => {
  defaultFilter.classList.remove('img-filters__button--active');
  randomFilter.classList.add('img-filters__button--active');
  discussedFilter.classList.remove('img-filters__button--active');

  setTimeout(() => {
    document.querySelectorAll('a.picture').forEach((el) => el.remove());
    const onSuccess1 = (data) => {
      pictures = data.slice();
      pictures = [...data].sort(() => Math.random() - 0.5).slice(0, 10);
      renderPhotos(pictures);
    };

    load(onSuccess1, onError);
  }, 500);
});

discussedFilter.addEventListener('click', () => {
  defaultFilter.classList.remove('img-filters__button--active');
  randomFilter.classList.remove('img-filters__button--active');
  discussedFilter.classList.add('img-filters__button--active');
  setTimeout(() => {
    document.querySelectorAll('a.picture').forEach((el) => el.remove());

    const onSuccess2 = (data) => {
      pictures = data.slice();
      pictures.sort((a, b) => b.comments.length - a.comments.length);
      renderPhotos(pictures);
    };

    load(onSuccess2, onError);
  }, 500);
});

export {renderPhotos};
