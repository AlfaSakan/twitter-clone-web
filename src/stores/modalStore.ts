import { defineStore } from "pinia";
import { computed, ref } from "vue";

interface Modal {
  retweet: boolean;
  selectedId: string;
  delete: boolean;
  confirmationDelete: boolean;
}

export const useModalStore = defineStore("modal", () => {
  const modalStore = ref<Modal>({
    retweet: false,
    selectedId: "",
    delete: false,
    confirmationDelete: false,
  });

  const retweetModal = computed(() => modalStore.value.retweet);
  const getSelectedId = computed(() => modalStore.value.selectedId);
  const getDeleteModal = computed(() => modalStore.value.delete);
  const getDeleteConfirmation = computed(
    () => modalStore.value.confirmationDelete
  );

  function toggleRetweet() {
    modalStore.value.retweet = !modalStore.value.retweet;
  }

  function toggleDelete() {
    modalStore.value.delete = !modalStore.value.delete;
  }

  function toggleConfirmationDelete() {
    if (!modalStore.value.confirmationDelete) {
      modalStore.value.delete = false;
    }

    modalStore.value.confirmationDelete = !modalStore.value.confirmationDelete;
  }

  function setSelectedId(val: string) {
    modalStore.value.selectedId = val;
  }

  return {
    retweetModal,
    getSelectedId,
    toggleRetweet,
    setSelectedId,
    toggleDelete,
    getDeleteModal,
    toggleConfirmationDelete,
    getDeleteConfirmation,
  };
});
