const container = document.querySelector('body');
const template = document.querySelector('#success').content;

const showSuccessMessage = () => {
  const message = template.cloneNode(true);
  container.appendChild(message);
  const successButton = document.querySelector('.success__button');

  successButton.addEventListener('click', () => {
    document.querySelector('.success').remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      document.querySelector('.success').remove();
    }
  }, {once:true});

  window.addEventListener('click', (evt) => {
    if(evt.target !== message){
      if (document.querySelector('.success')) {
        document.querySelector('.success').remove();
      }
    }
  }, {once:true});
};

export {showSuccessMessage};
