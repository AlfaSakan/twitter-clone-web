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
  name: "",
  totalTweets: 0,
});
</script>

<template>
  <div
    class="items-center border-b h-15 py-3 px-3 backdrop-blur-sm bg-white bg-opacity-90"
  >
    <button @click="onBackPress">
      <IconChevronLeft class="w-6" />
    </button>
    <div class="flex-col ml-3 gap-1" v-if="name">
      <p class="text-xl font-bold">{{ name }}</p>
      <p class="text-slate-500 text-sm">{{ totalTweets }} Tweets</p>
    </div>
    <div class="flex-col ml-3 gap-1" v-else>
      <p class="text-xl font-semibold">Tweet</p>
    </div>
    <div class="ml-auto" v-if="name">
      <IconSearch class="w-6" />
    </div>
  </div>
</template>
