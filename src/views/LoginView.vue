<script setup lang="ts">
import type { Response } from "@/models/responseModel";
import { loginRequestApi } from "@/services/authService";
import { getUserMeRequestApi } from "@/services/userService";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { checkingObjectForm, validateEmpty } from "@/utils/validateForm";
import { storeToRefs } from "pinia";
import { reactive, watch } from "vue";
import { useRouter } from "vue-router";
import ButtonLarge from "../components/atoms/ButtonLarge.vue";
import TextInputBorder from "../components/atoms/TextInputBorder.vue";

interface LoginForm {
  username: string;
  password: string;
}

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const authStore = useAuthStore();
const { headersToken, accessToken } = storeToRefs(authStore);

const router = useRouter();

//#region FROM
const formLogin = reactive({
  username: "",
  password: "",
});

const formLoginError = reactive<LoginForm>({
  username: "",
  password: "",
});

const validateForm = () => {
  let isNotError = true;

  checkingObjectForm(formLogin, (key, value) => {
    const errorText = validateEmpty(key, value);
    formLoginError[key as keyof LoginForm] = errorText;
    if (errorText) {
      isNotError = false;
    }
  });

  return isNotError;
};
//#endregion

//#region REQUEST API
// LOGIN
const handleSubmitLogin = async () => {
  try {
    if (!validateForm()) return;

    const response = await loginRequestApi(formLogin);

    if (!response.data) throw response;

    authStore.addAuth(response.data);
  } catch (error) {
    console.error("ERROR :", error);
    if (
      (error as Response<string>).message.toLowerCase().includes("username")
    ) {
      formLoginError.username = "Username tidak ditemukan";
      return;
    }
    formLoginError.password = "Password Salah";
  }
};

// USER
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
//#endregion

//#region WATCH
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

watch(formLogin, (val) => {
  if (val.username) {
    formLoginError.username = "";
  }
  if (val.password) {
    formLoginError.password = "";
  }
});
//#endregion
</script>

<template>
  <main class="flex-1 p-4 flex-col gap-2 flex">
    <TextInputBorder
      placeholder="Username"
      type="text"
      v-model="formLogin.username"
      :error="formLoginError.username"
    />
    <TextInputBorder
      placeholder="Password"
      type="password"
      v-model="formLogin.password"
      :error="formLoginError.password"
    />
    <ButtonLarge
      class="mt-5"
      data-cy="btn-submit-login"
      text="Login"
      @click="handleSubmitLogin"
    />
    <RouterLink to="/register" class="w-full items-center justify-center flex">
      <a class="font-medium text-blue-400 text-sm">Register</a>
    </RouterLink>
  </main>
</template>
