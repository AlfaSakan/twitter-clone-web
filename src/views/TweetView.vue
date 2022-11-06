<script setup lang="ts">
import type { Tweet } from "@/models/tweetModel";
import { getRepliesApi } from "@/services/replyService";
import { getTweetApi } from "@/services/tweetService";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import HeaderBack from "../components/organisms/HeaderBack.vue";
import TweetCard from "../components/organisms/TweetCard.vue";
import TweetDetail from "../components/organisms/TweetDetail.vue";

const route = useRoute();
const router = useRouter();

const { headersToken } = storeToRefs(useAuthStore());

const tweet = ref({} as Tweet);
const tweetId = ref(route.params.id as string);
const replies = ref<Tweet[]>([]);

//#region REQUEST API
const tweetRequestApi = async () => {
  try {
    const response = await getTweetApi(headersToken.value, tweetId.value);

    if (!response.data) return;

    repliesRequestApi();
    tweet.value = { ...response.data };
  } catch (error) {
    console.log("ERROR :", error);
  }
};

const repliesRequestApi = async () => {
  try {
    const response = await getRepliesApi(headersToken.value, tweetId.value);

    if (!response.data) return;

    replies.value = response.data;
  } catch (error) {
    console.log("ERROR :", error);
  }
};
//#endregion

//#region Handler
const handleNavigateBack = () => {
  router.back();
};
//#endregion

//#region ONMOUNTED
onMounted(() => {
  tweetRequestApi();
});
//#endregion

//#region WATCHER
watch(route, (val) => {
  tweetId.value = val.params.id as string;
  tweetRequestApi();
});
//#endregion
</script>

<template>
  <div
    class="flex-1 overflow-y-scroll flex-col md:ml-[25%] md:mr-[33.5%] md:relative"
  >
    <HeaderBack
      v-on:back-press="handleNavigateBack"
      class="md:w-[41.5%] md:fixed"
    />
    <p v-if="!tweet?.content">Loading...</p>
    <TweetDetail v-else :tweet="tweet" class="md:pt-15" />
    <div v-if="replies.length > 0" class="flex-col">
      <TweetCard
        v-for="reply in replies"
        :key="reply.id"
        :tweet="reply"
        :replying-to="tweet.User.username"
      />
    </div>
  </div>
</template>
