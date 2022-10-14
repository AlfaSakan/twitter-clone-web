<script setup lang="ts">
import PictureRounded from "@/components/atoms/PictureRounded.vue";
import { useRouter } from "vue-router";
import ButtonSmallOutline from "../atoms/ButtonSmallOutline.vue";
import IconTwitter from "../icons/IconTwitter.vue";

export interface Props {
  name?: string;
  id?: string;
  onLogout(): void;
  onLogin(): void;
}

const props = withDefaults(defineProps<Props>(), {
  name: "Empty",
  id: "",
  onLogin: () => {},
  onLogout: () => {},
});

//#region REQUIRED
const router = useRouter();
//#endregion

//#region HANDLER
const handleNavigateUser = () => {
  router.push(`/${props.id}`);
};
//#endregion
</script>

<template>
  <header class="flex p-3 border-b justify-between">
    <div class="flex-1 cursor-pointer" @click="handleNavigateUser">
      <PictureRounded :text="name" />
    </div>
    <RouterLink to="/" class="flex flex-1 justify-center">
      <IconTwitter class="w-8 fill-blue-400" />
    </RouterLink>
    <div class="flex-1 justify-end">
      <ButtonSmallOutline v-if="id" text="Logout" @click="onLogout" />
      <ButtonSmallOutline v-else text="Login" @click="onLogin" />
    </div>
  </header>
</template>
