const getHoursFromMin = (minutes: number): { hours: number; min: number } => {
  const hours = Math.floor(minutes / 60);
  const restMin = minutes % 60;
  return { hours, min: restMin };
};

const getTimeString = (minutes: number = 0): string => {
  const { hours, min } = getHoursFromMin(minutes);
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

export default getTimeString;
