const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureCommentsTemplate = bigPicture.querySelector('.social__comment');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureCancel = document.querySelector('.big-picture__cancel.cancel');

const showBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  bigPictureImg.src = picture.url;
  bigPictureLikes.textContent = picture.likes;
  bigPictureCommentsCount.textContent = picture.comments.length;
  bigPictureComments.innerHTML = '';
  bigPictureDescription.textContent = picture.description;


  picture.comments.forEach((item) => {
    const comment = bigPictureCommentsTemplate.cloneNode(true);
    comment.querySelector('img').src = item.avatar;
    comment.querySelector('img').alt = item.name;
    comment.querySelector('.social__text').textContent = item.message;
    bigPictureComments.appendChild(comment);
  });

  bigPictureCancel.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
  }, { once: true });

  document.querySelector('body').addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      bigPicture.classList.add('hidden');
    }
  }, {once:true});
};

export {showBigPicture};
