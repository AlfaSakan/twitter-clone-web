<script setup lang="ts">
import PictureRounded from "@/components/atoms/PictureRounded.vue";
import { useRouter } from "vue-router";
import ButtonSmall from "../atoms/ButtonSmall.vue";
import ButtonSmallOutline from "../atoms/ButtonSmallOutline.vue";
import PictureRoundLarge from "../atoms/PictureRoundLarge.vue";
import TextIcon from "../atoms/TextIcon.vue";
import IconExplore from "../icons/IconExplore.vue";
import IconHome from "../icons/IconHome.vue";
import IconMessage from "../icons/IconMessage.vue";
import IconNotification from "../icons/IconNotification.vue";
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

//#region NAVBAR
const navbars = [
  {
    name: "Home",
    Icon: IconHome,
  },
  {
    name: "Explore",
    Icon: IconExplore,
  },
  {
    name: "Notification",
    Icon: IconNotification,
  },
  {
    name: "Messages",
    Icon: IconMessage,
  },
  {
    name: "Bookmarks",
    Icon: IconMessage,
  },
  {
    name: "Profile",
    Icon: IconMessage,
  },
];
//#endregion

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
  <header
    class="flex p-3 border-b justify-between md:flex-col md:w-1/4 md:border-r md:pl-24 md:gap-5 md:justify-start md:fixed"
  >
    <div class="flex-1 cursor-pointer md:hidden" @click="handleNavigateUser">
      <PictureRounded :text="name" />
    </div>
    <RouterLink
      to="/"
      class="flex flex-1 justify-center md:flex-[0] md:justify-start md:pl-3"
    >
      <IconTwitter class="w-8 fill-blue-400" />
    </RouterLink>
    <div class="flex-1 justify-end md:hidden">
      <ButtonSmallOutline v-if="id" text="Logout" @click="onLogout" />
      <ButtonSmallOutline v-else text="Login" @click="onLogin" />
    </div>
    <div class="flex-col hidden md:flex md:gap-5">
      <TextIcon
        :text="navbar.name"
        class="cursor-pointer hover:bg-slate-200 w-fit pl-3 py-3 pr-7 font-bold text-lg text-black rounded-full transition-colors duration-300 gap-5"
        v-for="(navbar, index) in navbars"
        :key="navbar.name + index.toString()"
      >
        <template #icon>
          <navbar.Icon class="w-7 fill-black" />
        </template>
      </TextIcon>
      <ButtonSmall text="Tweet" class="py-3 w-60" />
    </div>
    <TextIcon text="Profile" class="hidden md:flex justify-self-end mt-auto">
      <template #icon>
        <PictureRoundLarge :text="name" />
      </template>
    </TextIcon>
  </header>
</template>
