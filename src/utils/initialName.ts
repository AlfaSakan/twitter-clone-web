export function initialName(name: string) {
  if (!name) return "";

  const nameArr = name.split(" ");

  let initial = "";

  for (const nm of nameArr) {
    initial += nm[0].toUpperCase();
  }

  return initial;
}
