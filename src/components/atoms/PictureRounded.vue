<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>

<template>
  <div
    class="rounded-full border w-8 h-8 items-center justify-center overflow-hidden"
  >
    <p>{{ text }}</p>
  </div>
</template>
