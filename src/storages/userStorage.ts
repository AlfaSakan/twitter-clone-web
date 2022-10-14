import type { User } from "@/models/userModel";

const USER = "user";

const useUserStorage = () => {
  const removeItem = () => {
    localStorage.removeItem(USER);
  };

  const setItem = (value: User) => {
    localStorage.setItem(USER, JSON.stringify(value));
  };

  const getItem = () => {
    const item = localStorage.getItem(USER);
    if (!item) return;

    return JSON.parse(item) as User;
  };

  return { setItem, getItem, removeItem };
};

export default useUserStorage;
