import Inputmask from 'inputmask';
import JustValidate from 'just-validate';
import { Notification } from './notification';
import { sendData } from './api';

export const initForm = (
  bookingForm, 
  bookingInputFullname, 
  bookingInputPhone, 
  bookingInputTicket,
  changeSelection,
  bookingCommediansList, 
  ) => 
  {
    const validate = new JustValidate(
      bookingForm, {
        errorFieldCssClass: 'booking__input_invalid',
        successFieldCssClass: 'booking__input_valid',
        tooltip: {
          position: 'bottom',
        },
      }
    );

    new Inputmask("+7(999)-999-9999").mask(bookingInputPhone); 
    new Inputmask("99999999").mask(bookingInputTicket);

    validate
    .addField(bookingInputFullname , [
      {
        rule:'required', 
        errorMessage: "Заполните имя"
      }
    ])
    .addField(bookingInputPhone, [
      {
        rule:'required', 
        errorMessage: "Заполните телефон"
      },
      {
        validator(value) {
          const phone = bookingInputPhone.inputmask.unmaskedvalue();
          return phone.length === 10 && !!Number(phone);
        },
        errorMessage: "Некорректный телефон"
      },
    ])
    .addField(bookingInputTicket, [
      {
        rule:'required', 
        errorMessage: "Заполните номер билета"
      },
      {
        validator() {
          const ticket = bookingInputTicket.inputmask.unmaskedvalue();
          return ticket.length === 8 && !!Number(ticket);
        },
        errorMessage: "Неверный номер билета"
      },  
    ])
    .onFail((fields) => {    
      let errorMessage = '';
      for (const key in fields) {
        if (!Object.hasOwnProperty.call(fields, key)) {
          continue;
        }

        const element = fields[key];
        if (!element.isValid) {
          errorMessage += `${element.errorMessage}, `;
        }
      }

      Notification.getInstance().show(errorMessage.slice(0, -2), false);

    });

    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!validate.isValid) {
        return;
      }

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
      });

      if (times.size !== data.booking.length) {
        Notification.getInstance().show(
          'Нельзя быть на двух выступлениях одновременно', 
          false,
        );
        return;
      }

      if (!times.size) {
        Notification.getInstance().show('Вы не выбрали комика и/или время');
        return;
      }

      const method = bookingForm.getAttribute("method");

      let isSend = false;

      if (method === "PATCH") {
        isSend = await sendData(method, data, data.ticketNumber);
      } else {
        isSend = await sendData(method, data);
      }

      if (isSend) {

        // Показываем уведомление об успешном завершении операции
        const successMessage = method === "PATCH" ? "Редактирование брони принято" : "Бронь принята";
        Notification.getInstance().show(successMessage, true);
        
        // Очищаем форму и список комиков
        changeSelection();
        bookingForm.reset();
        bookingCommediansList.textContent = "";
      }

      console.log(data);
    }); 
  };