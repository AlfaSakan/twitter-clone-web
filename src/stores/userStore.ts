import type { User } from "@/models/userModel";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = ref({} as User);

  const getUser = computed(() => user.value);

  function addUser(newState: User) {
    user.value = { ...newState };
  }

  return {
    getUser,
    addUser,
  };
});
