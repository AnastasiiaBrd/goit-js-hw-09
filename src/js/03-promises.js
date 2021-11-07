import Notiflix from 'notiflix';

const formEl = document.querySelector(`.form`);
const buttonEl = document.querySelector(`button`);
const inputDelay = document.querySelector(`input[name="delay"]`);
const inputStep = document.querySelector(`input[name="step"]`);
const inputAmount = document.querySelector(`input[name="amount"]`);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}

formEl.addEventListener(`submit`, onSubmit);
function onSubmit(evt) {
  evt.preventDefault();
  const step = Number(inputStep.value);
  const delay = Number(inputDelay.value);
  const amount = Number(inputAmount.value);
  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay + i * step);
  }
}
