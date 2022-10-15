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

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const authStore = useAuthStore();
const { headersToken } = storeToRefs(authStore);

const tweetsList = ref<Tweet[]>([]);

const tweetsRequestApi = async () => {
  try {
    const response = await getAllTweetsApi(headersToken.value);

    if (!response.data) return;

    tweetsList.value = response.data;
  } catch (error) {
    console.log("ERROR :", error);
  }
};

onMounted(() => {
  tweetsRequestApi();
});
</script>

<template>
  <main
    class="flex-1 flex flex-col overflow-y-scroll relative md:overflow-visible"
  >
    <div class="flex-col">
      <TweetCard :tweet="tweet" v-for="tweet in tweetsList" :key="tweet.id" />
    </div>
    <RouterLink
      v-if="user?.id"
      to="/add-tweet"
      class="fixed bottom-18 right-5"
      data-cy="btn-add-tweet"
    >
      <div class="rounded-full p-3 bg-blue-400">
        <IconAddTweet class="w-6 fill-white" />
      </div>
    </RouterLink>
  </main>
</template>
