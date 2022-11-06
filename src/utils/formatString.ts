export const toTitleCase = (value: string) => {
  if (value.length === 0) return "";

  return value[0].toUpperCase() + value.substring(1);
};
