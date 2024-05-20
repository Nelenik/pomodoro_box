export const calculateFocus = (
  totalTime: number,
  timeOnPause: number
): number => {
  const workingTime = totalTime - timeOnPause;
  if (totalTime === 0) return 0;
  return Math.trunc((workingTime * 100) / totalTime);
};
