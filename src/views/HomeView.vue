<script setup lang="ts">
import TweetCard from "@/components/organisms/TweetCard.vue";
import type { Tweet } from "@/models/tweetModel";
import { getAllTweetsApi } from "@/services/tweetService";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import IconAddTweet from "../components/icons/IconAddTweet.vue";
import IconSpark from "../components/icons/IconSpark.vue";
import CreateTweet from "../components/organisms/CreateTweet.vue";

//#region REQUIRE
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const authStore = useAuthStore();
const { headersToken } = storeToRefs(authStore);

const tweetsList = ref<Tweet[]>([]);
//#endregion

//#region REQUEST API
const tweetsRequestApi = async () => {
  try {
    const response = await getAllTweetsApi(headersToken.value);

    if (!response.data) return;

    tweetsList.value = response.data;
  } catch (error) {
    console.log("ERROR :", error);
  }
};
//#endregion

//#region ONMOUNT
onMounted(() => {
  tweetsRequestApi();
});
//#endregion
</script>

<template>
  <main
    class="flex-1 flex flex-col overflow-y-scroll relative md:overflow-visible md:ml-[25%] md:mr-[33.5%]"
  >
    <div class="hidden md:block md:w-full">
      <div
        class="justify-between px-4 py-3 fixed w-full backdrop-blur-sm bg-white bg-opacity-90"
      >
        <p class="text-xl font-bold">Home</p>
        <IconSpark class="w-6" />
      </div>
      <CreateTweet :name="user?.name" class="pt-16" />
    </div>
    <div class="flex-col">
      <TweetCard :tweet="tweet" v-for="tweet in tweetsList" :key="tweet.id" />
    </div>
    <RouterLink
      v-if="user?.id"
      to="/add-tweet"
      class="fixed bottom-18 right-5"
      data-cy="btn-add-tweet"
    >
      <div class="rounded-full p-3 bg-blue-400 hover:bg-blue-500">
        <IconAddTweet class="w-6 fill-white" />
      </div>
    </RouterLink>
  </main>
</template>
