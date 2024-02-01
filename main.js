import './style.css'
import { getComedians } from './scripts/api';
import { creatCommedianBlock } from './scripts/comedians';
import { initForm } from './scripts/form';

const init = async () => {  
  const bookingCommediansList = document.querySelector('.booking__commedians-list');
  const bookingForm = document.querySelector('.booking__form');
  const countComedians = document.querySelector('.event__info-item_comedians .event__info-number');
  const bookingInputFullname = document.querySelector(".booking__input_fullname");
  const bookingInputPhone = document.querySelector(".booking__input_phone");
  const bookingInputTicket = document.querySelector(".booking__input_ticket");

  initForm(
    bookingForm, 
    bookingInputFullname, 
    bookingInputPhone, 
    bookingInputTicket
  );

  const comedians = await getComedians();
  
  if (comedians) {
    countComedians.textContent = comedians.length;  
    const comedianBlock = creatCommedianBlock(comedians, bookingCommediansList);
    bookingCommediansList.append(comedianBlock);
  }
};

init()