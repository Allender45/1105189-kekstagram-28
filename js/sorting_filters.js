import {pictures} from './main.js';
import {debounce} from './utils.js';
import {renderPhotos} from './other-users-pictures.js';

const ACTIVE_CLASS = 'img-filters__button--active';
const filterForm = document.querySelector('.img-filters__form');

const filterButtons = {
  'filter-default': () => pictures.slice(),
  'filter-random': () => pictures.sort(() => Math.random() - 0.5).slice(0, 10),
  'filter-discussed': () => pictures.sort((a, b) => b.comments.length - a.comments.length)
};

const removePhotos = () => {
  const photos = document.querySelectorAll('a.picture');
  if (photos) {
    photos.forEach((el) => el.remove());
  }
};

const onFilterFormChangeActive = (evt) => {
  if (evt.target.classList.contains('img-filters__button')) {

    const activeButton = filterForm.querySelector(`.${ACTIVE_CLASS}`);
    activeButton.classList.remove(ACTIVE_CLASS);
    evt.target.classList.add(ACTIVE_CLASS);
  }
};

const onFilterFormRenderPhotos = debounce((evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    removePhotos();
    renderPhotos(filterButtons[evt.target.id]());
  }
});

filterForm.addEventListener('click', onFilterFormChangeActive);
filterForm.addEventListener('click', onFilterFormRenderPhotos);
