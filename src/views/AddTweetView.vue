<script setup lang="ts">
import ButtonSmall from "@/components/atoms/ButtonSmall.vue";
import IconClose from "@/components/icons/IconClose.vue";
import { TWEET_TYPE } from "@/models/tweetModel";
import { postTweetApi } from "@/services/tweetService";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import ButtonSmallOutline from "../components/atoms/ButtonSmallOutline.vue";
import PictureRoundLarge from "../components/atoms/PictureRoundLarge.vue";
import TextInput from "../components/atoms/TextInput.vue";
import IconChevronDown from "../components/icons/IconChevronDown.vue";

//#region REQUIRED
const router = useRouter();

const { user } = storeToRefs(useUserStore());
const { headersToken } = storeToRefs(useAuthStore());

const inputTweet = ref("");
//#endregion

//#region REQUEST
const createTweetRequest = async () => {
  try {
    if (!inputTweet.value) return;

    const body = {
      content: inputTweet.value,
      type_id: TWEET_TYPE.tweet,
    };

    const response = await postTweetApi(headersToken.value, body);

    if (!response.data) return;

    router.push("/");
  } catch (error) {
    console.log("ERROR :", error);
  }
};
//#endregion
</script>

<template>
  <main class="flex flex-col flex-1">
    <div class="justify-between items-center px-4 py-2">
      <RouterLink to="/" type="button">
        <IconClose class="w-6" />
      </RouterLink>
      <ButtonSmall
        @click="createTweetRequest"
        text="Tweet"
        data-cy="btn-post-tweet"
      />
    </div>
    <div class="gap-2 py-2 px-4">
      <PictureRoundLarge :text="user?.name || 'Empty'" />
      <ButtonSmallOutline text="Public">
        <template #icon>
          <IconChevronDown class="w-5 fill-blue-500" />
        </template>
      </ButtonSmallOutline>
    </div>
    <div class="pl-16 pr-12 flex-1">
      <TextInput
        placeholder="What's happening?"
        v-model="inputTweet"
        :is-focus="true"
      />
    </div>
  </main>
</template>
