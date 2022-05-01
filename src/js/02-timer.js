import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix";

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        onCalendarClose(selectedDates[0]);
    },
    };

const refs = {
    input: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('[data-start]'),
    hours: document.querySelector('#data-hours'),
    minutes: document.querySelector('#data-minutes'),
    seconds: document.querySelector('#data-seconds'),
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

let chosenDate = Date.now();
refs.btnStart.disabled = true;
refs.btnStart.addEventListener('click', onStart);

const fp = flatpickr(refs.input, options);

function onCalendarClose(date) {
    if (Date.now() > date) {
        Notify.failure('Please choose a date in the future');
    }
    refs.btnStart.disabled = false;
    chosenDate = date;
}
function onStart() {
    refs.btnStart.disabled = true;
    refs.input.disabled = true;
    fp.destroy();
    setInterval(() => {
        const restTime = convertMs(chosenDate - Date.now());
        updateMarkup(restTime);
    }, 1000);
}

function addLeadingZero(value) {
    return String(value).addLeadingZeroStart(2, '0');
}
function updateMarkup({ days, hours, minutes, seconds }) {
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
}