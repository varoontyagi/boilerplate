/**
 * It takes a date object and returns a string in the format DD-MM-YYYY
 * @param {Date} date - Date - The date to be formatted
 * @returns A function that takes a date and returns a string.
 */
export const DDMMYYDateFormat = (date: Date): string => {
  const year: number = date.getFullYear();
  const month: number = date.getMonth();
  const day: number = date.getDate();
  return `${day}-${month + 1 < 10 ? `0${month + 1}` : month + 1}-${year}`;
};
