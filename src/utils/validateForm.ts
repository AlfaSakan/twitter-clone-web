import { toTitleCase } from "./formatString";

const REGEX_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateEmpty = (key: string, value: string) => {
  if (!value) return toTitleCase(key) + " tidak boleh kosong";

  return "";
};

export const validateEmail = (value: string) => {
  if (!value) return false;

  const isMatch = REGEX_EMAIL.test(value.toLowerCase());

  return isMatch;
};

export const checkingObjectForm = <ValueType>(
  objs: { [index: string]: ValueType },
  callback: (key: string, value: ValueType) => void
) => {
  for (const [key, value] of Object.entries(objs)) {
    callback(key, value);
  }
};

export const checkingValueFilled = <ValueType>(objs: {
  [index: string]: ValueType;
}) => {
  checkingObjectForm(objs, (_, value) => {
    if (!value) {
      return false;
    }
  });

  return true;
};
