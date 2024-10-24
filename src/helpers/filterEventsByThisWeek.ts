import moment from 'moment';

export const filterEventsByThisWeek = (events: any[]): any[] => {
  const today = moment().startOf('day');
  const endOfWeek = moment().endOf('week').add(1, 'day');
  return events.filter(event => {
    if (event?.date && event?.hour) {
      const eventDate = moment(`${event.date} ${event.hour}`, 'DD.MM.YYYY HH:mm');

      return eventDate.isSameOrBefore(endOfWeek) && eventDate.isSameOrAfter(today);
    }
    return false;
  });
};
