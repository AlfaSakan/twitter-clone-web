<script setup lang="ts">
import TextAtom from "../atoms/TextAtom.vue";
import IconRetweet from "../icons/IconRetweet.vue";
import IconQuote from "../icons/IconQuote.vue";
import { storeToRefs } from "pinia";
import { useModalStore } from "@/stores/modalStore";
import { useRouter } from "vue-router";
import { postRetweetApi } from "@/services/retweetService";
import { useAuthStore } from "@/stores/authStore";

//#region REQUIRED
const router = useRouter();

const modalStore = useModalStore();
const { retweetModal, getSelectedId } = storeToRefs(useModalStore());

const { headersToken } = storeToRefs(useAuthStore());
//#endregion

//#region HANDLER
const handleClickQuote = () => {
  router.push(`retweet/${getSelectedId.value}`);
  modalStore.toggleRetweet();
};
//#endregion

//#region REQUEST
const createRetweetRequest = async () => {
  try {
    const body = {
      content: "",
      tweet_id: getSelectedId.value,
    };

    const response = await postRetweetApi(headersToken.value, body);

    if (!response.data) throw response;

    modalStore.toggleRetweet();
  } catch (error) {
    console.log("ERROR :", error);
  }
};
//#endregion
</script>

<template>
  <div
    v-if="retweetModal"
    class="absolute h-screen w-screen items-end bg-black bg-opacity-10"
    @click="modalStore.toggleRetweet"
  >
    <div
      class="bg-white w-screen h-40 flex-col pt-15 pb-8 rounded-t-[35px] px-4 justify-between"
    >
      <div
        class="items-center w-full text-center gap-4"
        @click.stop="createRetweetRequest"
      >
        <IconRetweet class="w-6" />
        <TextAtom text="Retweet" />
      </div>
      <div
        class="items-center w-full text-center gap-4"
        @click.stop="handleClickQuote"
      >
        <IconQuote class="w-6" />
        <TextAtom text="Quote Tweet" />
      </div>
    </div>
  </div>
</template>
