import moment from 'moment';

export const filterEventsByThisWeek = events => {
  const today = moment();
  const endOfWeek = moment().endOf('week');
  return events.filter(event => {
    if (event?.date) {
      const eventDate = moment(event?.date, 'DD.MM.YYYY');
      return eventDate.isSameOrBefore(endOfWeek) && eventDate.isSameOrAfter(today);
    }
    return false;
  });
};
