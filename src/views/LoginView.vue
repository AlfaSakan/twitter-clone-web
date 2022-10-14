<script setup lang="ts">
import { loginRequestApi } from "@/services/authService";
import { getUserMeRequestApi } from "@/services/userService";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { reactive, watch } from "vue";
import { useRouter } from "vue-router";
import ButtonLarge from "../components/atoms/ButtonLarge.vue";
import TextInputBorder from "../components/atoms/TextInputBorder.vue";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const authStore = useAuthStore();
const { headersToken, accessToken } = storeToRefs(authStore);

const router = useRouter();

const formLogin = reactive({
  username: "",
  password: "",
});

const handleSubmitLogin = async () => {
  try {
    const response = await loginRequestApi(formLogin);

    if (!response.data) return;

    authStore.addAuth(response.data);
  } catch (error) {
    console.log("ERROR :", error);
  }
};

const userRequestApi = async () => {
  try {
    const response = await getUserMeRequestApi(headersToken.value);

    if (!response?.data) {
      router.push("/login");
      return;
    }

    userStore.addUser(response.data);
  } catch (error) {
    console.log("ERROR :", error);
    router.push("/login");
  }
};

watch(accessToken, (val) => {
  if (val) {
    userRequestApi();
  }
});

watch(user, (val) => {
  if (val) {
    router.push("/");
  }
});
</script>

<template>
  <main class="flex-1 p-4 flex-col gap-4 flex">
    <TextInputBorder
      placeholder="username"
      type="text"
      v-model="formLogin.username"
    />
    <TextInputBorder
      placeholder="password"
      type="password"
      v-model="formLogin.password"
    />
    <ButtonLarge text="Login" @click="handleSubmitLogin" />
    <RouterLink to="/register" class="w-full items-center justify-center flex">
      <a class="font-medium text-blue-400 text-sm">Register</a>
    </RouterLink>
  </main>
</template>
