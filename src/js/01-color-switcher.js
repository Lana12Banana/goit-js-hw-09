import Notiflix from 'notiflix';

function getRandomHexColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const buttonChangerStart = document.querySelector("button[data-start]")
const buttonChangerStop = document.querySelector("button[data-stop]");
let changeTime = null;


function handleChangeColorStart() {
	if (buttonChangerStart.getAttribute("data-start") !== "") {
		Notiflix.Notify.warning("Already running");
		return
	}
	changeTime = setInterval(() => {
		let color = getRandomHexColor();
		document.body.style.backgroundColor = color;
		console.log(color);
	}, 1000)
	buttonChangerStart.setAttribute("data-start", "active");
	// Другий варіант як в дз, щоб кнопка була неактивна
	// buttonChangerStart.setAttribute("disabled", true);
}

function handleChangeColorStop() {
	clearInterval(changeTime);
	// buttonChangerStart.removeAttribute("disabled", true);
	buttonChangerStart.setAttribute("data-start", "");
	document.body.style.backgroundColor = '#FFFFFF';
	Notiflix.Notify.info("Color changing was stopped and set to default");
}

buttonChangerStart.addEventListener("click", handleChangeColorStart)
buttonChangerStop.addEventListener("click", handleChangeColorStop)