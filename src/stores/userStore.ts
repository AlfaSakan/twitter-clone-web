import type { User } from "@/models/userModel";
import useUserStorage from "@/storages/userStorage";
import { defineStore } from "pinia";
import { computed, onMounted, ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const userStorage = useUserStorage();

  const user = ref<User>();

  const username = computed(() => `@${user.value?.username}`);
  const userId = computed(() => user.value?.id || "");

  function addUser(newState: User) {
    userStorage.setItem(newState);
    user.value = { ...newState };
  }

  function resetUser() {
    userStorage.removeItem();
    user.value = undefined;
  }

  onMounted(() => {
    user.value = userStorage.getItem();
  });

  return {
    user,
    addUser,
    username,
    resetUser,
    userId,
  };
});
