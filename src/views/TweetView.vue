<script setup lang="ts">
import TweetDetail from "@/components/organisms/TweetDetail.vue";
import type { Tweet } from "@/models/tweetModel";
import type { User } from "@/models/userModel";
import { getTweetApi, patchLikeTweetApi } from "@/services/tweetService";
import { getUserRequestApi } from "@/services/userService";
import { useUserStore } from "@/stores/userStore";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const userStore = useUserStore();
const { getUser } = userStore;

const tweet = ref({} as Tweet);
const user = ref({} as User);

const tweetRequestApi = async () => {
  try {
    const response = await getTweetApi(route.params.id as string);

    if (!response.data) return;

    tweet.value = { ...response.data };

    if (getUser.id === response.data.user_id) {
      user.value = getUser;
      return;
    }

    userRequestApi(tweet.value.user_id);
  } catch (error) {
    console.log("ERROR :", error);
  }
};

const userRequestApi = async (userId: string) => {
  try {
    const response = await getUserRequestApi(userId);

    if (response.data) {
      user.value = response.data;
    }
  } catch (error) {
    console.log("ERROR : ", error);
  }
};

const handleLikeRequest = async () => {
  try {
    const response = await patchLikeTweetApi({
      tweet_id: tweet.value.id,
      user_id: user.value.id,
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
  <div class="flex-1">
    <TweetDetail
      :content="tweet.content"
      :tweet-at="tweet.created_at"
      :name="user.name"
      :username="user.username"
      :likes="tweet.likes"
      :is-like="tweet.is_like"
      @click-like="handleLikeRequest"
    />
  </div>
</template>
