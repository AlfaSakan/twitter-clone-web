<script setup lang="ts">
defineProps<{ text: string }>();
</script>

<template>
  <button
    type="button"
    class="border-blue-500 border font-bold py-1 px-4 flex items-center justify-center rounded-full text-blue-500 gap-1 transition-colors duration-300 hover:bg-blue-500 hover:text-white"
  >
    {{ text }}
    <slot name="icon"></slot>
  </button>
</template>
