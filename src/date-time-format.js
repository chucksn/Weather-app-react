const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
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

// function that gives date in the format - Monday 5 July
const dateFormat_1 = (date) => {
  let weekday = weekdays[date.getDay()];
  let dayOfMonth = date.getDate();
  let month = months[date.getMonth()];
  let myDateFormat = `${weekday} ${dayOfMonth} ${month}`;
  return myDateFormat;
};

// function that gives date in the format - July 5
const dateFormat_2 = (date) => {
  let dayOfMonth = date.getDate();
  let month = months[date.getMonth()];
  let myDateFormat = `${month} ${dayOfMonth}`;
  return myDateFormat;
};

// function that give time in am-pm format
const amPmTimeFormat = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let amPm = hours >= 12 ? "pm" : "am";
  hours %= 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  let strTime = `${hours}:${minutes} ${amPm}`;
  return strTime;
};

export { dateFormat_1, dateFormat_2, amPmTimeFormat };
