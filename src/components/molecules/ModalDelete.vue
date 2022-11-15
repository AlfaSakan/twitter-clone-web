<script setup lang="ts">
import TextAtom from "../atoms/TextAtom.vue";
import IconDelete from "../icons/IconDelete.vue";
import { useModalStore } from "@/stores/modalStore";
import { storeToRefs } from "pinia";

//#region REQUIRED
const modalStore = useModalStore();
const { getDeleteModal } = storeToRefs(useModalStore());
//#endregion
</script>

<template>
  <div
    v-if="getDeleteModal"
    class="absolute h-screen w-screen items-end bg-black bg-opacity-10"
    @click="modalStore.toggleDelete"
  >
    <div
      class="bg-white w-screen h-40 flex-col pt-15 rounded-t-[35px] px-4 justify-between"
    >
      <div
        class="items-center w-full text-center gap-4"
        @click.stop="modalStore.toggleConfirmationDelete"
      >
        <IconDelete class="w-6" />
        <TextAtom text="Delete" />
      </div>
    </div>
  </div>
</template>
