<script setup lang="ts">
import ButtonSmall from "@/components/atoms/ButtonSmall.vue";
import IconClose from "@/components/icons/IconClose.vue";
import { TWEET_TYPE, type Tweet } from "@/models/tweetModel";
import { postReplyApi } from "@/services/replyService";
import { getTweetApi } from "@/services/tweetService";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import TextAtom from "@/components/atoms/TextAtom.vue";
import { useRoute, useRouter } from "vue-router";
import PictureRoundLarge from "../components/atoms/PictureRoundLarge.vue";
import TextInput from "../components/atoms/TextInput.vue";
import { convertDateToTime } from "@/utils/convertDate";

//#region REQUIRED
const router = useRouter();
const route = useRoute();

const { user } = storeToRefs(useUserStore());
const { headersToken } = storeToRefs(useAuthStore());

const inputTweet = ref("");

const tweetRef = ref<Tweet>();
//#endregion

//#region REQUEST
const createReplyRequest = async () => {
  try {
    if (!user.value?.id) return;

    const body = {
      content: inputTweet.value,
      type_id: TWEET_TYPE.reply,
      tweet_id: route.params.id as string,
    };

    const response = await postReplyApi(headersToken.value, body);

    if (!response.data) return;

    router.push("/");
  } catch (error) {
    console.log("ERROR :", error);
  }
};

const tweetRequestApi = async () => {
  try {
    const response = await getTweetApi(
      headersToken.value,
      route.params.id as string
    );

    if (!response.data) return;

    tweetRef.value = response.data;
  } catch (error) {
    console.log("ERROR :", error);
  }
};
//#endregion

//#region HANDLER
const handleClickBack = () => {
  router.back();
};
//#endregion

//#region ONMOUNTED
onMounted(() => {
  tweetRequestApi();
});
//#endregion
</script>

<template>
  <main class="flex flex-col flex-1">
    <div class="justify-between items-center px-4 py-2">
      <IconClose @click="handleClickBack" class="w-6" />
      <ButtonSmall
        @click="createReplyRequest"
        text="Tweet"
        data-cy="btn-post-tweet"
      />
    </div>

    <div class="px-4 gap-2 py-2">
      <div class="h-[calc(100%+0.5rem)] flex-col items-center justify-center">
        <button>
          <PictureRoundLarge :text="tweetRef?.User.name" />
        </button>
        <div class="w-0.5 h-full bg-slate-200" />
      </div>
      <div class="flex-col w-full">
        <div class="gap-1 items-center">
          <TextAtom :text="tweetRef?.User.name" class="font-bold" />
          <TextAtom
            :text="'@' + tweetRef?.User.username"
            size="sm"
            color="text-slate-500"
          />
          <TextAtom
            :text="convertDateToTime(tweetRef?.created_at)"
            class="ml-auto"
            size="sm"
            color="text-slate-500"
          />
        </div>
        <TextAtom :text="tweetRef?.content" />
        <div class="mt-4">
          <TextAtom
            :text="`Replying to @${tweetRef?.User.username}`"
            size="sm"
            color="text-slate-500"
          />
        </div>
      </div>
    </div>

    <div class="gap-2 pb-2 px-4">
      <PictureRoundLarge :text="user?.name || 'Empty'" />
      <div class="flex-1">
        <TextInput
          placeholder="What's happening?"
          v-model="inputTweet"
          :is-focus="true"
        />
      </div>
    </div>
  </main>
</template>
