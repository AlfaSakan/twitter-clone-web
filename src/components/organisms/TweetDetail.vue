<script setup lang="ts">
import type { Tweet } from "@/models/tweetModel";
import { patchLikeTweetApi } from "@/services/tweetService";
import { useAuthStore } from "@/stores/authStore";
import { convertDateToTimeDate } from "@/utils/convertDate";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import PictureRoundLarge from "../atoms/PictureRoundLarge.vue";
import TextSpan from "../atoms/TextSpan.vue";
import IconComment from "../icons/IconComment.vue";
import IconLike from "../icons/IconLike.vue";
import IconLikeFill from "../icons/IconLikeFill.vue";
import IconRetweet from "../icons/IconRetweet.vue";
import IconShare from "../icons/IconShare.vue";
import RetweetCard from "./RetweetCard.vue";

//#region PROPS
export interface Props {
  tweet: Tweet;
  retweet?: Tweet;
  onClickCard?: () => void;
  onClickPictureRetweet?: () => void;
}

const props = defineProps<Props>();
//#endregion

//#region REQUIRED
const router = useRouter();

const { headersToken } = storeToRefs(useAuthStore());

const tweetRef = ref(props.tweet);
//#endregion

//#region HANDLER
const handleClickPicture = () => {
  router.push(`/${tweetRef.value.user_id}`);
};
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
</script>

<template>
  <div class="flex-col">
    <div class="flex-col border-b px-4 py-3 w-screen h-fit">
      <div class="items-start gap-2" @click="handleClickPicture">
        <PictureRoundLarge :text="tweet.User?.name" />
        <div class="flex-col">
          <p class="text-base font-bold">
            {{ tweet.User.name }}
          </p>
          <p class="text-sm text-slate-500">@{{ tweet.User?.username }}</p>
        </div>
      </div>
      <p class="text-lg">{{ tweet.content }}</p>
      <RetweetCard
        v-if="retweet"
        :tweet="retweet"
        v-on:click-card="onClickCard"
        v-on:click-picture="onClickPictureRetweet"
      />
      <p class="text-sm text-slate-500 mt-4">
        {{ convertDateToTimeDate(tweet?.created_at) }}
      </p>
    </div>
    <div class="gap-2 py-3 pl-4 border-b">
      <TextSpan :num="tweet.reply_counts" text="Replies" />
      <TextSpan :num="2" text="Retweets" />
      <TextSpan :num="tweet.likes" text="Likes" />
    </div>
    <div class="justify-around items-center border-b py-3">
      <IconComment class="w-6" />
      <IconRetweet class="w-6" />
      <IconLikeFill
        v-if="tweet.is_like"
        class="w-6 fill-red-400"
        @click="handleLikeRequest"
      />
      <IconLike v-else class="w-6" @click="handleLikeRequest" />
      <IconShare class="w-6" />
    </div>
  </div>
</template>
