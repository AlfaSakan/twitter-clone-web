<script setup lang="ts">
defineProps<{ text: string }>();
</script>

<template>
  <button
    type="button"
    class="border-blue-500 border font-bold py-1 px-4 flex items-center justify-center rounded-full text-blue-500 gap-1"
  >
    {{ text }}
    <slot name="icon"></slot>
  </button>
</template>
