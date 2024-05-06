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
  let hourDefinition: string;
  switch (true) {
    case hours % 100 !== 11 && hours % 10 === 1: {
      hourDefinition = "час";
      break;
    }
    case hours % 100 !== 12 && hours % 10 === 2:
    case hours % 100 !== 13 && hours % 10 === 3:
    case hours % 100 !== 14 && hours % 10 === 4: {
      hourDefinition = "часа";
      break;
    }
    default: {
      hourDefinition = "часов";
      break;
    }
  }
  return `${hours} ${hourDefinition} ${min} мин`;
};

export const getTimerTimeString = (seconds: number): string => {
  const { min, sec } = getTimePartsFromSec(seconds);
  return `${min.toString().padStart(2, "0")}:${sec
    .toString()
    .padStart(2, "0")}`;
};
