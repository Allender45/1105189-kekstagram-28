import {sendData} from './api.js';
import {showSuccessMessage} from './success-send-form.js';
import {pristine} from './hashtag-validation.js';

const uploadImgForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const hashtagField = uploadImgForm.querySelector('.text__hashtags');
const commentField = uploadImgForm.querySelector('.text__description');
const imgPreview = uploadImgForm.querySelector('.img-upload__preview img');
const sliderContainer = uploadImgForm.querySelector('.img-upload__effect-level.effect-level');

const hideModal = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadImgForm.reset();
  pristine.reset();
  imgPreview.style.transform = 'scale(1)';
  imgPreview.removeAttribute('style');
  sliderContainer.classList.add('hidden');
};

const onFormEscHandler = (evt) => {
  if (!document.querySelector('.error')) {
    if (evt.key === 'Escape') {
      if (!(document.activeElement === hashtagField ||
        document.activeElement === commentField)) {
        hideModal();
      }
    }
  }
};

const onUploadImgFormHandler = (evt) => {
  evt.preventDefault();

  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.querySelector('.img-upload__cancel.cancel').addEventListener('click', () => {
    hideModal();
  });

  document.addEventListener('keydown', onFormEscHandler);

  const preview = uploadImgForm.querySelector('.img-upload__preview img');
  const file = uploadImgForm.querySelector('#upload-file').files[0];
  const fileName = file.name.toLowerCase();
  const FILE_TYPES = ['jpg', 'jpeg', 'png'];

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};

uploadImgForm.addEventListener('input', onUploadImgFormHandler);

const onSuccess = () => {
  hideModal();
  imgPreview.removeAttribute('style');
  showSuccessMessage();
};

const onError = () => {
  const container = document.querySelector('body');
  const template = document.querySelector('#error').content;
  const message = template.cloneNode(true);
  container.appendChild(message);

  function onFormSendErrorEscHandler(evt){
    if (evt.key === 'Escape') {
      container.querySelector('.error').remove();
      document.removeEventListener('click', onFormSendErrorHandler);
    }
  }

  function onFormSendErrorHandler(evt){
    if (evt.target === document.querySelector('.error__button') || evt.target !== document.querySelector('.error__inner')) {
      container.querySelector('.error').remove();
      document.removeEventListener('keydown', onFormSendErrorEscHandler);
    }
  }

  document.querySelector('.error').addEventListener('click', onFormSendErrorHandler);

  document.addEventListener('keydown', onFormSendErrorEscHandler);
};

const onFormSubmitHandler = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    sendData(onSuccess, onError, new FormData(evt.target));
  }
};

uploadImgForm.addEventListener('submit', onFormSubmitHandler);
