export const calculateFocus = (
  totalTime: number,
  tomatoesCount: number,
  tomatoDuration: number
): number => {
  if (tomatoesCount === 0) return 0;
  return (totalTime / (tomatoesCount * tomatoDuration)) * 100;
};
