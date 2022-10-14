<script setup lang="ts">
import type { Tweet } from "@/models/tweetModel";
import { convertDateToTimeDate } from "@/utils/convertDate";
import PictureRoundLarge from "../atoms/PictureRoundLarge.vue";
import TextSpan from "../atoms/TextSpan.vue";
import IconComment from "../icons/IconComment.vue";
import IconLike from "../icons/IconLike.vue";
import IconLikeFill from "../icons/IconLikeFill.vue";
import IconRetweet from "../icons/IconRetweet.vue";
import IconShare from "../icons/IconShare.vue";

export interface Props {
  tweet: Tweet;
  onClickLike?(): void;
}

withDefaults(defineProps<Props>(), {
  onClickLike: () => {},
});
</script>

<template>
  <div class="flex-col">
    <div class="flex-col border-b px-4 py-3 w-screen h-fit">
      <div class="items-start gap-2">
        <PictureRoundLarge :text="tweet.User?.name" />
        <div class="flex-col">
          <p class="text-base font-bold">
            {{ tweet.User.name }}
          </p>
          <p class="text-sm text-slate-500">@{{ tweet.User?.username }}</p>
        </div>
      </div>
      <p class="text-lg">{{ tweet.content }}</p>
      <p class="text-sm text-slate-500 mt-4">
        {{ convertDateToTimeDate(tweet?.created_at) }}
      </p>
    </div>
    <div class="gap-2 py-3 pl-4 border-b">
      <TextSpan :num="37" text="Retweets" />
      <TextSpan :num="2" text="Quote Tweets" />
      <TextSpan :num="tweet.likes" text="Likes" />
    </div>
    <div class="justify-around items-center border-b py-3">
      <IconComment class="w-6" />
      <IconRetweet class="w-6" />
      <IconLikeFill
        v-if="tweet.is_like"
        class="w-6 fill-red-400"
        @click="onClickLike"
      />
      <IconLike v-else class="w-6" @click="onClickLike" />
      <IconShare class="w-6" />
    </div>
  </div>
</template>
