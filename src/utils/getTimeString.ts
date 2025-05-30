import { getWordEndigs } from "./getWordEnding";

const getTimePartsFromSec = (
  totalSeconds: number
): { hours: number; min: number; sec: number } => {
  const hours = Math.floor(totalSeconds / 3600);
  const min = Math.floor((totalSeconds % 3600) / 60);
  const sec = totalSeconds % 60;
  return { hours, min, sec };
};

export const getTasksTimeString = (seconds: number = 0): string => {
  const { hours, min } = getTimePartsFromSec(seconds);
  const hourDefinition: string = getWordEndigs(hours, [
    "hour",
    "hours",
    "hours",
  ]);
  return `${hours} ${hourDefinition} ${min} min`;
};

export const getTimerTimeString = (seconds: number): string => {
  const { min, sec } = getTimePartsFromSec(seconds);
  return `${min.toString().padStart(2, "0")}:${sec
    .toString()
    .padStart(2, "0")}`;
};
//statistic page
export const getTotalTimeString = (seconds: number): string => {
  const { hours, min } = getTimePartsFromSec(seconds);
  const areHours = hours > 0;
  const hoursPart = areHours
    ? `${hours} ${getWordEndigs(hours, ["hour", "hours", "hours"])}`
    : "";
  const minPart = `${min} ${getWordEndigs(min, [
    "minute",
    "minutes",
    "minutes",
  ])}`;
  return hoursPart + " " + minPart;
};

export const getPauseTimeString = (seconds: number): string => {
  const { hours, min } = getTimePartsFromSec(seconds);
  return `${hours > 0 ? `${hours}h ` : ""}${min}m`;
};
