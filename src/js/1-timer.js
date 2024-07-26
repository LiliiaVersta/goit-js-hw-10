import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDateTime = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const elementDays = document.querySelector('span[data-days]');
const elementHours = document.querySelector('span[data-hours]');
const elementMinutes = document.querySelector('span[data-minutes]');
const elementSeconds = document.querySelector('span[data-seconds]');

startBtn.addEventListener('click', onClickStartTimer);

let userSelectedDate = '';
let intervalId = '';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      addErrorMessage();
    } else {
      userSelectedDate = selectedDates[0];
      startBtn.disabled = false;
    }
  },
};

flatpickr(inputDateTime, options);

function calculateTimeLeft() {
  const time = userSelectedDate - new Date();
  // console.log(time);
  if (time <= 0) {
    clearInterval(intervalId);
    inputDateTime.disabled = false;
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(time);
  elementDays.textContent = String(days).padStart(2, 0);
  elementHours.textContent = String(hours).padStart(2, 0);
  elementMinutes.textContent = String(minutes).padStart(2, 0);
  elementSeconds.textContent = String(seconds).padStart(2, 0);
  startBtn.disabled = true;
  inputDateTime.disabled = true;
}

function onClickStartTimer() {
  intervalId = setInterval(calculateTimeLeft, 1000);
}

function addErrorMessage() {
  iziToast.error({
    backgroundColor: 'tomato',
    message: 'Please choose a date in the future',
    messageColor: 'white',
    messageSize: '20',
    position: 'topRight',
    close: true,
  });
}

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
}
