import './../../style.css'
import { getComedians } from '../api';
import { creatCommedianBlock } from '../comedians';
import { initForm } from '../form';
import { initChangeSelection } from '../ChangeSelection';
import { initQrPage } from '../qrPage';

const init = async () => {  

  if (window.location.pathname.endsWith('qr.html')) {
    initQrPage();
    return;
  }

  const bookingCommediansList = document.querySelector('.booking__commedians-list');
  const bookingForm = document.querySelector('.booking__form');
  const countComedians = document.querySelector('.event__info-item_comedians .event__info-number');
  const bookingInputFullname = document.querySelector(".booking__input_fullname");
  const bookingInputPhone = document.querySelector(".booking__input_phone");
  const bookingInputTicket = document.querySelector(".booking__input_ticket");
  const event = document.querySelector('.event');
  const booking = document.querySelector('.booking');
  const eventButtonReserve = document.querySelector('.event__button_reserve');
  const eventButtonEdit = document.querySelector('.event__button_edit');
  const bookingTitle = document.querySelector('.booking__title');

  const comedians = await getComedians();
  
  if (comedians) {
    countComedians.textContent = comedians.length;  

    const changeSelection = initChangeSelection(
      bookingForm,
      event,
      booking,
      eventButtonReserve,
      eventButtonEdit,
      bookingTitle,
      comedians,
      bookingCommediansList,
    );

    initForm(
      bookingForm, 
      bookingInputFullname, 
      bookingInputPhone, 
      bookingInputTicket,
      changeSelection,
      bookingCommediansList,
    );
  }
};

init()