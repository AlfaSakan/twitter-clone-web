<script setup lang="ts">
import type { Tweet } from "@/models/tweetModel";
import { getTweetApi, patchLikeTweetApi } from "@/services/tweetService";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import TweetDetail from "../components/organisms/TweetDetail.vue";

const route = useRoute();

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const { headersToken } = storeToRefs(useAuthStore());

const tweet = ref({} as Tweet);

const tweetRequestApi = async () => {
  try {
    const response = await getTweetApi(
      headersToken.value,
      route.params.id as string
    );

    if (!response.data) return;

    tweet.value = { ...response.data };
  } catch (error) {
    console.log("ERROR :", error);
  }
};

const handleLikeRequest = async () => {
  if (!user.value?.id) return;
  try {
    const response = await patchLikeTweetApi(headersToken.value, {
      tweet_id: tweet.value.id,
    });

    if (!response.data) throw new Error(response.message);

    const newIsLike = !tweet.value.is_like;
    tweet.value.is_like = newIsLike;

    if (newIsLike) {
      tweet.value.likes++;
      return;
    }
    tweet.value.likes--;
  } catch (error) {
    console.log("ERROR :", error);
  }
};

onMounted(() => {
  tweetRequestApi();
});
</script>

<template>
  <div class="flex-1 overflow-y-scroll flex-col">
    <p v-if="!tweet?.content">Loading...</p>
    <TweetDetail v-else :tweet="tweet" @click-like="handleLikeRequest" />
  </div>
</template>
