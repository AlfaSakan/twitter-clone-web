<script setup lang="ts">
import TweetCard from "@/components/organisms/TweetCard.vue";
import type { Tweet } from "@/models/tweetModel";
import type { User } from "@/models/userModel";
import { getListTweetsApi, patchLikeTweetApi } from "@/services/tweetService";
import { getUserRequestApi } from "@/services/userService";
import { useUserStore } from "@/stores/userStore";
import { onMounted, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import IconAddTweet from "../components/icons/IconAddTweet.vue";

const router = useRouter();

const userStore = useUserStore();

const tweetsList = ref<Tweet[]>([]);
const user = ref<User>({} as User);

const userId = ref("29861cae-f5fb-4c6e-89be-4307038cd914");

const userRequestApi = async () => {
  try {
    const response = await getUserRequestApi(userId.value);

    if (!response.data) return;

    user.value = response.data;
    userStore.addUser(response.data);
  } catch (error) {
    console.log("ERROR :", error);
  }
};

const tweetsRequestApi = async () => {
  try {
    const response = await getListTweetsApi(userId.value);

    if (!response.data) return;

    tweetsList.value = response.data;
  } catch (error) {
    console.log("ERROR :", error);
  }
};

const handleLikeRequest = (tweet: Tweet) => async () => {
  try {
    const response = await patchLikeTweetApi({
      tweet_id: tweet.id,
      user_id: userStore.getUser.id,
    });

    if (!response.data) throw new Error(response.message);

    const newIsLike = !tweet.is_like;
    tweet.is_like = newIsLike;

    if (newIsLike) {
      tweet.likes++;
      return;
    }
    tweet.likes--;
  } catch (error) {
    console.log("ERROR :", error);
  }
};

const navigateToTweet = (tweetId: string) => {
  router.push(`tweet/${tweetId}`);
};

onMounted(() => {
  tweetsRequestApi();
  userRequestApi();
});
</script>

<template>
  <main class="flex-1 flex flex-col overflow-y-scroll relative">
    <div
      v-for="tweet in tweetsList"
      :key="tweet.id"
      @click="navigateToTweet(tweet.id)"
    >
      <TweetCard
        :content="tweet.content"
        :name="user.name"
        :username="user.username"
        :tweet-at="tweet.created_at"
        :is-like="tweet.is_like"
        :likes="tweet.likes"
        @click-like.stop="handleLikeRequest(tweet)()"
      />
    </div>
    <RouterLink to="/add-tweet" class="fixed bottom-18 right-5">
      <div class="rounded-full p-3 bg-blue-400">
        <IconAddTweet class="w-6 fill-white" />
      </div>
    </RouterLink>
  </main>
</template>
