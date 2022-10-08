<script setup lang="ts">
import PictureRounded from "@/components/atoms/PictureRounded.vue";
import { useUserStore } from "@/stores/userStore";
import { ref, watch } from "vue";
import IconTwitter from "../icons/IconTwitter.vue";

const userStore = useUserStore();

const { getUser } = userStore;

const userName = ref("");

console.log({ getUser });
watch(
  getUser,
  (prev, next) => {
    userName.value = getUser.name;
  },
  { deep: true }
);
</script>

<template>
  <header class="flex p-3 border-b justify-between">
    <PictureRounded :text="getUser.name" />
    <RouterLink to="/">
      <IconTwitter class="w-8 fill-blue-400" />
    </RouterLink>
    <PictureRounded text="ASU" />
  </header>
</template>
