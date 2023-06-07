const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureOpenCommentsCount = bigPicture.querySelector('.open-comments-count');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureCommentsTemplate = bigPicture.querySelector('.social__comment');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureCancel = document.querySelector('.big-picture__cancel.cancel');
const bigPictureCommentsLoader = document.querySelector('.comments-loader');

const renderComments = (array) => {
  array.forEach((item) => {
    const comment = bigPictureCommentsTemplate.cloneNode(true);
    comment.querySelector('img').src = item.avatar;
    comment.querySelector('img').alt = item.name;
    comment.querySelector('.social__text').textContent = item.message;
    bigPictureComments.appendChild(comment);
  });
};

const showBigPicture = (picture) => {
  let openCommentsCount = 5;
  bigPicture.classList.remove('hidden');
  bigPictureImg.src = picture.url;
  bigPictureLikes.textContent = picture.likes;
  bigPictureCommentsCount.textContent = picture.comments.length;
  bigPictureComments.innerHTML = '';
  bigPictureDescription.textContent = picture.description;

  renderComments(picture.comments.slice(0, openCommentsCount));

  if (openCommentsCount >= picture.comments.length) {
    bigPictureCommentsLoader.classList.add('hidden');
  } else {
    bigPictureCommentsLoader.addEventListener('click', () => {
      renderComments(picture.comments.slice(openCommentsCount, openCommentsCount += 5));
      bigPictureOpenCommentsCount.textContent = openCommentsCount;
      if (openCommentsCount >= picture.comments.length) {
        bigPictureOpenCommentsCount.textContent = picture.comments.length;
        openCommentsCount = 5;
        bigPictureCommentsLoader.classList.add('hidden');
      }
    });
  }
};

bigPictureCancel.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
});

document.querySelector('body').addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
  }
});

export {showBigPicture};
