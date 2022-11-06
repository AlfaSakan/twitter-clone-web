<script setup lang="ts">
import type { Response } from "@/models/responseModel";
import { loginRequestApi } from "@/services/authService";
import { createUserRequestApi } from "@/services/userService";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import {
  checkingObjectForm,
  validateEmail,
  validateEmpty,
} from "@/utils/validateForm";
import { storeToRefs } from "pinia";
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import ButtonLarge from "../components/atoms/ButtonLarge.vue";
import TextInputBorder from "../components/atoms/TextInputBorder.vue";

interface RegisterForm {
  name: string;
  email: string;
  username: string;
  password: string;
}

const userStore = useUserStore();

const authStore = useAuthStore();
const { accessToken } = storeToRefs(authStore);

const router = useRouter();

const disabledButton = ref(true);

//#region FORM
const formRegister = reactive({
  name: "",
  email: "",
  username: "",
  password: "",
});

const formRegisterError = reactive<RegisterForm>({
  name: "",
  email: "",
  username: "",
  password: "",
});

const validateForm = () => {
  let isNotError = true;

  checkingObjectForm(formRegister, (key, value) => {
    let errorText = "";
    errorText = validateEmpty(key, value);
    if (!errorText && key === "email") {
      if (!validateEmail(value)) {
        errorText = "Masukkan email dengan benar";
      }
    }

    formRegisterError[key as keyof RegisterForm] = errorText;

    if (errorText) {
      isNotError = false;
    }
  });

  return isNotError;
};
//#endregion

//#region REQUEST
const handleSubmitLogin = async () => {
  try {
    const response = await loginRequestApi(formRegister);

    if (!response.data) return;

    authStore.addAuth(response.data);
  } catch (error) {
    console.log("ERROR :", error);
  }
};

const handleSubmitRegister = async () => {
  try {
    if (!validateForm()) return;

    const response = await createUserRequestApi(formRegister);

    if (!response.data) throw response;

    userStore.addUser(response.data);
    handleSubmitLogin();
  } catch (error) {
    const errorResponse = error as Response<null>;
    if (errorResponse.message) {
      if (errorResponse.message.includes("username")) {
        formRegisterError.username = "this username already exist";
        return;
      }
      if (errorResponse.message.includes("email")) {
        formRegisterError.email = "this email already exist";
        return;
      }
    }
    console.log("ERROR :", error);
  }
};
//#endregion

//#region WATCHER
watch(accessToken, (val) => {
  if (val) {
    router.push("/");
  }
});

watch(formRegister, (val) => {
  if (val.name) {
    formRegisterError.name = "";
  }
  if (val.email) {
    formRegisterError.email = "";
  }
  if (val.username) {
    formRegisterError.username = val.username.includes(" ")
      ? "tidak boleh ada spasi"
      : "";
  }
  if (val.password) {
    formRegisterError.password = "";
  }

  if (
    validateEmail(val.email) &&
    val.name &&
    val.password &&
    val.username &&
    !val.username.includes(" ")
  ) {
    disabledButton.value = false;
  } else {
    disabledButton.value = true;
  }
});
//#endregion
</script>

<template>
  <main class="flex-1 flex-col flex p-4 gap-2">
    <TextInputBorder
      placeholder="name"
      type="text"
      v-model="formRegister.name"
      :error="formRegisterError.name"
    />
    <TextInputBorder
      placeholder="email"
      type="email"
      v-model="formRegister.email"
      :error="formRegisterError.email"
    />
    <TextInputBorder
      placeholder="username"
      type="text"
      v-model="formRegister.username"
      :error="formRegisterError.username"
    />
    <TextInputBorder
      placeholder="password"
      type="password"
      v-model="formRegister.password"
      :error="formRegisterError.password"
    />
    <ButtonLarge
      :disabled="disabledButton"
      text="Register"
      @click="handleSubmitRegister"
      class="mt-5"
    />
    <RouterLink
      to="/login"
      class="w-fit mx-auto mt-2 items-center justify-center flex"
    >
      <a class="font-medium text-blue-400 text-sm">Login</a>
    </RouterLink>
  </main>
</template>
