let timerId = null;

const refs = {
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
};

refs.buttonStart.addEventListener('click', onStartClick);
refs.buttonStop.addEventListener('click', onStopClick);

function onStartClick() {
  refs.buttonStart.setAttribute('disabled', 'disabled');  
  refs.buttonStop.removeAttribute('disabled', 'disabled');


  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopClick() {
  clearInterval(timerId);
  refs.buttonStop.setAttribute('disabled', 'disabled');  
  refs.buttonStart.removeAttribute('disabled', 'disabled');
  
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}