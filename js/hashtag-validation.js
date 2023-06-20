const uploadImgForm = document.querySelector('.img-upload__form');
const hashtagField = uploadImgForm.querySelector('.text__hashtags');
const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_SYMBOLS = 20;
let errorMessage = '';
const error = () => errorMessage;

const pristine = new Pristine(uploadImgForm,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'error_validation'
  }
);

const validateTags = (value) => {
  errorMessage = '';

  const tags = value.trim().toLowerCase();

  if (!tags) {
    return true;
  }

  const tagsArray = tags.split(/\s+/);

  if (tagsArray.length === 0) {
    return true;
  }

  const rules = [
    {
      check: tagsArray.some((item) => item.indexOf('#', 1) >= 1),
      error: 'Хэш-теги разделяются пробелами'
    },
    {
      check: tagsArray.some((item) => item[0] !== '#'),
      error: 'Хэш-тег должен начинаться с #'
    },
    {
      check: tagsArray.some((item, num, arr) => arr.includes(item, num + 1)),
      error: 'Хэш-теги не должны повторяться'
    },
    {
      check: tagsArray.some((item) => item.length > MAX_SYMBOLS),
      error: `Максимальная длинна одного Хэш-тега ${MAX_SYMBOLS} символов, включая решётку`
    },
    {
      check: tagsArray.length > MAX_HASHTAG_COUNT,
      error: `Максимальное число Хэш-тегов ${MAX_HASHTAG_COUNT}`
    },
    {
      check: tagsArray.some((item) => !VALID_SYMBOLS.test(item)),
      error: 'Хэш-тег содержит недопустимые символы'
    }
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if (isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });

};

pristine.addValidator(hashtagField, validateTags, error, 2, false);

export {pristine};
