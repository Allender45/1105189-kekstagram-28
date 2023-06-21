const container = document.querySelector('body');
const template = document.querySelector('#success').content;

const showSuccessMessage = () => {
  const message = template.cloneNode(true);
  container.appendChild(message);
  const successButton = document.querySelector('.success__button');

  const onSuccessButtonHandler = () => {
    document.querySelector('.success').remove();
  };
  const onSuccessButtonEscHandler = (evt) => {
    if (evt.key === 'Escape') {
      document.querySelector('.success').remove();
    }
  };
  const onSuccessButtonExtHandler = (evt) => {
    if(evt.target !== message){
      if (document.querySelector('.success')) {
        document.querySelector('.success').remove();
      }
    }
  };

  successButton.addEventListener('click', onSuccessButtonHandler);
  document.addEventListener('keydown', onSuccessButtonEscHandler, {once:true});
  document.addEventListener('click', onSuccessButtonExtHandler, {once:true});
};

export {showSuccessMessage};
