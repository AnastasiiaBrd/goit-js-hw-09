const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

buttonStop.disabled = true;

buttonStart.addEventListener('click', () => {
  bodyEl.style.background = getRandomHexColor();
  buttonStart.disabled = true;
  buttonStop.disabled = false;
  timerId = setInterval(() => {
    bodyEl.style.background = getRandomHexColor();
  }, 1000);
});

buttonStop.addEventListener('click', () => {
  buttonStart.disabled = false;
  buttonStop.disabled = true;
  clearInterval(timerId);
});
