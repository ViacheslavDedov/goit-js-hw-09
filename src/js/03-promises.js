import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form')
formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  let {
    elements: { delay, step, amount },
  } = event.currentTarget;
  delay = Number(delay.value);
  step = Number(step.value);
  amount = Number(amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise (i, delay)
      .then(({ i, delay }) => {
        setTimeout(() => {
          Notify.success(`✅ Fulfilled promise ${i} in ${delay}ms`);
        }, delay);
    })
      .catch(({ i, delay }) => {
        setTimeout(() => {
          Notify.failure(`❌ Rejected promise ${i} in ${delay}ms`);
        }, delay);
      });
    delay += step;
  }
}

function createPromise (position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      // Fulfill
      resolve({ position, delay });
    } else {
      // Reject
      reject({ position, delay });
    }
  });
}