import { OneDay } from "@/types/metriks";

type Collection = Map<string, [number, number]>;

const WEEKS_COUNT: number = 3;

class WeeksInterval {
  static DAY_IN_SEC: number = 24 * 60 * 60 * 1000;

  static subtractDay(dateObj: Date, daysCount: number): number {
    return dateObj.getTime() - daysCount * WeeksInterval.DAY_IN_SEC;
  }

  static intervals(weeksCount: number): Collection {
    const now: Date = new Date();
    let startPoint: Date = new Date(now.toDateString());
    let monthDay: number = startPoint.getDate();
    let weekDay: number = startPoint.getDay();
    if (weekDay === 0) weekDay = 7;
    //first day of the future week
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

export const filterByWeek = (weekId: string) => (el: [string, OneDay]) => {
  const weeks = WeeksInterval.intervals(WEEKS_COUNT);
  const timestamps = weeks.get(weekId);
  if (timestamps) {
    const value = new Date(el[0]);
    const valueMs = value.getTime();
    return valueMs >= timestamps[0] && valueMs <= timestamps[1];
  }
};

export const fillMissedDays = (week) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((el) => {
    return (
      week.find((weekEl: [string, OneDay]) => weekEl[0].includes(el)) || null
    );
  });
};

export const getDayName = (day: number): string => {
  if (day === 0) day = 7;
  const days = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ];
  return days[day - 1];
};
