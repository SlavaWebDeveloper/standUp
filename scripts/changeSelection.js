export const initChangeSelection =  (
  bookingForm,
  event,
  booking,
  eventButtonReserve,
  eventButtonEdit,
  bookingTitle
) => {
  eventButtonReserve.style.transition = 'opacity 0.5s, visibility 0.5s';
  eventButtonEdit.style.transition = 'opacity 0.5s, visibility 0.5s';
  
  eventButtonReserve.classList.remove('event__button_hidden');
  eventButtonEdit.classList.remove('event__button_hidden');

  const changeSelection = () => {
    event.classList.add('event__hidden')
    booking.classList.remove('booking__hidden')
  }

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
  
  }