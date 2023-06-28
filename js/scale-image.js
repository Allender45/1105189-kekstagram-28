const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_VALUE_STEP = 25;

const uploadImgForm = document.querySelector('.img-upload__form');
const imgPreview = uploadImgForm.querySelector('.img-upload__preview img');
const scaleControl = uploadImgForm.querySelector('.img-upload__scale');
const scaleControlValue = uploadImgForm.querySelector('.scale__control--value');

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
