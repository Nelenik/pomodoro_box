//function calculates time between two timestamps and converts it in seconds

export const calculateTime = (
  initTimestamp: number,
  finishedTimestamp: number
): number => {
  //period in ms
  const period = finishedTimestamp - initTimestamp;
  return Math.floor(period / 1000);
};
