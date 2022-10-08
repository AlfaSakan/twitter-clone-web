<script setup lang="ts">
import { convertDateToTime } from "@/utils/convertDate";
import PictureRoundLarge from "../atoms/PictureRoundLarge.vue";
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
  isLike: boolean;
  onClickLike?(): void;
  likes: number;
}

withDefaults(defineProps<Props>(), {
  content: "",
  name: "",
  tweetAt: 0,
  username: "",
  isLike: false,
  onClickLike: () => {},
  likes: 0,
});
</script>

<template>
  <div class="border-b px-4 py-3 w-screen gap-2">
    <div>
      <PictureRoundLarge text="AAS" />
    </div>
    <div class="flex-col w-full">
      <div class="items-center gap-1">
        <p class="text-base font-bold">{{ name }}</p>
        <p class="text-sm text-slate-500">@{{ username }}</p>
        <p class="text-sm text-slate-500">{{ convertDateToTime(tweetAt) }}</p>
      </div>
      <p class="text-sm">{{ content }}</p>
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
            v-if="isLike"
            class="w-4 fill-red-400"
            @click="onClickLike"
          />
          <IconLike v-else class="w-4" @click="onClickLike" />
          <p class="text-xs">{{ likes }}</p>
        </div>
        <IconShare class="w-4" />
      </div>
    </div>
  </div>
</template>
