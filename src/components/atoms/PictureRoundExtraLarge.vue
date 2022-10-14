<script setup lang="ts">
import { initialName } from "@/utils/initialName";

defineProps<{
  text: string;
}>();
</script>

<template>
  <div
    class="rounded-full border w-32 h-32 items-center justify-center overflow-hidden"
  >
    <p>{{ initialName(text) }}</p>
  </div>
</template>
