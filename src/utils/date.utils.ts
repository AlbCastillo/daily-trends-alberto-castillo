/**
 * getFeedDefaultName returns a formatted string representing the current day of the week, day of the month, and month in Spanish
 * @returns A string in the format "{dayOfWeek} {day} {month}".
 */
export const getFeedDefaultName = () => {
  // An array of day names in Spanish
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  // An array of month names in Spanish
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  // Get the current date
  const date = new Date();

  // Get the day of the week
  const dayOfWeek = days[date.getDay()];
  // Get the day of the month
  const day = date.getDate();
  // Get the month
  const month = months[date.getMonth()];

  // Return the formatted string
  return `${dayOfWeek} ${day} ${month}`;
};
