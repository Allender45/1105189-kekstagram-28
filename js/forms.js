import {sendData} from './api.js';
import {showSuccessMessage} from './success-send-form.js';

const uploadImgForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const hashtagField = uploadImgForm.querySelector('.text__hashtags');
const commentField = uploadImgForm.querySelector('.text__description');
const scaleControlSmaller = uploadImgForm.querySelector('.scale__control--smaller');
const scaleControlBigger = uploadImgForm.querySelector('.scale__control--bigger');
const scaleControlValue = uploadImgForm.querySelector('.scale__control--value');
const imgPreview = uploadImgForm.querySelector('.img-upload__preview img');

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const TAG_ERROR_TEXT = 'Ошибка валидации';
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
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
  }, {once:true});

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
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
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

const scaleValueSmallerHandler = () => {
  let scaleValue = parseInt(scaleControlValue.value, 10);
  if (scaleValue < 50) {
    scaleValue = MIN_SCALE_VALUE;
  } else {
    scaleValue -= 25;
  }
  scaleControlValue.value = `${scaleValue}%`;
  imgPreview.style.transform = `scale(0.${scaleValue})`;
};

const scaleValueBiggerHandler = () => {
  let scaleValue = parseInt(scaleControlValue.value, 10);
  if (scaleValue > 75) {
    scaleValue = MAX_SCALE_VALUE;
  } else {
    scaleValue += 25;
  }
  scaleControlValue.value = `${scaleValue}%`;
  if (scaleValue === MAX_SCALE_VALUE) {
    imgPreview.style.transform = 'scale(1)';
  } else {
    imgPreview.style.transform = `scale(0.${scaleValue})`;
  }
};

scaleControlSmaller.addEventListener('click', scaleValueSmallerHandler);
scaleControlBigger.addEventListener('click', scaleValueBiggerHandler);

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

document.querySelector('.effects').addEventListener('change', (evt) => {
  if (evt.target.classList.contains('effects__preview--none')) {
    sliderContainer.classList.add('hidden');
    imgPreview.removeAttribute('style');
  }

  if (evt.target.classList.contains('effects__preview--chrome')) {
    slider.noUiSlider.updateOptions(
      {
        range: {
          min: 0,
          max: 1
        },
        step: 0.1,
        start: 1
      }
    );
    imgPreview.style.filter = `grayscale(${slider.noUiSlider.get()})`;
    slider.noUiSlider.on('slide', () => {
      imgPreview.style.filter = `grayscale(${slider.noUiSlider.get()})`;
    });
    sliderContainer.classList.remove('hidden');
  }

  if (evt.target.classList.contains('effects__preview--sepia')) {
    slider.noUiSlider.updateOptions(
      {
        range: {
          min: 0,
          max: 1
        },
        step: 0.1,
        start: 1
      }
    );
    imgPreview.style.filter = `sepia(${slider.noUiSlider.get()})`;
    slider.noUiSlider.on('slide', () => {
      imgPreview.style.filter = `sepia(${slider.noUiSlider.get()})`;
    });
    sliderContainer.classList.remove('hidden');
  }

  if (evt.target.classList.contains('effects__preview--marvin')) {
    slider.noUiSlider.updateOptions(
      {
        range: {
          min: 0,
          max: 100
        },
        step: 1,
        start: 100
      }
    );
    imgPreview.style.filter = `invert(${slider.noUiSlider.get()}%)`;
    slider.noUiSlider.on('slide', () => {
      imgPreview.style.filter = `invert(${slider.noUiSlider.get()}%)`;
    });
    sliderContainer.classList.remove('hidden');
  }

  if (evt.target.classList.contains('effects__preview--phobos')) {
    slider.noUiSlider.updateOptions(
      {
        range: {
          min: 0,
          max: 3
        },
        step: 0.1,
        start: 3
      }
    );
    imgPreview.style.filter = `blur(${slider.noUiSlider.get()}px)`;
    slider.noUiSlider.on('slide', () => {
      imgPreview.style.filter = `blur(${slider.noUiSlider.get()}px)`;
    });
    sliderContainer.classList.remove('hidden');
  }

  if (evt.target.classList.contains('effects__preview--heat')) {
    slider.noUiSlider.updateOptions(
      {
        range: {
          min: 1,
          max: 3
        },
        step: 0.1,
        start: 3
      }
    );
    imgPreview.style.filter = `brightness(${slider.noUiSlider.get()})`;
    slider.noUiSlider.on('slide', () => {
      imgPreview.style.filter = `brightness(${slider.noUiSlider.get()})`;
    });
    sliderContainer.classList.remove('hidden');
  }
});
