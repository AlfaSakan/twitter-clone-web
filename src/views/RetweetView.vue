<script setup lang="ts">
import ButtonSmall from "@/components/atoms/ButtonSmall.vue";
import IconClose from "@/components/icons/IconClose.vue";
import RetweetCard from "@/components/organisms/RetweetCard.vue";
import type { Tweet } from "@/models/tweetModel";
import { postRetweetApi } from "@/services/retweetService";
import { getTweetApi } from "@/services/tweetService";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import ButtonSmallOutline from "../components/atoms/ButtonSmallOutline.vue";
import PictureRoundLarge from "../components/atoms/PictureRoundLarge.vue";
import TextInput from "../components/atoms/TextInput.vue";
import IconChevronDown from "../components/icons/IconChevronDown.vue";

//#region REQUIRED
const router = useRouter();
const route = useRoute();

const { user } = storeToRefs(useUserStore());
const { headersToken } = storeToRefs(useAuthStore());

const inputTweet = ref("");
const tweetRef = ref<Tweet>();
//#endregion

//#region HANDLER
const handleClickBack = () => {
  router.back();
};
//#endregion

//#region REQUEST
const createRetweetRequest = async () => {
  try {
    const body = {
      content: inputTweet.value,
      tweet_id: route.params.id as string,
    };

    const response = await postRetweetApi(headersToken.value, body);

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

//#region ONMOUNTED
onMounted(() => {
  tweetRequestApi();
});
//#endregion
</script>

<template>
  <main class="flex flex-col flex-1">
    <div class="justify-between items-center px-4 py-2">
      <!-- <RouterLink to="/" type="button">
        <IconClose class="w-6" />
      </RouterLink> -->
      <IconClose @click="handleClickBack" class="w-6 cursor-pointer" />
      <ButtonSmall
        @click="createRetweetRequest"
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
    <div class="pl-16 pr-12">
      <TextInput
        placeholder="What's happening?"
        v-model="inputTweet"
        :is-focus="true"
      />
    </div>
    <div v-if="tweetRef" class="pl-16 pr-4">
      <!-- <TextAtom :text="tweetRef?.content" /> -->
      <RetweetCard :tweet="tweetRef" />
    </div>
  </main>
</template>
