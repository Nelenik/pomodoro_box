import { WeekData } from "@/types/metriks";
import { getDayNum } from "@/utils/BreakIntoWeeks";
import { getPauseTimeString } from "@/utils/getTimeString";
import { ChartData, ChartOptions } from "chart.js";
import clockImg from "assets/clock.svg";

const customPoint = new Image();
customPoint.src = clockImg;

export const useChart = (
  activeWeek: WeekData,
  activeDay: number,
  setActiveDay: React.Dispatch<React.SetStateAction<number>>
) => {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const colors = activeWeek.map(([day, dayData]) => {
    const { weekDay } = getDayNum(day);
    if (dayData === null) return "#C4C4C4";
    else if (weekDay === activeDay) return "#DC3E22";
    else return "#EA8A79";
  });

  const xAxisTextColor = activeWeek.map(([day]) => {
    const { weekDay } = getDayNum(day);
    if (weekDay === activeDay) return "#DC3E22";
    return "#999999";
  });

  const data = activeWeek.map(([, dayData]) => {
    if (!dayData) return 0;
    else return Math.floor(dayData.totalTime / 60);
  });
  const max = Math.max(...data);

  const chartData: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        minBarLength: 3,
        barPercentage: 0.8,
        data: data,
        backgroundColor: colors,
        pointStyle: customPoint,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    onClick: (_: unknown, activeElems: { index: number }[]): void => {
      if (!activeElems[0]) return;
      const { index } = activeElems[0];
      const newActiveDay: number = index === 6 ? 0 : index + 1;
      setActiveDay(newActiveDay);
    },
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        usePointStyle: true,
        callbacks: {
          title: (context) => {
            const barIndex = context[0].dataIndex;
            const targetDay = barIndex === 6 ? 0 : barIndex + 1;
            const targetDayData = activeWeek.find(([day]) => {
              const { weekDay } = getDayNum(day);
              return weekDay === targetDay;
            });
            if (targetDayData) {
              const dateFromTargetData = new Date(targetDayData[0]);
              return `${
                context[0].label
              } ${dateFromTargetData.toLocaleDateString()}`;
            }
          },
          label: (context) => {
            if (typeof context.raw !== "number") return;
            return `  ${getPauseTimeString(context.raw * 60)}`;
          },
        },
      },
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
          font: { weight: "normal", size: 24 },
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
          font: { weight: "normal", size: 12 },
        },
      },
    },
  };

  return { chartData, options };
};
