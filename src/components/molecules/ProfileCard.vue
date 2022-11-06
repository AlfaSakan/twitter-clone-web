<script setup lang="ts">
import PictureRoundLarge from "../atoms/PictureRoundLarge.vue";
import IconOptions from "../icons/IconOptions.vue";

export interface Props {
  name: string;
  username: string;
}

defineProps<Props>();
</script>

<template>
  <div class="items-center hover:bg-slate-200 pl-3 py-2 pr-7 rounded-full">
    <PictureRoundLarge :text="name" class="border-slate-500" />
    <div class="flex-col ml-2 mr-auto">
      <p class="font-bold">{{ name }}</p>
      <p class="text-slate-500 text-sm">@{{ username }}</p>
    </div>
    <IconOptions class="w-6" />
  </div>
</template>
