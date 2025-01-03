import { EntryMetriks, OneDay } from "@/types/metriks";

type Collection = Map<string, [number, number]>;

//return number of the week day and month day using date string or timstamp. if argument is absent returns values for current day
export const getDayNum = (dateFormat?: string | number) => {
  const date = dateFormat ? new Date(dateFormat) : new Date();
  const weekDay = date.getDay();
  const monthDay = date.getDate();
  return {
    weekDay,
    monthDay,
  };
};

/*
The WeeksInterval class provides utility methods for working with weekly intervals. It includes:

- A constant DAY_IN_SEC representing the number of milliseconds in a day.
- A static method subtractDay that subtracts a specified number of days from a given date.
- A static method intervals that generates a collection of date ranges for a given number of weeks, starting from the current week and moving backward. Each week is represented as a key-value pair in a Map, where the key indicates the number of weeks ago and the value is an array containing the start and end timestamps of that week.
*/
class WeeksInterval {
  static DAY_IN_MSEC: number = 24 * 60 * 60 * 1000;

  static subtractDay(dateObj: Date, daysCount: number): number {
    return dateObj.getTime() - daysCount * WeeksInterval.DAY_IN_MSEC;
  }

  static intervals(weeksCount: number): Collection {
    const now: Date = new Date();
    let startPoint: Date = new Date(now.toDateString());
    const monthDay: number = startPoint.getDate();
    let weekDay: number = startPoint.getDay();
    if (weekDay === 0) weekDay = 7;
    //move to next monday
    startPoint.setDate(monthDay + 8 - weekDay);
    const weeks: Collection = new Map();
    for (let i = 0; i < weeksCount; i++) {
      const endOfWeek: number = WeeksInterval.subtractDay(startPoint, 1);
      const beginOfWeek: number = WeeksInterval.subtractDay(startPoint, 7);
      startPoint = new Date(beginOfWeek);
      weeks.set(`weekAgo${i}`, [beginOfWeek, endOfWeek]);
    }
    return weeks;
  }
}

/*
The BreakIntoWeeks class processes and manages weekly data.
Functions
- constructor(weeksCount: number): Initializes week intervals based on the number of weeks.
- filterByWeek(timestamps: [number, number]): Filters entries within the specified timestamps.
- breakIntoWeeks(initArray: EntryMetriks, weekId: string): Ensures each day of the week has an entry, using data from initArray or a default placeholder if no entry exists.
*/
export class BreakIntoWeeks {
  DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  weeks: Collection;

  constructor(weeksCount: number) {
    this.weeks = WeeksInterval.intervals(weeksCount);
  }
  filterByWeek = (timestamps: [number, number]) => (el: [string, OneDay]) => {
    const value = new Date(el[0]);
    const valueMs = value.getTime();
    return valueMs >= timestamps[0] && valueMs <= timestamps[1];
  };

  breakIntoWeeks = (initArray: EntryMetriks, weekId: string) => {
    const timestamps = this.weeks.get(weekId);
    if (!timestamps) return [];
    const week = initArray.filter(this.filterByWeek(timestamps));
    return this.DAYS.map((daysEl: string, i: number) => {
      const day = new Date(timestamps[0] + i * WeeksInterval.DAY_IN_MSEC);
      const defaultDayArray: [string, null] = [day.toDateString(), null];
      return (
        week.find((weekEl: [string, OneDay]) => weekEl[0].includes(daysEl)) ||
        defaultDayArray
      );
    });
  };
}

export const getDayName = (day: number): string => {
  if (day === 0) day = 7;
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursdayг",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return days[day - 1];
};
