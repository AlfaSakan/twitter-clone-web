<script setup lang="ts">
defineProps<{ text: string }>();
</script>

<template>
  <button
    type="button"
    class="bg-blue-500 font-bold py-3 px-4 flex items-center justify-center rounded-full text-white hover:bg-blue-600 transition-colors duration-300"
  >
    {{ text }}
  </button>
</template>
