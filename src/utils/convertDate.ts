import { zeroPad } from "./padStart";

const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const convertDateToTime = (date: Date | number) => {
  if (!date) return "";

  const now = new Date().getTime();
  let deltaTime: number = 0;

  if (typeof date === "number") {
    deltaTime = (now - date) / 1000;
  } else {
    deltaTime = (now - date.getTime()) / 1000;
  }

  const minute = convertSecond.minute(deltaTime);
  const hour = convertSecond.hour(deltaTime);
  const day = convertSecond.day(deltaTime);

  if (day > 1) {
    return day.toFixed(0) + " hari";
  }

  if (hour > 1) {
    return hour.toFixed(0) + " jam";
  }

  return minute.toFixed(0) + " menit";
};

export const convertSecond = {
  minute: function (sec: number) {
    return sec / 60;
  },
  hour: function (sec: number) {
    return this.minute(sec) / 60;
  },
  day: function (sec: number) {
    return this.hour(sec) / 24;
  },
};

export const minuteToHour = (min: number) => min / 60;

export const hourToDay = (hour: number) => hour / 24;

export const convertDateToTimeDate = (date: Date | number) => {
  let dateValue;
  if (typeof date === "number") {
    dateValue = new Date(date);
  } else {
    dateValue = date;
  }

  const minutes = dateValue.getMinutes();
  const hours = dateValue.getHours();
  const dateNum = zeroPad(dateValue.getDate(), 2);
  const months = MONTHS[dateValue.getMonth()].substring(0, 3);
  const years = dateValue.getFullYear();

  return `${hours}:${minutes} · ${dateNum} ${months} ${years}`;
};
