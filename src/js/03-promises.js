import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', startCreatingFn);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delay})
      } else {
        reject({position, delay})
      };
    }, delay);
    
  });

};

function startCreatingFn(evt) {
  evt.preventDefault();
  const {elements: {delay, step, amount}} = evt.currentTarget
  let delayTime = Number(delay.value);
  
  for(let i = 1; i <= Number(amount.value); i += 1) {
    createPromise(i, delayTime)
    .then(({position, delay }) => {
      Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`Rejected promise ${position} in ${delay}ms`);
    });
    
    delayTime += Number(step.value);
  };
};

// ✅
// ❌