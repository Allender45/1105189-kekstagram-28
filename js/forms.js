import {sendData} from './api.js';
import {showSuccessMessage} from './success-send-form.js';

const uploadImgForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const hashtagField = uploadImgForm.querySelector('.text__hashtags');
const commentField = uploadImgForm.querySelector('.text__description');
const scaleControl = uploadImgForm.querySelector('.img-upload__scale');
const scaleControlValue = uploadImgForm.querySelector('.scale__control--value');
const imgPreview = uploadImgForm.querySelector('.img-upload__preview img');

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const TAG_ERROR_TEXT = 'Ошибка валидации';
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_VALUE_STEP = 25;
const pristine = new Pristine(uploadImgForm,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'span',
    errorTextClass: 'error_validation'
  }
);
const hideModal = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadImgForm.reset();
  pristine.reset();
  imgPreview.style.transform = 'scale(1)';
};

uploadImgForm.addEventListener('input', (evt) => {
  evt.preventDefault();

  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.querySelector('.img-upload__cancel.cancel').addEventListener('click', () => {
    hideModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!(document.activeElement === hashtagField ||
        document.activeElement === commentField)) {
        hideModal();
      }
    }
  }, {once: true});

  const preview = uploadImgForm.querySelector('.img-upload__preview img');
  const file = uploadImgForm.querySelector('#upload-file').files[0];
  const fileName = file.name.toLowerCase();
  const FILE_TYPES = ['jpg', 'jpeg', 'png'];

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});

const isValidTag = (tag) => VALID_SYMBOLS.test(tag);

const hasValidCount = (value) => value.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value.trim().split(/\s+/);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  hashtagField,
  validateTags,
  TAG_ERROR_TEXT
);

const onFormSubmitHandler = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    sendData(new FormData(evt.target));
    hideModal();
    imgPreview.removeAttribute('style');
    showSuccessMessage();
  }
};

uploadImgForm.addEventListener('submit', onFormSubmitHandler);

const valueChange = (mod = 1) => {
  scaleControlValue.value = `${parseInt(scaleControlValue.value) + SCALE_VALUE_STEP * mod}%`;
  imgPreview.style.transform = `scale(0.${parseInt(scaleControlValue.value)})`;
  if(parseInt(scaleControlValue.value) >= MAX_SCALE_VALUE){
    scaleControlValue.value = `${MAX_SCALE_VALUE}%`;
    imgPreview.style.transform = 'scale(1)';
  }
  if(parseInt(scaleControlValue.value) <= MIN_SCALE_VALUE){
    scaleControlValue.value = `${MIN_SCALE_VALUE}%`;
    imgPreview.style.transform = `scale(0.${MIN_SCALE_VALUE})`;
  }
};

const imageScaleValueHandler = (evt) => {
  if(evt.target.classList.contains('scale__control--smaller')){
    valueChange(-1);
  } else {
    valueChange();
  }
};

scaleControl.addEventListener('click', imageScaleValueHandler);

const sliderContainer = uploadImgForm.querySelector('.img-upload__effect-level.effect-level');
const slider = uploadImgForm.querySelector('.effect-level__slider');

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
