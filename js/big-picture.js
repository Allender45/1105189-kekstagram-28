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

const COMMENTS_COUNT = 5;
let currentComments = [];
let openCommentsCount = 0;

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
  currentComments = picture.comments.slice(0, COMMENTS_COUNT);

  bigPicture.classList.remove('hidden');
  bigPictureImg.src = picture.url;
  bigPictureLikes.textContent = picture.likes;
  bigPictureCommentsCount.textContent = picture.comments.length;
  bigPictureComments.innerHTML = '';
  bigPictureDescription.textContent = picture.description;
  bigPictureOpenCommentsCount.textContent = currentComments.length;

  renderComments(currentComments);

  if (currentComments.length < picture.comments.length) {
    bigPictureCommentsLoader.classList.remove('hidden');
  } else {
    bigPictureCommentsLoader.classList.add('hidden');
  }

  const onBigPictureLoaderClick = () => {
    bigPictureComments.innerHTML = '';
    openCommentsCount = currentComments.length + COMMENTS_COUNT > picture.comments.length ? picture.comments.length : currentComments.length + COMMENTS_COUNT;
    currentComments = picture.comments.slice(0, openCommentsCount);
    bigPictureOpenCommentsCount.textContent = currentComments.length;

    if (currentComments.length === picture.comments.length) {
      bigPictureCommentsLoader.classList.add('hidden');
    }
    renderComments(currentComments);
  };

  bigPictureCommentsLoader.addEventListener('click', onBigPictureLoaderClick);

  bigPictureCancel.addEventListener('click', () => {
    document.querySelector('.img-upload__preview img').removeAttribute('style');
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    bigPictureCommentsLoader.removeEventListener('click', onBigPictureLoaderClick);
  });

  document.querySelector('body').addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      document.querySelector('.img-upload__preview img').removeAttribute('style');
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
      bigPictureCommentsLoader.removeEventListener('click', onBigPictureLoaderClick);
    }
  });
};

export {showBigPicture};
