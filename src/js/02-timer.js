import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// using a darck theme
require("flatpickr/dist/themes/dark.css");

const OPTIONS = {
    enableTime: true,
    defaultDate: new Date(),
    time_24hr: true,
    minuteIncrement: 1,
    onClose(selectedDates) {
        showDate(selectedDates[0]);
      },
};

const inputRef = document.querySelector('#datetime-picker');
const startBtnRef = document.querySelector('button[data-start]');
const daysRef = document.querySelector('span[data-days]');
const hoursRef = document.querySelector('span[data-hours]');
const minutesRef = document.querySelector('span[data-minutes]');
const secondsRef = document.querySelector('span[data-seconds]');

startBtnRef.classList.add('btn')
const isDisable = true
startBtnRef.disabled = isDisable;

flatpickr("#datetime-picker", OPTIONS);


startBtnRef.addEventListener('click', startCount);

let destinationTime = Date.now();

function showDate(value) {
    if(value < Date.now()) {
        startBtnRef.disabled = isDisable;
        return Notify.failure('Please choose a date in the future');
    };
    
    startBtnRef.disabled = !isDisable;
    destinationTime = value.getTime();
};

let intervalId = null;

function startCount() {
    intervalId = setInterval(showTime, 1000)

    startBtnRef.disabled = isDisable;
    inputRef.disabled = isDisable;
}

function showTime() {
    const timeLeft = destinationTime - Date.now();
    if(timeLeft < 999) {
        clearInterval(intervalId);
        intervalId = null;
        startBtnRef.disabled = !isDisable;
        inputRef.disabled = !isDisable;
    };

    const {days, hours, minutes, seconds} = convertMs(timeLeft);

    daysRef.textContent = addLeadingZero(days);
    hoursRef.textContent = addLeadingZero(hours);
    minutesRef.textContent = addLeadingZero(minutes);
    secondsRef.textContent = addLeadingZero(seconds);
};

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};