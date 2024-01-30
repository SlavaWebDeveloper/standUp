import './style.css'
import TomSelect from 'tom-select'

const bookingCommediansList = document.querySelector('.booking__commedians-list');

const creatCommedianBlock = () => {
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

  bookingCommedian.append(bookingSelectCommedian, bookingSelectTime, inputHidden);

  const bookingTomSelectCommedian = new TomSelect(bookingSelectCommedian, {
    hideSelected: true, 
    placeholder: 'Выбрать комика',
    options: [
      {
      value: 1,
      text: 'Белый',
      },
      {
        value: 2,
        text: 'Темный',
      },
      {
        value: 3,
        text: 'Желтый',
      }
    ]
  });

  const bookingTomSelectTime = new TomSelect(bookingSelectTime, {
    hideSelected: true, 
    placeholder: 'Выбрать время',
  });
  bookingTomSelectTime.disable();

  bookingTomSelectCommedian.on('change', () => {
    bookingTomSelectTime.enable();
    
    bookingTomSelectTime.addOptions([
      {
      value: 1,
      text: 'Белый',
      },
      {
        value: 2,
        text: 'Темный',
      },
      {
        value: 3,
        text: 'Желтый',
      }
    ])
  });

  bookingTomSelectTime.on('change', () => {
    bookingTomSelectTime.blur();
    bookingHall.textContent = "Зал 1";
    bookingCommedian.append(bookingHall);
  });
    

  return bookingCommedian
}

const init = () => {

  const comedianBlock = creatCommedianBlock();

  bookingCommediansList.append(comedianBlock);
}


init()

/* 

<li class="booking__commedian">
  <select class="booking__select booking__select_comedian" name="comedian">
    <option value="1">Юлия Ахмедова</option>
    <option value="2">Слава Комиссаренко</option>
  </select>

  <select class="booking__select booking__select_time" name="time">
    <option value="20:00">20:00</option>
    <option value="22:00">22:00</option>
  </select>

  <button class="booking__hall">Залл 1</button>
booking__commedians-list</li>
*/