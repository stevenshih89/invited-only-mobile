export function convertToPmAmFormat(hour: string) {
    let [hours, minutes] = hour?.split(":").map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 
    return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }