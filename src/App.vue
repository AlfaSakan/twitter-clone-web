<script setup lang="ts">
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { RouterView, useRouter } from "vue-router";
import FooterLayout from "./components/layouts/FooterLayout.vue";
import PrimaryLayout from "./components/layouts/PrimaryLayout.vue";
import ConfirmationDelete from "./components/molecules/ConfirmationDelete.vue";
import ModalDelete from "./components/molecules/ModalDelete.vue";
import ModalRetweet from "./components/molecules/ModalRetweet.vue";
import { useAuthStore } from "./stores/authStore";
import { useUserStore } from "./stores/userStore";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const authStore = useAuthStore();
const { accessToken } = storeToRefs(authStore);

const router = useRouter();

//#region HANDLER
const handleLogout = () => {
  userStore.resetUser();
  authStore.resetAuth();
};

const handleLogin = () => {
  router.push("/login");
};
//#endregion

watch(accessToken, (val) => {
  if (!val) {
    router.push("/login");
  }
});
</script>

<template>
  <PrimaryLayout
    :name="user?.name"
    :id="user?.id"
    :username="user?.username"
    @logout="handleLogout"
    @login="handleLogin"
    v-if="router.currentRoute.value.name !== 'login'"
  />
  <RouterView />
  <FooterLayout v-if="router.currentRoute.value.name !== 'login'" />
  <ModalRetweet />
  <ModalDelete />
  <ConfirmationDelete />
</template>
