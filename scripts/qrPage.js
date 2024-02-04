import { Notification } from "./notification";
import { getClient, getComedians } from "./api";
import { displayBooking, displayClienInfo } from "./display";
import { showQrController } from "./showQrController";

const getTicketNumber = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('t');
}

export const initQrPage = async () => {
  const clientInfo =  document.querySelector('.booking__client-info');
  const bookingPerformances = document.querySelector('.booking__performances');

  const ticketNumber = getTicketNumber();

  if (ticketNumber) {
    
    const clientData = await getClient(ticketNumber);
    displayClienInfo(clientInfo, clientData);
    const comediansData = await getComedians(ticketNumber);
    displayBooking(bookingPerformances, clientData, comediansData);

    showQrController(bookingPerformances);

  } else {
    Notification.getInstance().show('Произошла ошибка, проверьте введенные данные');
  }
}