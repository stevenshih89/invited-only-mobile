import moment from 'moment';

export const filterEventsByThisMonth = events => {
  const today = moment();
  const endOfMonth = moment().endOf('month');

  return events.filter(event => {
    if (event?.date) {
      const eventDate = moment(event?.date, 'DD.MM.YYYY');
      return eventDate.isSameOrBefore(endOfMonth) && eventDate.isSameOrAfter(today);
    }
    return false;
  });
};
