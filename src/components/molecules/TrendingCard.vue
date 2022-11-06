<script setup lang="ts">
import { formatThousand } from "@/utils/formatNumber";
import IconOptions from "../icons/IconOptions.vue";

export interface Props {
  location?: string;
  tweet: string;
  amount: number;
}

withDefaults(defineProps<Props>(), {
  amount: 100,
  location: "",
  tweet: "Tweet",
});
</script>

<template>
  <div
    class="flex-col gap-0 hover:bg-slate-200 px-4 pb-3 pt-2 transition-colors duration-300 cursor-pointer"
  >
    <div class="items-center justify-between w-full">
      <p class="text-xs text-slate-500">
        Trending {{ location && `in ${location}` }}
      </p>
      <IconOptions class="w-6" />
    </div>
    <p class="font-semibold -mt-1">{{ tweet }}</p>
    <p class="text-xs text-slate-500">{{ formatThousand(amount) }} Tweets</p>
  </div>
</template>
