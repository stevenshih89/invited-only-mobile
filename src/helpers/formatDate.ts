export const formatDate = (dateString: string) => {
  const [day, month, year] = dateString.split('.');
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const monthName = months[parseInt(month, 10) - 1];

  return `${day} ${monthName} ${year}`;
};
