import Notiflix from 'notiflix';

const form = document.querySelector(".form")

function createPromise(position, delay,) {
	const shouldResolve = Math.random() > 0.3;
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (shouldResolve) {
				resolve({ position, delay });
			} else {
				reject({ position, delay });
			}
		}, delay);
    });
}

function handlerCreatePromise(event) {
	event.preventDefault();

	let delay = Number(event.target.delay.value);
	let step = Number(event.target.step.value);
	let amount = Number(event.target.amount.value);

	for (let item = 1; item <= amount; item+=1) {
		createPromise(step, delay)
		.then(({ position, delay }) => {
			Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
		})
		.catch(({ position, delay }) => {
			Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
		});
		delay += step;
	}
}

form.addEventListener("submit", handlerCreatePromise)