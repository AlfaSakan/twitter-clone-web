<script setup lang="ts">
import IconChevronLeft from "../icons/IconChevronLeft.vue";
import IconSearch from "../icons/IconSearch.vue";
export interface Props {
  onBackPress?(): void;
  name?: string;
  totalTweets?: number;
}

withDefaults(defineProps<Props>(), {
  onBackPress: () => {},
  name: "default name",
  totalTweets: 100,
});
</script>

<template>
  <div class="items-center border-b py-1 px-3">
    <button @click="onBackPress">
      <IconChevronLeft class="w-6" />
    </button>
    <div class="flex-col self-start ml-3 gap-1">
      <p class="text-xl font-bold">{{ name }}</p>
      <p class="text-slate-500 text-sm">{{ totalTweets }} Tweets</p>
    </div>
    <div class="ml-auto">
      <IconSearch class="w-6" />
    </div>
  </div>
</template>
