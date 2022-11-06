<script setup lang="ts">
import { initialName } from "@/utils/initialName";

withDefaults(
  defineProps<{
    text?: string;
  }>(),
  {
    text: "Empty",
  }
);
</script>

<template>
  <div
    class="rounded-full border w-10 h-10 items-center justify-center overflow-hidden"
  >
    <p>{{ initialName(text) }}</p>
  </div>
</template>
