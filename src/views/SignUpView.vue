<script setup lang="ts">
import { loginRequestApi } from "@/services/authService";
import { createUserRequestApi } from "@/services/userService";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { reactive, watch } from "vue";
import { useRouter } from "vue-router";
import ButtonLarge from "../components/atoms/ButtonLarge.vue";
import TextInputBorder from "../components/atoms/TextInputBorder.vue";

const userStore = useUserStore();

const authStore = useAuthStore();
const { accessToken } = storeToRefs(authStore);

const router = useRouter();

const formRegister = reactive({
  name: "",
  email: "",
  username: "",
  password: "",
});

const handleSubmitLogin = async () => {
  try {
    const response = await loginRequestApi(formRegister);

    if (!response.data) return;

    authStore.addAuth(response.data);
  } catch (error) {
    console.log("ERROR :", error);
  }
};

const handleSubmitRegister = async (e: Event) => {
  try {
    e.preventDefault();
    const response = await createUserRequestApi(formRegister);
    if (!response.data) return;
    userStore.addUser(response.data);
    handleSubmitLogin();
  } catch (error) {
    console.log("ERROR :", error);
  }
};

watch(accessToken, (val) => {
  if (val) {
    router.push("/");
  }
});
</script>

<template>
  <main class="flex-1 flex-col flex p-4 gap-4">
    <form class="gap-4 flex flex-col" @submit="handleSubmitRegister">
      <TextInputBorder
        placeholder="name"
        type="text"
        v-model="formRegister.name"
      />
      <TextInputBorder
        placeholder="email"
        type="email"
        v-model="formRegister.email"
      />
      <TextInputBorder
        placeholder="username"
        type="text"
        v-model="formRegister.username"
      />
      <TextInputBorder
        placeholder="password"
        type="password"
        v-model="formRegister.password"
      />
      <ButtonLarge text="Register" type="submit" />
    </form>
    <RouterLink to="/login" class="w-full items-center justify-center flex">
      <a class="font-medium text-blue-400 text-sm">Login</a>
    </RouterLink>
  </main>
</template>
