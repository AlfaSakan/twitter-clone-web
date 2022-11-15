<script setup lang="ts">
import TweetCard from "@/components/organisms/TweetCard.vue";
import type { Tweet } from "@/models/tweetModel";
import { getAllTweetsApi } from "@/services/tweetService";
import { useAuthStore } from "@/stores/authStore";
import { useModalStore } from "@/stores/modalStore";
import { useTweetStore } from "@/stores/tweetStore";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted, ref } from "vue";
import { RouterLink } from "vue-router";
import IconAddTweet from "../components/icons/IconAddTweet.vue";
import IconSpark from "../components/icons/IconSpark.vue";
import CreateTweet from "../components/organisms/CreateTweet.vue";

//#region REQUIRE
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const authStore = useAuthStore();
const { headersToken } = storeToRefs(authStore);

const tweetStore = useTweetStore();

const modalStore = useModalStore();

const tweetsList = ref<Tweet[]>([]);
const intervalId = ref(0);

const isLoading = ref(false);
const page = ref(1);
const isBottom = ref(false);
const isLastPage = ref(false);

const tweetMap = ref(new Map<string, Tweet>());

//#endregion

const updateTweetMap = (valMap: Map<string, Tweet>, tweets: Tweet[]) => {
  for (const tw of tweets) {
    if (!valMap.has(tw.id)) {
      valMap.set(tw.id, tw);
    }
  }
};

//#region REQUEST API
const tweetsRequestApi = async (page?: number) => {
  try {
    isLoading.value = true;
    const response = await getAllTweetsApi(headersToken.value, page);

    console.log(response);

    if (!response.data) throw response;

    if (response.data.length < 10) {
      isLastPage.value = true;
    } else {
      isLastPage.value = false;
    }

    tweetStore.addListTweets(response.data);

    updateTweetMap(tweetMap.value, response.data);
    tweetsList.value = Array.from(tweetMap.value, ([_, value]) => value);
  } catch (error) {
    console.log("ERROR :", error);
  } finally {
    isLoading.value = false;
  }
};
//#endregion

const loopingGetTweets = () => {
  intervalId.value = setInterval(() => {
    if (isLoading.value) return;
    tweetsRequestApi();
  }, 10000);
};

//#region ONMOUNT
onMounted(() => {
  tweetsRequestApi();
  setTimeout(() => {
    loopingGetTweets();
  }, 10000);
});

onUnmounted(() => {
  clearInterval(intervalId.value);
});
//#endregion

//#region HANDLER
const handleClickRetweet = (id: string) => {
  modalStore.toggleRetweet();
  modalStore.setSelectedId(id);
};

const handleClickOption = (id: string) => {
  modalStore.toggleDelete();
  modalStore.setSelectedId(id);
};

const handleClickRemoveRetweet = (id: string) => {
  modalStore.toggleConfirmationDelete();
  modalStore.setSelectedId(id);
};

const handleScroll = (e: Event) => {
  const { scrollTop, offsetHeight, scrollHeight } = e.target as HTMLDivElement;
  // console.log({ scrollTop, offsetHeight, scrollHeight });

  if (isLastPage.value || isLoading.value) return;

  if (scrollTop + offsetHeight >= scrollHeight - 100) {
    isBottom.value = true;
    tweetsRequestApi((page.value += 1));
    console.log("bottom!");
    return;
  }

  isBottom.value = false;
};
//#endregion
</script>

<template>
  <main
    class="flex-1 flex flex-col overflow-y-scroll relative lg:overflow-visible lg:ml-[25%] lg:mr-[33.5%]"
    @scroll="handleScroll"
  >
    <div class="hidden lg:block lg:w-full">
      <div
        class="justify-between px-4 py-3 fixed w-full backdrop-blur-sm bg-white bg-opacity-90"
      >
        <p class="text-xl font-bold">Home</p>
        <IconSpark class="w-6" />
      </div>
      <CreateTweet :name="user?.name" class="pt-16" />
    </div>
    <div class="flex-col">
      <TweetCard
        :tweet="tweet"
        v-for="tweet in tweetsList"
        :key="tweet.id"
        @click-retweet="handleClickRetweet(tweet.id)"
        @click-options="handleClickOption(tweet.id)"
        @click-remove-retweet="handleClickRemoveRetweet(tweet.id)"
      />
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
