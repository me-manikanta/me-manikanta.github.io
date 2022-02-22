const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formatDateForTimeline = (date: Date | null | undefined) =>
  date
    ? monthNames[date.getMonth()] + ", " + date.getFullYear().toString()
    : "Present";
