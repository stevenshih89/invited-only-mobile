export const formateDateAbbreviated = (date: string) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [day, month, year] = date.split(".");
    const monthName = months[parseInt(month) - 1];
    return `${day} ${monthName} ${year}`;
  }