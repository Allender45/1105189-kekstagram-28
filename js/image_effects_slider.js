const uploadImgForm = document.querySelector('.img-upload__form');
const slider = uploadImgForm.querySelector('.effect-level__slider');
const sliderContainer = uploadImgForm.querySelector('.img-upload__effect-level.effect-level');
const imgPreview = uploadImgForm.querySelector('.img-upload__preview img');

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

const onEffectListHandler = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    if (evt.target.classList[2] === 'effects__preview--none') {
      sliderContainer.classList.add('hidden');
      imgPreview.removeAttribute('style');
    } else {
      addFilterEffects(FILTER_EFFECTS[evt.target.classList[2]]);
    }
  }
};

document.querySelector('.effects__list').addEventListener('click', onEffectListHandler);
