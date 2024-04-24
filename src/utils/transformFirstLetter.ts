export const transformFirstLetter = (string: string): string => {
  if (string.trim().length) {
    return `${string.at(0)?.toUpperCase()}${string.slice(1)}`;
  }
  return "";
};
