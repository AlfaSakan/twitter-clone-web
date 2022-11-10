<script setup lang="ts">
import PictureRounded from "@/components/atoms/PictureRounded.vue";
import { useRouter } from "vue-router";
import ButtonMedium from "../atoms/ButtonMedium.vue";
import ButtonSmallOutline from "../atoms/ButtonSmallOutline.vue";
import TextIcon from "../atoms/TextIcon.vue";
import IconExplore from "../icons/IconExplore.vue";
import IconHome from "../icons/IconHome.vue";
import IconMessage from "../icons/IconMessage.vue";
import IconNotification from "../icons/IconNotification.vue";
import IconTwitter from "../icons/IconTwitter.vue";
import ProfileCard from "../molecules/ProfileCard.vue";

export interface Props {
  name?: string;
  username?: string;
  id?: string;
  onLogout(): void;
  onLogin(): void;
}

const props = withDefaults(defineProps<Props>(), {
  name: "Empty",
  username: "",
  id: "",
  onLogin: () => {},
  onLogout: () => {},
});

//#region NAVBAR
interface Navbar {
  name: string;
  Icon: any;
}

const navbars: Navbar[] = [
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

const handleNavbar = (dest: string) => {
  let page = "";

  switch (dest) {
    case "Profile":
      page = `/${props.id}`;
      break;
    default:
      page = "/";
      break;
  }

  router.push(page);
};
//#endregion
</script>

<template>
  <header
    class="flex p-3 border-b justify-between lg:flex-col lg:w-1/4 lg:border-r lg:gap-5 lg:justify-start lg:fixed lg:h-full lg:items-end"
  >
    <div class="flex-1 cursor-pointer lg:hidden" @click="handleNavigateUser">
      <PictureRounded :text="name" />
    </div>
    <RouterLink to="/" class="flex flex-1 justify-center lg:hidden">
      <IconTwitter class="w-8 fill-blue-400" />
    </RouterLink>
    <div class="flex-1 justify-end lg:hidden">
      <ButtonSmallOutline v-if="id" text="Logout" @click="onLogout" />
      <ButtonSmallOutline v-else text="Login" @click="onLogin" />
    </div>
    <div class="flex-col hidden lg:flex lg:gap-5 h-full">
      <RouterLink
        to="/"
        class="hover:bg-blue-100 w-fit p-2 rounded-full transition-colors duration-300"
      >
        <IconTwitter class="w-8 fill-blue-400" />
      </RouterLink>
      <TextIcon
        :text="navbar.name"
        class="cursor-pointer hover:bg-slate-200 w-fit pl-3 py-3 pr-7 font-bold text-lg text-black rounded-full transition-colors duration-300 gap-5"
        v-for="(navbar, index) in navbars"
        :key="navbar.name + index.toString()"
        @click="handleNavbar(navbar.name)"
      >
        <template #icon>
          <Component :is="navbar.Icon" class="w-7 fill-black" />
        </template>
      </TextIcon>
      <ButtonMedium text="Tweet" class="w-60" />
      <ProfileCard :name="name" :username="username" class="mt-auto" />
    </div>
  </header>
</template>
