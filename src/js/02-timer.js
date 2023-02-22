import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const buttonTimerStart = document.querySelector("[data-start]")
const inputTimer = document.getElementById("datetime-picker")
const days = document.querySelector("[data-days]")
const hours = document.querySelector("[data-hours]")
const minutes = document.querySelector("[data-minutes]")
const seconds = document.querySelector("[data-seconds]")
buttonTimerStart.setAttribute("disabled", true);
let chosenDate = null

const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		if (selectedDates[0].getTime() <= Date.now()) {
			Notiflix.Notify.warning("Please choose a date in the future")
			return
		}
		buttonTimerStart.removeAttribute("disabled", true);
		buttonTimerStart.addEventListener("click", timerStart)
		chosenDate = selectedDates[0];
	},
}

function timerStart() {
	buttonTimerStart.setAttribute("disabled", true);
	inputTimer.setAttribute("disabled", true);
	const interval = setInterval(() => {
		const subtraction = chosenDate.getTime() - Date.now();
		const timeConverter = convertMs(subtraction)

		if (subtraction <= 0) {
			clearInterval(interval)
			return
		}

		days.textContent = timeConverter.days;
		hours.textContent = timeConverter.hours;
		minutes.textContent = timeConverter.minutes;
		seconds.textContent = timeConverter.seconds;		
	}, 1000)
}

function addLeadingZero(value) {
	return String(value).padStart(2, '0')
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
    const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

  // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
    const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
}

flatpickr(inputTimer, options);

