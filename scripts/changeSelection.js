import { creatCommedianBlock } from "./comedians";

export const initChangeSelection =  (
  bookingForm,
  event,
  booking,
  eventButtonReserve,
  eventButtonEdit,
  bookingTitle,
  comedians,
  bookingCommediansList,
) => {
  eventButtonReserve.style.transition = 'opacity 0.5s, visibility 0.5s';
  eventButtonEdit.style.transition = 'opacity 0.5s, visibility 0.5s';
  
  eventButtonReserve.classList.remove('event__button_hidden');
  eventButtonEdit.classList.remove('event__button_hidden');

  const changeSelection = () => {
    event.classList.toggle('event__hidden');
    booking.classList.toggle('booking__hidden');


    if (!booking.classList.contains('booking__hidden')) {
      const comedianBlock = creatCommedianBlock(comedians, bookingCommediansList);
      bookingCommediansList.append(comedianBlock);
    };
  };

  eventButtonReserve.addEventListener('click', () => {
    changeSelection();
    bookingTitle.textContent = 'Забронируйте место в зале';
    bookingForm.method = 'POST';    
  });
  eventButtonEdit.addEventListener('click', () => {
    changeSelection();
    bookingTitle.textContent = 'Редактирование брони';
    bookingForm.method = 'PATCH';     
  }); 
  
  return changeSelection;
};