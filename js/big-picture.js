import {getObjects} from './get-objects.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureOpenCommentsCount = bigPicture.querySelector('.open-comments-count');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureCommentsTemplate = bigPicture.querySelector('.social__comment');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const documentBody = document.querySelector('body');
const smallPictures = document.querySelectorAll('.picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel.cancel');
const moreCommentsButton = bigPicture.querySelector('.social__comments-loader.comments-loader');

for (let i = 0; i < smallPictures.length; i++) {
  smallPictures[i].addEventListener('click', () => {
    bigPicture.classList.remove('hidden');
    bigPictureImg.src = getObjects[i].url;
    bigPictureLikes.textContent = getObjects[i].likes;
    bigPictureCommentsCount.textContent = getObjects[i].comments.length;
    bigPictureComments.innerHTML = '';

    const commentsPerClick = 5;
    let commentsIterationCount = 0;

    for (let x = 0; x < getObjects[i].comments.length && x < commentsPerClick; x++) {
      const comment = bigPictureCommentsTemplate.cloneNode(true);
      comment.querySelector('img').src = getObjects[i].comments[x].avatar;
      comment.querySelector('img').alt = getObjects[i].comments[x].name;
      comment.querySelector('.social__text').textContent = getObjects[i].comments[x].message;
      bigPictureComments.appendChild(comment);
      commentsIterationCount += 1;
    }

    bigPictureOpenCommentsCount.textContent = commentsIterationCount;
    bigPictureDescription.textContent = getObjects[i].description;
    documentBody.classList.add('modal-open');

    bigPictureCancel.addEventListener('click', () => {
      bigPicture.classList.add('hidden');
      documentBody.classList.remove('modal-open');
    });

    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        bigPicture.classList.add('hidden');
        documentBody.classList.remove('modal-open');
      }
    });


    moreCommentsButton.addEventListener('click', () => {
      for (let y = 0; y < commentsPerClick && commentsIterationCount < getObjects[i].comments.length; y++) {
        const comment = bigPictureCommentsTemplate.cloneNode(true);
        comment.querySelector('img').src = getObjects[i].comments[commentsIterationCount].avatar;
        comment.querySelector('img').alt = getObjects[i].comments[commentsIterationCount].name;
        comment.querySelector('.social__text').textContent = getObjects[i].comments[commentsIterationCount].message;
        bigPictureComments.appendChild(comment);
        commentsIterationCount += 1;
        if (commentsIterationCount === getObjects[i].comments.length) {
          moreCommentsButton.classList.add('hidden');
        }
        bigPictureOpenCommentsCount.textContent = commentsIterationCount;
      }
    });
  });
}
