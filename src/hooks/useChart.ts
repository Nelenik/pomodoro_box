import { WeekData } from "@/types/metriks";
import { getPauseTimeString } from "@/utils/getTimeString";
import { ChartOptions } from "chart.js";

export const useChart = (
  activeWeek: WeekData,
  activeDay: number,
  setActiveDay: React.Dispatch<React.SetStateAction<number>>
) => {
  const labels = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  const colors = activeWeek.map(([day, dayData]) => {
    const dayDate = new Date(day);
    const weekDay: number = dayDate.getDay();
    if (dayData === null) return "#C4C4C4";
    else if (weekDay === activeDay) return "#DC3E22";
    else return "#EA8A79";
  });

  const xAxisTextColor = activeWeek.map(([day]) => {
    const dayDate = new Date(day);
    const weekDay: number = dayDate.getDay();
    if (weekDay === activeDay) return "#DC3E22";
    return "#999999";
  });

  const data = activeWeek.map(([, dayData]) => {
    if (!dayData) return 0;
    else return Math.floor(dayData.totalTime / 60);
  });
  console.log(data);
  // const min = Math.min(...data);
  const max = Math.max(...data);

  console.log(Math.trunc(max / 25) + 1);

  const chartData = {
    labels,
    datasets: [
      {
        minBarLength: 3,
        barPercentage: 0.8,
        data: data,
        backgroundColor: colors,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    onClick: (_: unknown, activeElems: { index: number }[]): void => {
      if (!activeElems[0]) return;
      const { index } = activeElems[0];
      let newActiveDay: number = index === 6 ? 0 : index + 1;
      setActiveDay(newActiveDay);
    },
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        border: { display: false },
        grid: {
          display: false,
          drawTicks: false,
        },
        ticks: {
          color: xAxisTextColor,
          padding: 20,
          font: { weight: "normal" as const, size: 24 },
        },
      },
      y: {
        border: { display: false },
        position: "right",

        grid: {
          drawTicks: false,
        },
        ticks: {
          padding: 30,
          maxTicksLimit: Math.trunc(max / 25) + 1,
          stepSize: 25,
          callback: function (value: number | string) {
            if (typeof value === "string") return;
            if (value === 0) return "0";
            return getPauseTimeString(value * 60);
          },
          font: { weight: "normal" as const, size: 12 },
        },
      },
    },
  };

  return { chartData, options };
};
