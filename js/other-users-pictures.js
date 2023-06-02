import {showBigPicture} from './big-picture.js';

const container = document.querySelector('.pictures.container');
const template = document.querySelector('#picture').content;
const otherUsersPhotoFragment = document.createDocumentFragment();

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

export {renderPhotos};
