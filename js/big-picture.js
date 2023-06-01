const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureComments = bigPicture.querySelector('.social__comments');

const showBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  bigPictureImg.src = picture.url;
  bigPictureLikes.textContent = picture.likes;
  bigPictureCommentsCount.textContent = picture.comments.length;
  bigPictureComments.innerHTML = '';
};

export {showBigPicture};
