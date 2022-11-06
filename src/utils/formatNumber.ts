export const formatThousand = (num: number | string) => {
  if (typeof num === "number") {
    num = num.toString();
  }

  let formated = 0;

  switch (num.length) {
    case 5:
    case 6:
      formated = Number(num) / 1000;
      return `${formated.toFixed(1)}K`;

    case 7:
    case 8:
      formated = Number(num) / 1000000;
      return `${formated.toFixed(1)}M`;
    default:
      return num;
  }
};

export const zeroPad = (num: number, places: number) =>
  String(num).padStart(places, "0");
