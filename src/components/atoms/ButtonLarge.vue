<script setup lang="ts">
export interface Props {
  text: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  text: "",
  type: "button",
  disabled: false,
});
</script>

<template>
  <button
    :type="type"
    class="bg-blue-500 disabled:bg-slate-300 font-bold py-2.5 text-lg px-4 flex items-center justify-center rounded-full text-white"
    :disabled="disabled"
  >
    {{ text }}
  </button>
</template>
