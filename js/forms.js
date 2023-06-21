import {sendData} from './api.js';
import {showSuccessMessage} from './success-send-form.js';
import {pristine} from './hashtag-validation.js';

const uploadImgForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const hashtagField = uploadImgForm.querySelector('.text__hashtags');
const commentField = uploadImgForm.querySelector('.text__description');
const scaleControl = uploadImgForm.querySelector('.img-upload__scale');
const scaleControlValue = uploadImgForm.querySelector('.scale__control--value');
const imgPreview = uploadImgForm.querySelector('.img-upload__preview img');
const sliderContainer = uploadImgForm.querySelector('.img-upload__effect-level.effect-level');
const slider = uploadImgForm.querySelector('.effect-level__slider');

const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_VALUE_STEP = 25;

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

uploadImgForm.addEventListener('input', (evt) => {
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
});

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

  const onFormSendErrorEscHandler = (evt) => {
    if (evt.key === 'Escape') {
      container.querySelector('.error').remove();
    }
  };

  document.addEventListener('click', (evt) => {
    if (evt.target === document.querySelector('.error__button') || evt.target !== document.querySelector('.error__inner')) {
      container.querySelector('.error').remove();
    }
  }, {once: true});

  document.addEventListener('keydown', onFormSendErrorEscHandler);
};

const onFormSubmitHandler = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    sendData(onSuccess, onError, new FormData(evt.target));
  }
};

uploadImgForm.addEventListener('submit', onFormSubmitHandler);

const valueChange = (mod = 1) => {
  const inputValue = parseInt(scaleControlValue.value, 10);
  let newValue = inputValue + SCALE_VALUE_STEP * mod;

  if (newValue >= MAX_SCALE_VALUE) {
    newValue = MAX_SCALE_VALUE;
  }
  if (newValue <= MIN_SCALE_VALUE) {
    newValue = MIN_SCALE_VALUE;
  }
  imgPreview.style.transform = `scale(${newValue * 0.01})`;
  scaleControlValue.value = `${newValue}%`;
};

const imageScaleValueHandler = (evt) => evt.target.classList.contains('scale__control--smaller') ? valueChange(-1) : valueChange();

scaleControl.addEventListener('click', imageScaleValueHandler);

noUiSlider.create(slider, {
  start: 20,
  step: 1,
  connect: true,
  range: {
    'min': 1,
    'max': 100
  }
});

sliderContainer.classList.add('hidden');

const FILTER_EFFECTS = {
  'effects__preview--none': () => imgPreview.removeAttribute('style'),
  'effects__preview--chrome': {
    'options': {
      range: {min: 0, max: 1},
      step: 0.1,
      start: 1
    },
    'filter': 'grayscale',
    'piece': ''
  },
  'effects__preview--sepia': {
    'options': {
      range: {min: 0, max: 1},
      step: 0.1,
      start: 1
    },
    'filter': 'sepia',
    'piece': ''
  },
  'effects__preview--marvin': {
    'options': {
      range: {min: 0, max: 100},
      step: 1,
      start: 100
    },
    'filter': 'invert',
    'piece': '%'
  },
  'effects__preview--phobos': {
    'options': {
      range: {min: 0, max: 3},
      step: 0.1,
      start: 3
    },
    'filter': 'blur',
    'piece': 'px'
  },
  'effects__preview--heat': {
    'options': {
      range: {min: 1, max: 3},
      step: 0.1,
      start: 3
    },
    'filter': 'brightness',
    'piece': ''
  }
};

const addFilterEffects = (effect) => {
  slider.noUiSlider.updateOptions(effect['options']);
  imgPreview.style.filter = `${effect['filter']}(${slider.noUiSlider.get()})`;
  slider.noUiSlider.on('slide', () => {
    imgPreview.style.filter = `${effect['filter']}(${slider.noUiSlider.get()}${effect['piece']})`;
  });
  sliderContainer.classList.remove('hidden');
};

document.querySelector('.effects__list').addEventListener('click', (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    if (evt.target.classList[2] === 'effects__preview--none') {
      sliderContainer.classList.add('hidden');
      imgPreview.removeAttribute('style');
    } else {
      addFilterEffects(FILTER_EFFECTS[evt.target.classList[2]]);
    }
  }
});
