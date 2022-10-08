<script setup lang="ts">
defineProps<{ text: string }>();
</script>

<template>
  <button
    type="button"
    class="bg-blue-500 font-bold py-1 px-4 flex items-center justify-center rounded-full text-white"
  >
    {{ text }}
  </button>
</template>
