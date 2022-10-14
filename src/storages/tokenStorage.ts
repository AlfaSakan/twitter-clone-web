import type { Session } from "@/models/sessionModel";

const TOKEN = "token";

const useTokenStorage = () => {
  const removeItem = () => {
    localStorage.removeItem(TOKEN);
  };

  const setItem = (value: Session) => {
    localStorage.setItem(TOKEN, JSON.stringify(value));
  };

  const getItem = () => {
    const item = localStorage.getItem(TOKEN);
    if (!item) return;

    return JSON.parse(item) as Session;
  };

  return { setItem, getItem, removeItem };
};

export default useTokenStorage;
