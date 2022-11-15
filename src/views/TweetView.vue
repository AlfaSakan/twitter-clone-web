<script setup lang="ts">
import type { Tweet } from "@/models/tweetModel";
import { getRepliesApi } from "@/services/replyService";
import { getTweetApi } from "@/services/tweetService";
import { useAuthStore } from "@/stores/authStore";
import { useModalStore } from "@/stores/modalStore";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import HeaderBack from "../components/organisms/HeaderBack.vue";
import TweetCard from "../components/organisms/TweetCard.vue";
import TweetDetail from "../components/organisms/TweetDetail.vue";

//#region REQUIRED
const route = useRoute();
const router = useRouter();

const { headersToken } = storeToRefs(useAuthStore());

const modalStore = useModalStore();

const tweet = ref({} as Tweet);
const tweetId = ref(route.params.id as string);
const replies = ref<Tweet[]>([]);
const retweetRef = ref<Tweet>();

const isLoading = ref(false);
//#endregion

//#region REQUEST API
const tweetRequestApi = async () => {
  try {
    isLoading.value = true;
    const response = await getTweetApi(headersToken.value, tweetId.value);

    if (!response.data) return;

    await getReferenceTweetRequest(response.data.reference_id);
    await repliesRequestApi();
    tweet.value = response.data;
  } catch (error) {
    console.log("ERROR :", error);
  } finally {
    isLoading.value = false;
  }
};

// REPLY
const repliesRequestApi = async () => {
  try {
    const response = await getRepliesApi(headersToken.value, tweetId.value);

    if (!response.data) return;

    replies.value = response.data;
  } catch (error) {
    console.log("ERROR :", error);
  }
};

// RETWEET
const getReferenceTweetRequest = async (reference_id: string) => {
  try {
    if (!reference_id) {
      retweetRef.value = undefined;
      return;
    }

    const response = await getTweetApi(headersToken.value, reference_id);

    if (!response.data) throw response;

    retweetRef.value = response.data;
  } catch (error) {
    console.log("ERROR :", error);
  }
};
//#endregion

//#region HANDLER
const handleNavigateBack = () => {
  router.back();
};

const handleClickPictureRetweet = (userId?: string) => {
  router.push(`/${userId}`);
};

const handleClickRetweet = (referenceId: string) => {
  modalStore.toggleRetweet();
  modalStore.setSelectedId(referenceId);
};

const handleClickOption = (id: string) => {
  modalStore.toggleDelete();
  modalStore.setSelectedId(id);
};

const handleClickRemoveRetweet = (id: string) => {
  modalStore.toggleConfirmationDelete();
  modalStore.setSelectedId(id);
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
    class="flex-1 overflow-y-scroll flex-col lg:ml-[25%] lg:mr-[33.5%] lg:relative"
  >
    <HeaderBack
      v-on:back-press="handleNavigateBack"
      class="lg:w-[41.5%] lg:fixed"
    />
    <p v-if="!tweet?.content">Loading...</p>
    <TweetDetail
      v-else
      :tweet="tweet"
      class="lg:pt-15"
      :retweet="retweetRef"
      v-on:click-card="handleClickRetweet(tweet.reference_id)"
      v-on:click-picture-retweet="
        handleClickPictureRetweet(retweetRef?.user_id)
      "
    />
    <div v-if="replies.length > 0" class="flex-col">
      <TweetCard
        v-for="reply in replies"
        :key="reply.id"
        :tweet="reply"
        :replying-to="tweet.User?.username || ''"
        @click-options="handleClickOption(reply.id)"
        @click-remove-retweet="handleClickRemoveRetweet(reply.id)"
        @click-retweet="handleClickRetweet(reply.id)"
      />
    </div>
  </div>
</template>
