import {getData} from './api.js';

const container = document.querySelector('.pictures.container');
const template = document.querySelector('#picture').content;
const otherUsersPhotoFragment = document.createDocumentFragment();
let timerIndex;

const generateOtherUsersPhoto = (array) => {
  array.forEach(({url, comments, likes}) => {
    const picture = template.cloneNode(true);
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.querySelector('.picture__likes').textContent = likes;
    otherUsersPhotoFragment.appendChild(picture);
    container.appendChild(otherUsersPhotoFragment);
  });
};

getData().then((data) => generateOtherUsersPhoto(data)).then(() => {
  container.onclick = function(evt) {
    if (evt.target.className === 'picture__img') {
      document.querySelector('.big-picture').classList.remove('hidden');
    }
  };
});

const defaultFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');

defaultFilter.addEventListener('click', () => {
  const dataPhoto = [];
  clearTimeout(timerIndex);

  timerIndex = setTimeout(() => {
    getData().then((data) => {
      dataPhoto.push(...data);
    }).then(() => {
      container.querySelectorAll('a.picture').forEach((el) => el.remove());
      generateOtherUsersPhoto(dataPhoto);
    }).then(() => {
      container.onclick = (evt) => {
        if (evt.target.className === 'picture') {
          evt.target.addEventListener('click', () => {
            document.querySelector('.big-picture').classList.remove('hidden');
          });
        }
      };
    });
  }, 500);

  defaultFilter.classList.add('img-filters__button--active');
  randomFilter.classList.remove('img-filters__button--active');
  discussedFilter.classList.remove('img-filters__button--active');
});

randomFilter.addEventListener('click', () => {
  let dataPhoto = [];
  clearTimeout(timerIndex);

  timerIndex = setTimeout(() => {
    getData().then((data) => {
      dataPhoto = [...data].sort(() => Math.random() - 0.5).slice(0, 10);

    }).then(() => {
      container.querySelectorAll('a.picture').forEach((el) => el.remove());
      generateOtherUsersPhoto(dataPhoto);
    });
  }, 500);

  defaultFilter.classList.remove('img-filters__button--active');
  randomFilter.classList.add('img-filters__button--active');
  discussedFilter.classList.remove('img-filters__button--active');
});

discussedFilter.addEventListener('click', () => {
  const dataPhoto = [];
  clearTimeout(timerIndex);

  timerIndex = setTimeout(() => {
    getData().then((data) => {
      dataPhoto.push(...data);
      dataPhoto.sort((a, b) => b.comments.length - a.comments.length);
    }).then(() => {
      container.querySelectorAll('a.picture').forEach((el) => el.remove());
      generateOtherUsersPhoto(dataPhoto);
    });
  }, 500);

  defaultFilter.classList.remove('img-filters__button--active');
  randomFilter.classList.remove('img-filters__button--active');
  discussedFilter.classList.add('img-filters__button--active');
});
