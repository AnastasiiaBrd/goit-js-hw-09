import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputFlat = document.querySelector(`input[type='text']`);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

inputFlat.flatpickr(`#datetime-picker`, options);
