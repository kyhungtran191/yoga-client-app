export const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export class HandleDateTime {
  static DateString = (num: Date) => {
    const date = new Date(num);
    return `${date.getDate()} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  static GetHour = (num: Date) => {
    const date = new Date(num);

    const hour = date.getHours();
    return hour > 12 ? `${hour - 12} PM` : `${hour} AM`;
  };
}
