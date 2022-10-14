import type { Session, Token } from "@/models/sessionModel";
import useTokenStorage from "@/storages/tokenStorage";
import { defineStore } from "pinia";
import { computed, onMounted, ref, type ComputedRef } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const tokenStorage = useTokenStorage();

  const auth = ref<Session>();

  const accessToken = computed(() => auth.value?.access_token || "");
  const refreshToken = computed(() => auth.value?.refresh_token || "");
  const headersToken: ComputedRef<Token> = computed(() => ({
    access_token: auth.value?.access_token || "",
    refresh_token: auth.value?.refresh_token || "",
  }));

  function addAuth(newState: Session) {
    tokenStorage.setItem(newState);
    auth.value = { ...newState };
  }

  function resetAuth() {
    tokenStorage.removeItem();
    auth.value = undefined;
  }

  onMounted(() => {
    auth.value = tokenStorage.getItem();
  });

  return {
    addAuth,
    accessToken,
    refreshToken,
    auth,
    resetAuth,
    headersToken,
  };
});
