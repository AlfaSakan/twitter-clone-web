<script setup lang="ts">
import { initialName } from "@/utils/initialName";

defineProps<{
  text: string;
}>();
</script>

<template>
  <div
    class="rounded-full border w-8 h-8 items-center justify-center overflow-hidden"
  >
    <p>{{ initialName(text) }}</p>
  </div>
</template>
