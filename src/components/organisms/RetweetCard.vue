<script setup lang="ts">
import type { Tweet } from "@/models/tweetModel";
import { ref } from "vue";
import { useRouter } from "vue-router";
import PictureRoundSmall from "../atoms/PictureRoundSmall.vue";
import TextAtom from "../atoms/TextAtom.vue";

//#region PROPS
export interface Props {
  tweet: Tweet;
}

const props = defineProps<Props>();
//#endregion

//#region REQUIRED
const router = useRouter();

const tweetRef = ref(props.tweet);
//#endregion

//#region HANDLER
const handleClickPicture = () => {
  router.push(`/${tweetRef.value.user_id}`);
};

const handleClickTweet = () => {
  router.push(`/tweet/${tweetRef.value.id}`);
};
//#endregion
</script>

<template>
  <div
    class="flex-col border rounded-lg flex-1 my-1"
    @click.stop="handleClickTweet"
  >
    <div class="flex-col px-4 py-3 w-full h-fit">
      <div class="gap-2 items-center mb-2" @click="handleClickPicture">
        <PictureRoundSmall :text="tweet.User?.name" />
        <TextAtom :text="tweet.User.name" class="font-bold" size="sm" />
        <p class="text-sm text-slate-500">@{{ tweet.User?.username }}</p>
      </div>
      <!-- <p class="text-sm text-slate-500 mb-2">
        Replying to @{{ tweet.User?.username }}
      </p> -->
      <TextAtom :text="tweet.content" size="sm" />
    </div>
  </div>
</template>
