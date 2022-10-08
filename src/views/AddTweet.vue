<script setup lang="ts">
import ButtonSmall from "@/components/atoms/ButtonSmall.vue";
import IconClose from "@/components/icons/IconClose.vue";
import type { Response } from "@/models/responseModel";
import type { Tweet } from "@/models/tweetModel";
import { ref } from "vue";
import { useRouter } from "vue-router";
import ButtonSmallOutline from "../components/atoms/ButtonSmallOutline.vue";
import PictureRoundLarge from "../components/atoms/PictureRoundLarge.vue";
import TextInput from "../components/atoms/TextInput.vue";
import IconChevronDown from "../components/icons/IconChevronDown.vue";

const tweet = ref<Tweet>();
const router = useRouter();
const inputTweet = ref("");

const createTweetRequest = async () => {
  try {
    const request = await fetch("http://localhost:8081/v1/tweet", {
      method: "POST",
      body: JSON.stringify({
        content: inputTweet.value,
        user_id: "29861cae-f5fb-4c6e-89be-4307038cd914",
      }),
    });
    const response: Response<Tweet> = await request.json();

    if (response.data) {
      tweet.value = response.data;
      router.push("/");
    }
  } catch (error) {
    console.log("ERROR :", error);
  }
};
</script>

<template>
  <main class="flex flex-col flex-1">
    <div class="justify-between items-center px-4 py-2">
      <RouterLink to="/" type="button">
        <IconClose class="w-6" />
      </RouterLink>
      <ButtonSmall @click="createTweetRequest" text="Tweet" />
    </div>
    <div class="gap-2 py-2 px-4">
      <PictureRoundLarge text="ASS" />
      <ButtonSmallOutline text="Public">
        <template #icon>
          <IconChevronDown class="w-5 fill-blue-500" />
        </template>
      </ButtonSmallOutline>
    </div>
    <div class="pl-16 pr-12 flex-1">
      <TextInput placeholder="What's happening?" v-model="inputTweet" />
    </div>
  </main>
</template>
