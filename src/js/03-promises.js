import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  // delay: document.querySelector('input[name="delay"]'),
  // step: document.querySelector('input[name="step"]'),
  // amount: document.querySelector('input[name="amount"]'),
  form: document.querySelector('.form'),
};
refs.form.addEventListener('submit', onSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
      } else {
        reject({ position: position, delay: delay });
      }
    }, delay);
  });
}

function onSubmit(event) {
  event.preventDefault();
  const incomingValues = {
    delay: parseInt(event.currentTarget.delay.value),
    step: parseInt(event.currentTarget.step.value),
    amount: parseInt(event.currentTarget.amount.value),
  };
  creareNewPromise(incomingValues);
}

function creareNewPromise({ delay, step, amount }) {
  let totalDelay = delay;
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, totalDelay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    totalDelay += step;
  }
}
