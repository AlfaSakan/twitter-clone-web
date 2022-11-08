<script setup lang="ts">
import type { Tweet } from "@/models/tweetModel";
import { patchLikeTweetApi } from "@/services/tweetService";
import { useAuthStore } from "@/stores/authStore";
import { convertDateToTime } from "@/utils/convertDate";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import PictureRoundLarge from "../atoms/PictureRoundLarge.vue";
import IconComment from "../icons/IconComment.vue";
import IconLike from "../icons/IconLike.vue";
import IconLikeFill from "../icons/IconLikeFill.vue";
import IconRetweet from "../icons/IconRetweet.vue";
import IconShare from "../icons/IconShare.vue";
import RetweetCard from "./RetweetCard.vue";
import { getTweetApi } from "@/services/tweetService";
import type { User } from "@/models/userModel";
import TextAtom from "../atoms/TextAtom.vue";
import { useUserStore } from "@/stores/userStore";

export interface Props {
  tweet: Tweet;
  replyingTo?: string;
}

//#region REQUIRED
const props = withDefaults(defineProps<Props>(), {
  replyingTo: "",
});

const { userId } = storeToRefs(useUserStore());
const { headersToken } = storeToRefs(useAuthStore());

const tweetRef = ref(props.tweet);
const retweetRef = ref<Tweet>();

const isContentEmpty = ref(!props.tweet.content.trim());
const isYou = ref(userId.value === tweetRef.value.user_id);

const router = useRouter();
//#endregion

//#region REQUEST
// LIKE REQUEST
const handleLikeRequest = async () => {
  try {
    if (!headersToken.value.access_token) return;
    const response = await patchLikeTweetApi(headersToken.value, {
      tweet_id: checkIsContenEmpty("id")() as string,
    });

    if (!response.data) throw new Error(response.message);

    if (isContentEmpty.value) {
      getReferenceTweetRequest();
      return;
    }

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

const getReferenceTweetRequest = async () => {
  try {
    if (!tweetRef.value.reference_id) return;

    const response = await getTweetApi(
      headersToken.value,
      tweetRef.value.reference_id
    );

    if (!response.data) throw response;

    retweetRef.value = response.data;
  } catch (error) {
    console.log("ERROR :", error);
  }
};
//#endregion

//#region HANDLER
const handleClickPicture = () => {
  router.push(`/${checkIsContenEmpty("user_id")()}`);
};

const handleNavigateTweet = async () => {
  if (props.replyingTo) {
    router.push(`${tweetRef.value.id}`);
    return;
  }
  router.push(`tweet/${checkIsContenEmpty("id")()}`);
};

const handleNavigateReply = () => {
  router.push(`reply/${checkIsContenEmpty("id")()}`);
};

const handleNavigateAddRetweet = () => {
  router.push(`retweet/${checkIsContenEmpty("id")()}`);
};

const handleClickRetweet = (referenceId?: string) => {
  if (!referenceId) return;

  router.push(`/tweet/${referenceId}`);
};

const handleClickPictureRetweet = (userId?: string) => {
  if (!userId) return;

  router.push(`/${userId}`);
};

const checkIsContenEmpty = (key1: keyof Tweet) => (key2?: keyof User) => {
  if (!key2 && isContentEmpty.value) {
    return retweetRef.value?.[key1];
  }

  if (!key2) {
    return tweetRef.value[key1];
  }

  if (isContentEmpty.value && key1 === "User") {
    return retweetRef.value?.[key1]?.[key2];
  }

  return tweetRef.value["User"][key2];
};
//#endregion

//#region ONMOUNTED
onMounted(() => {
  getReferenceTweetRequest();
});
//#endregion
</script>

<template>
  <div
    class="flex-col px-4 pt-2 pb-3 border-b w-screen cursor-pointer md:w-full"
  >
    <div v-if="retweetRef && isContentEmpty" class="gap-2 items-center ml-7">
      <IconRetweet class="w-3" fill="rgb(100 116 139)" />
      <TextAtom
        :text="`${isYou ? 'You' : tweet.User.username} Retweeted`"
        size="xs"
        class="font-bold"
        color="text-slate-500"
      />
    </div>
    <div class="gap-2 items-start" type="button" @click="handleNavigateTweet">
      <button @click.stop="handleClickPicture" class="mt-2">
        <PictureRoundLarge
          :text="checkIsContenEmpty('User')('name')?.toString()"
        />
      </button>
      <div class="flex-col w-full">
        <div class="items-center gap-1">
          <p class="text-base font-bold">
            {{ checkIsContenEmpty("User")("name") }}
          </p>
          <p class="text-sm text-slate-500">
            @{{ checkIsContenEmpty("User")("username") }}
          </p>
          <p class="text-sm text-slate-500">
            {{
              convertDateToTime(checkIsContenEmpty("created_at")() as number)
            }}
          </p>
        </div>
        <p class="text-sm text-slate-500" v-if="replyingTo">
          Replying to {{ replyingTo }}
        </p>
        <p class="text-sm">
          {{ checkIsContenEmpty("content")() }}
        </p>
        <RetweetCard
          v-if="retweetRef && !isContentEmpty"
          :tweet="retweetRef"
          v-on:click-card="handleClickRetweet(tweet.reference_id)"
          v-on:click-picture="handleClickPictureRetweet(retweetRef?.user_id)"
        />
        <div class="items-center justify-between pr-10 pt-2">
          <div
            class="items-center gap-1 cursor-pointer"
            @click.stop="handleNavigateReply"
          >
            <IconComment class="w-4" />
            <p class="text-xs">{{ checkIsContenEmpty("reply_counts")() }}</p>
          </div>
          <div class="items-center gap-1">
            <IconRetweet
              v-if="isYou && isContentEmpty"
              class="w-4 fill-green-500"
            />
            <IconRetweet
              v-else
              class="w-4"
              @click.stop="handleNavigateAddRetweet"
            />
            <p class="text-xs">{{ checkIsContenEmpty("retweet_counts")() }}</p>
          </div>
          <div class="items-center gap-1">
            <IconLikeFill
              v-if="checkIsContenEmpty('is_like')()"
              class="w-4 fill-red-400 cursor-pointer"
              @click.stop="handleLikeRequest"
            />
            <IconLike
              v-else
              class="w-4 cursor-pointer"
              @click.stop="handleLikeRequest"
            />
            <p class="text-xs">{{ checkIsContenEmpty("likes")() }}</p>
          </div>
          <IconShare class="w-4" />
        </div>
      </div>
    </div>
  </div>
</template>
