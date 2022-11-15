<script setup lang="ts">
import TextAtom from "../atoms/TextAtom.vue";
import { useModalStore } from "@/stores/modalStore";
import { storeToRefs } from "pinia";
import { deleteTweetApi } from "@/services/tweetService";
import { useAuthStore } from "@/stores/authStore";

//#region REQUIRED
const modalStore = useModalStore();
const { getDeleteConfirmation, getSelectedId } = storeToRefs(useModalStore());

const { headersToken } = storeToRefs(useAuthStore());
//#endregion

//#region REQUEST
const deleteTweetRequest = async () => {
  try {
    const response = await deleteTweetApi(
      headersToken.value,
      getSelectedId.value
    );

    if (!response.data) throw response;

    modalStore.toggleConfirmationDelete();
  } catch (error) {
    console.log("ERROR DELETE", error);
  }
};
//#endregion
</script>

<template>
  <div
    v-if="getDeleteConfirmation"
    class="absolute h-screen w-screen items-center justify-center bg-black bg-opacity-10"
    @click="modalStore.toggleConfirmationDelete"
  >
    <div class="bg-white w-3/4 h-48 flex-col rounded p-4 justify-between">
      <div class="w-full gap-4 flex-col">
        <TextAtom text="Delete Tweet?" class="font-bold leading-5" size="lg" />
        <TextAtom
          text="This can't be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from Twitter search results."
          class="leading-5"
        />
        <div class="ml-auto gap-6">
          <TextAtom
            text="Cancel"
            class="font-bold"
            @click.stop="modalStore.toggleConfirmationDelete"
          />
          <TextAtom
            text="Delete"
            class="font-bold"
            @click.stop="deleteTweetRequest"
          />
        </div>
      </div>
    </div>
  </div>
</template>
