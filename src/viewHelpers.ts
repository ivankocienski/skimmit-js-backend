
export function formatDateTime(dateTime: Date): string {
  const   year: string = dateTime.getFullYear().toString();
  const  month: string = dateTime.getMonth()   .toString().padStart(2, '0');
  const    day: string = dateTime.getDay()     .toString().padStart(2, '0');
  const   hour: string = dateTime.getHours()   .toString().padStart(2, '0');
  const minute: string = dateTime.getMinutes() .toString().padStart(2, '0');

  return `${hour}:${minute} on ${day}/${month}/${year}`;
}