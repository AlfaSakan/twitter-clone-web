<script setup lang="ts">
import { convertDateToTimeDate } from "@/utils/convertDate";
import PictureRoundLarge from "../atoms/PictureRoundLarge.vue";
import TextSpan from "../atoms/TextSpan.vue";
import IconComment from "../icons/IconComment.vue";
import IconLike from "../icons/IconLike.vue";
import IconLikeFill from "../icons/IconLikeFill.vue";
import IconRetweet from "../icons/IconRetweet.vue";
import IconShare from "../icons/IconShare.vue";

export interface Props {
  username: string;
  name: string;
  content: string;
  tweetAt: number;
  likes: number;
  isLike?: boolean;
  onClickLike?(): void;
}

withDefaults(defineProps<Props>(), {
  content: "",
  name: "",
  tweetAt: 0,
  username: "",
  likes: 0,
  isLike: false,
  onClickLike: () => {},
});
</script>

<template>
  <div class="flex-col">
    <div class="flex-col border-b px-4 py-3 w-screen h-fit">
      <div class="items-start gap-2">
        <PictureRoundLarge text="ASU" />
        <div class="flex-col">
          <p class="text-base font-bold">{{ name }}</p>
          <p class="text-sm text-slate-500">@{{ username }}</p>
        </div>
      </div>
      <p class="text-lg">{{ content }}</p>
      <p class="text-sm text-slate-500 mt-4">
        {{ convertDateToTimeDate(tweetAt) }}
      </p>
    </div>
    <div class="gap-2 py-3 pl-4 border-b">
      <TextSpan :num="37" text="Retweets" />
      <TextSpan :num="2" text="Quote Tweets" />
      <TextSpan :num="likes" text="Likes" />
    </div>
    <div class="justify-around items-center border-b py-3">
      <IconComment class="w-6" />
      <IconRetweet class="w-6" />
      <IconLikeFill
        v-if="isLike"
        class="w-6 fill-red-400"
        @click="onClickLike"
      />
      <IconLike v-else class="w-6" @click="onClickLike" />
      <IconShare class="w-6" />
    </div>
  </div>
</template>
