export const truncateWithNewLine = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "\n" + text.slice(maxLength);
};
