<script setup lang="ts">
import type { Tweet } from "@/models/tweetModel";
import { patchLikeTweetApi } from "@/services/tweetService";
import { useAuthStore } from "@/stores/authStore";
import { convertDateToTime } from "@/utils/convertDate";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import PictureRoundLarge from "../atoms/PictureRoundLarge.vue";
import IconComment from "../icons/IconComment.vue";
import IconLike from "../icons/IconLike.vue";
import IconLikeFill from "../icons/IconLikeFill.vue";
import IconRetweet from "../icons/IconRetweet.vue";
import IconShare from "../icons/IconShare.vue";

export interface Props {
  tweet: Tweet;
}

//#region REQUIRED
const props = defineProps<Props>();

const { headersToken } = storeToRefs(useAuthStore());

const tweetRef = ref(props.tweet);

const router = useRouter();
//#endregion

//#region REQUEST
// LIKE REQUEST
const handleLikeRequest = async () => {
  try {
    if (!headersToken.value.access_token) return;
    const response = await patchLikeTweetApi(headersToken.value, {
      tweet_id: tweetRef.value.id,
    });

    if (!response.data) throw new Error(response.message);

    const newIsLike = !tweetRef.value.is_like;
    tweetRef.value.is_like = newIsLike;

    if (newIsLike) {
      tweetRef.value.likes++;
      return;
    }
    tweetRef.value.likes--;
  } catch (error) {
    console.log("ERROR :", error);
  }
};
//#endregion

//#region HANDLER
const handleClickPicture = () => {
  router.push(`/${tweetRef.value.user_id}`);
};

const handleNavigateTweet = () => {
  router.push(`tweet/${tweetRef.value.id}`);
};
//#endregion
</script>

<template>
  <div
    class="border-b px-4 py-3 w-screen gap-2 cursor-pointer md:w-full"
    type="button"
    @click="handleNavigateTweet"
  >
    <button @click.stop="handleClickPicture">
      <PictureRoundLarge :text="tweet.User.name" />
    </button>
    <div class="flex-col w-full">
      <div class="items-center gap-1">
        <p class="text-base font-bold">{{ tweet.User.name }}</p>
        <p class="text-sm text-slate-500">@{{ tweet.User.username }}</p>
        <p class="text-sm text-slate-500">
          {{ convertDateToTime(tweet.created_at) }}
        </p>
      </div>
      <p class="text-sm">{{ tweet.content }}</p>
      <div class="items-center justify-between pr-10 pt-2">
        <div class="items-center gap-1">
          <IconComment class="w-4" />
          <p class="text-xs">12</p>
        </div>
        <div class="items-center gap-1">
          <IconRetweet class="w-4" />
          <p class="text-xs">10</p>
        </div>
        <div class="items-center gap-1">
          <IconLikeFill
            v-if="tweet.is_like"
            class="w-4 fill-red-400 cursor-pointer"
            @click.stop="handleLikeRequest"
          />
          <IconLike
            v-else
            class="w-4 cursor-pointer"
            @click.stop="handleLikeRequest"
          />
          <p class="text-xs">{{ tweet.likes }}</p>
        </div>
        <IconShare class="w-4" />
      </div>
    </div>
  </div>
</template>
