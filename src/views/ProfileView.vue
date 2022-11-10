<script setup lang="ts">
import type { Tweet } from "@/models/tweetModel";
import type { User } from "@/models/userModel";
import {
  getListTweetLikedApi,
  getListTweetsApi,
} from "@/services/tweetService";
import { getUserRequestApi } from "@/services/userService";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import HeaderBack from "../components/organisms/HeaderBack.vue";
import TweetCard from "../components/organisms/TweetCard.vue";
import HeaderProfile from "@/components/organisms/HeaderProfile.vue";

//#region REQUIRED
const navbars = ["Tweets", "Retweets & replies", "Media", "Likes"];

const route = useRoute();
const router = useRouter();

const navbarActive = ref(0);
const user = ref({} as User);
const tweets = ref<Tweet[]>([]);
const { headersToken } = storeToRefs(useAuthStore());

const userId = ref(route.params.id as string);
//#endregion

//#region Handler
const handleNavbar = (index: number) => {
  navbarActive.value = index;
};

const handleNavigateBack = () => {
  router.back();
};
//#endregion

//#region Request Api
// GET USER
const getUser = async () => {
  try {
    const response = await getUserRequestApi(userId.value);

    if (!response.data) return;

    user.value = response.data;
  } catch (error) {
    console.log("ERROR :", error);
  }
};

// GET TWEET
const getTweet = async () => {
  try {
    tweets.value = [];
    const response = await getListTweetsApi(headersToken.value, userId.value);

    if (!response.data) return;

    tweets.value = response.data;
  } catch (error) {
    console.log("ERROR :", error);
  }
};

// GET TWEET LIKED
const getTweetLiked = async () => {
  try {
    tweets.value = [];
    const response = await getListTweetLikedApi(headersToken.value);

    if (!response.data) return;

    tweets.value = response.data;
  } catch (error) {
    console.log("ERROR :", error);
  }
};
//#endregion

//#region ONMOUNTED
onMounted(() => {
  getUser();
  getTweet();
});
//#endregion

//#region WATCH
watch(navbarActive, (val) => {
  switch (val) {
    case 0:
      getTweet();
      break;
    case 3:
      getTweetLiked();
      break;
    default:
      getTweet();
      break;
  }
});
//#endregion
</script>

<template>
  <main
    class="flex-1 flex-col flex overflow-y-scroll lg:ml-[25%] lg:mr-[33.5%] lg:relative"
  >
    <HeaderBack
      v-on:back-press="handleNavigateBack"
      :name="user.name"
      :total-tweets="1000"
      class="lg:fixed lg:z-10 lg:w-[41.5%]"
    />
    <HeaderProfile :user="user" />
    <div class="border-b">
      <button
        v-for="(navbar, index) in navbars"
        :key="navbar + index"
        :class="`py-4 flex-grow hover:bg-slate-200 transition-colors duration-300 ${
          index === navbarActive ? 'text-black' : 'text-slate-400'
        }`"
        @click="handleNavbar(index)"
      >
        <p class="font-bold">{{ navbar }}</p>
      </button>
    </div>

    <div class="flex-col">
      <TweetCard v-for="tweet in tweets" :key="tweet.id" :tweet="tweet" />
    </div>
  </main>
</template>
