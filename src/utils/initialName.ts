export function initialName(name: string) {
  if (!name) return "";

  const nameArr = name.split(" ");

  const firstLetter = nameArr[0][0].toUpperCase();

  if (nameArr.length === 1) return firstLetter;

  const secondLetter = nameArr[1][0].toUpperCase();

  return firstLetter + secondLetter;
}
