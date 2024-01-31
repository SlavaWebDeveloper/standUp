import { Notification } from './scripts/notification';
import './style.css'
import TomSelect from 'tom-select'

const MAX_COMEDIANS = 6;

const notification = Notification.getInstance();

const bookingCommediansList = document.querySelector('.booking__commedians-list');

const bookingForm = document.querySelector('.booking__form');

const creatCommedianBlock = (comedians) => {
  const bookingCommedian = document.createElement('li');
  bookingCommedian.classList.add('booking__commedian');

  const bookingSelectCommedian = document.createElement('select');
  bookingSelectCommedian.classList.add(
    'booking__select', 
    'booking__select_comedian'
  );

  const bookingSelectTime = document.createElement('select');
  bookingSelectTime.classList.add(
    'booking__select', 
    'booking__select_time'
  );
  
  const inputHidden = document.createElement('input');
  inputHidden.type = "hidden";
  inputHidden.name = "booking";

  const bookingHall = document.createElement('button');
  bookingHall.classList.add('booking__hall');
  bookingHall.type = 'button';

  bookingCommedian.append(bookingSelectCommedian, bookingSelectTime, inputHidden);

  const bookingTomSelectCommedian = new TomSelect(bookingSelectCommedian, {
    hideSelected: true, 
    placeholder: 'Выбрать комика',
    options: comedians.map(item => ({
      value: item.id,
      text: item.comedian,
    })),    
  });

  const bookingTomSelectTime = new TomSelect(bookingSelectTime, {
    hideSelected: true, 
    placeholder: 'Выбрать время',
  });
  bookingTomSelectTime.disable();

  bookingTomSelectCommedian.on('change', (id) => {
    bookingTomSelectTime.enable();
    bookingTomSelectTime.blur();

    const {performances} = comedians.find((item) => item.id === id );

    bookingTomSelectTime.clear();
    bookingTomSelectTime.clearOptions();
    bookingTomSelectTime.addOptions(
      performances.map((item) =>({
        value: item.time,
        text: item.time,
      })),
    );

    bookingHall.remove();
  });

  bookingTomSelectTime.on('change', (time) => {
    if (!time) {
      return;
    }
    const idComedian = bookingTomSelectCommedian.getValue();
    const { performances } = comedians.find((item) => item.id === idComedian );
    const { hall } = performances.find((item) => item.time === time );
    inputHidden.value = `${idComedian}, ${time}`;

    bookingTomSelectTime.blur();  
    bookingHall.textContent = hall;
    bookingCommedian.append(bookingHall);

  });

  const createNextBookingComedian = () => {
    if (bookingCommediansList.children.length < MAX_COMEDIANS) {
      const nextComediansBlock = creatCommedianBlock(comedians);
      bookingCommediansList.append(nextComediansBlock);
    };

    bookingTomSelectTime.off('change', createNextBookingComedian);
  }

  bookingTomSelectTime.on('change', createNextBookingComedian)


  return bookingCommedian
}

const getComedians = async () => {
  const response = await fetch('http://localhost:8080/comedians');
  return response.json();
}

const init = async () => {  
  const countComedians = document.querySelector('.event__info-item_comedians .event__info-number');

  const comedians = (await getComedians());

  countComedians.textContent = comedians.length;  
  // console.log('comedians: ', comedians);

  const comedianBlock = creatCommedianBlock(comedians);

  bookingCommediansList.append(comedianBlock);

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {booking: []};
    const times = new Set();

    new FormData(bookingForm).forEach((value, field) => {
      if (field === 'booking') {
        const [comedian, time] = value.split(",");

        if (comedian && time) {
          data.booking.push({comedian, time});
          times.add(time);
        }       
      } else {
        data[field] = value;
      }
      
      if (times.size !== data.booking.length) {
        notification.show('Нельзя быть на двух выступлениях одновременно', false);
        // notification -> ''
      }
    });
  });
}

init()