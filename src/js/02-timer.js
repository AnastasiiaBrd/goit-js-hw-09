import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { values } from 'lodash';

const inputFlat = document.querySelector(`#datetime-picker`);
const buttonStart = document.querySelector('button[data-start]');
const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');
let dedline;
let timerId = null;

buttonStart.disabled = true;
inputFlat.flatpickr({
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < this.config.defaultDate.getTime()) {
      window.alert('Please choose a date in the future');
    } else {
      buttonStart.disabled = false;
      dedline = selectedDates[0].getTime();
    }
  },
});

buttonStart.addEventListener(`click`, onButtonClick);

function onButtonClick() {
  timerId = setInterval(() => {
    const timeLeftMs = dedline - new Date().getTime();
    if (timeLeftMs <= 0) {
      clearInterval(timerId);
      return;
    }
    const timeLeft = convertMs(timeLeftMs);
    dataDays.textContent = addLeadingZero(timeLeft.days);
    dataHours.textContent = addLeadingZero(timeLeft.hours);
    dataMinutes.textContent = addLeadingZero(timeLeft.minutes);
    dataSeconds.textContent = addLeadingZero(timeLeft.seconds);
  }, 1000);
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
function addLeadingZero(value) {
  value = value.toString().padStart(2, `0`);
  return value;
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
