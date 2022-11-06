<script setup lang="ts">
import type { Tweet } from "@/models/tweetModel";
import type { User } from "@/models/userModel";
import {
  getListTweetLikedApi,
  getListTweetsApi,
} from "@/services/tweetService";
import { getUserRequestApi } from "@/services/userService";
import { useAuthStore } from "@/stores/authStore";
import { convertTimeToMonthYear } from "@/utils/convertDate";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import ButtonSmallOutline from "../components/atoms/ButtonSmallOutline.vue";
import PictureRoundExtraLarge from "../components/atoms/PictureRoundExtraLarge.vue";
import TextIcon from "../components/atoms/TextIcon.vue";
import IconCalendar from "../components/icons/IconCalendar.vue";
import HeaderBack from "../components/organisms/HeaderBack.vue";
import TweetCard from "../components/organisms/TweetCard.vue";

const navbars = ["Tweets", "Retweets & replies", "Media", "Likes"];

const route = useRoute();
const router = useRouter();

const navbarActive = ref(0);
const user = ref({} as User);
const tweets = ref<Tweet[]>([]);
const { headersToken } = storeToRefs(useAuthStore());

const userId = ref(route.params.id as string);

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
    const response = await getListTweetLikedApi(userId.value);

    if (!response.data) return;

    tweets.value = response.data;
  } catch (error) {
    console.log("ERROR :", error);
  }
};
//#endregion

onMounted(() => {
  getUser();
  getTweet();
});

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
</script>

<template>
  <main
    class="flex-1 flex-col flex overflow-y-scroll md:ml-[25%] md:mr-[33.5%] md:relative"
  >
    <HeaderBack
      v-on:back-press="handleNavigateBack"
      :name="user.name"
      :total-tweets="1000"
      class="md:fixed md:z-10 md:w-[41.5%]"
    />
    <div class="flex-col relative mb-3 md:pt-15">
      <div class="bg-slate-300 h-48" />
      <div class="bg-white h-48 px-3">
        <div class="flex-col mt-18">
          <p class="text-xl font-bold">{{ user.name }}</p>
          <p class="text-slate-500 text-sm">@{{ user.username }}</p>
          <TextIcon
            :text="`Joined ${convertTimeToMonthYear(user.created_at || 0)}`"
            class="mt-3"
          >
            <template #icon>
              <IconCalendar class="w-5 fill-slate-500" />
            </template>
          </TextIcon>
          <div class="gap-4 text-slate-500 text-sm mt-3">
            <p><span class="font-bold text-black">100</span> Following</p>
            <p><span class="font-bold text-black">100</span> Followers</p>
          </div>
        </div>
        <ButtonSmallOutline
          text="Edit Profile"
          class="border-slate-400 text-black h-10 ml-auto mt-3"
        />
      </div>
      <PictureRoundExtraLarge
        :text="user.name"
        class="bg-black text-white border-4 border-white absolute top-32 md:top-48 left-3"
      />
    </div>
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
