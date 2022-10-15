<script setup lang="ts">
import type { Tweet } from "@/models/tweetModel";
import { getTweetApi } from "@/services/tweetService";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import HeaderBack from "../components/organisms/HeaderBack.vue";
import TweetDetail from "../components/organisms/TweetDetail.vue";

const route = useRoute();
const router = useRouter();

const { headersToken } = storeToRefs(useAuthStore());

const tweet = ref({} as Tweet);

//#region REQUEST API
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
//#endregion

//#region Handler
const handleNavigateBack = () => {
  router.back();
};
//#endregion

onMounted(() => {
  tweetRequestApi();
});
</script>

<template>
  <div class="flex-1 overflow-y-scroll flex-col">
    <HeaderBack v-on:back-press="handleNavigateBack" />
    <p v-if="!tweet?.content">Loading...</p>
    <TweetDetail v-else :tweet="tweet" />
  </div>
</template>
