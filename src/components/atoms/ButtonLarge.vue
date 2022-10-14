<script setup lang="ts">
export interface Props {
  text: string;
  type?: "button" | "submit" | "reset";
}

withDefaults(defineProps<Props>(), { text: "", type: "button" });
</script>

<template>
  <button
    :type="type"
    class="bg-blue-500 font-bold py-2 px-4 flex items-center justify-center rounded-full text-white"
  >
    {{ text }}
  </button>
</template>
