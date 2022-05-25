import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    btnInput: document.querySelector("button"), 
    dateTimePicker: document.querySelector('#datetime-picker'),
    daysValue : document.querySelector('.value[data-days]'),
    hoursValue :  document.querySelector('.value[data-hours]'),
    minutesValue :  document.querySelector('.value[data-minutes]'),
    secondsValue :  document.querySelector('.value[data-seconds]'),
}

refs.btnInput.setAttribute('disabled', '');
let timer = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedIndx = selectedDates[0].getTime();
        
        if (selectedIndx < Date.now()) {
                refs.btnInput.setAttribute('disabled', '');
                return Notiflix.Notify.failure('Please choose a date in the future');
                
        }
        if (timer) {
            return timer.onStart = selectedIndx;

        }
         timer = new Timer({
           onTik: updateDateFace,
           onStart:selectedIndx,
        });
        refs.btnInput.addEventListener('click', () => {
            timer.start(); 
            refs.dateTimePicker.setAttribute('disabled', '');
            refs.btnInput.setAttribute('disabled', '');
        }, )
        refs.btnInput.removeAttribute('disabled');
        refs.btnInput.classList.add('active');  
  },
};

flatpickr("#datetime-picker", options);

class Timer {
    constructor({ onTik, onStart }) {
        this.intrvalId = null;
        this.isActive = false;  
        this.onTik = onTik;
        this.onStart = onStart;
      
    };

 start() {
     if (this.isActive) {  
        return;
    }
    const startTime = this.onStart;
    this.isActive = true;
    this.intrvalId = setInterval(() => {
         
         const currentTime = Date.now();
         const deltaTime = startTime - currentTime;
         const time = convertMs(deltaTime);
         this.onTik(time);
         
           if (deltaTime < 1000) {
               clearInterval(this.intrvalId);
               Notiflix.Notify.success('Finished');
               refs.btnInput.setAttribute('disabled', '');
               refs.btnInput.classList.remove('active'); 
     }
     }, 1000);
    };
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
  
function addZero (value) {
    return String(value).padStart(2, '0');
}

function updateDateFace({ days, hours, minutes, seconds }) {
  refs.daysValue.textContent = `${days}`;
  refs.hoursValue.textContent = `${hours}`;
  refs.minutesValue.textContent = `${minutes}`;
  refs.secondsValue.textContent = `${seconds}`;
}