import { OneDay, PomodoroMetriks } from "@/types/metriks";
import { useEffect, useState } from "react";

export const useTomatoMetriks = () => {
  const pomodoroMetriks: PomodoroMetriks = JSON.parse(
    localStorage.getItem("pomodoroMetriks") || "{}"
  );
  const now: Date = new Date();

  const todayString: string = now.toDateString();

  const defaultDay: OneDay = {
    completedTomatoes: 0,
    stopCount: 0,
    timeOnPause: 0,
    totalTime: 0,
    completedTasks: 0,
  };
  const initValue = pomodoroMetriks[todayString] || defaultDay;

  const [todayMetriks, setTodayMetriks] = useState(initValue);

  useEffect(() => {
    if (pomodoroMetriks[todayString]) {
      Object.assign(pomodoroMetriks[todayString], todayMetriks);
    } else {
      pomodoroMetriks[todayString] = todayMetriks;
    }
    localStorage.setItem("pomodoroMetriks", JSON.stringify(pomodoroMetriks));
  }, [todayMetriks, todayString, pomodoroMetriks]);

  return {
    todayMetriks,
    setTodayMetriks,
  };
};
