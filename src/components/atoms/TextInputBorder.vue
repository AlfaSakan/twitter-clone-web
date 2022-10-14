<script setup lang="ts">
import { ref } from "vue";

export interface Props {
  placeholder: string;
  type: string;
}

withDefaults(defineProps<Props>(), {
  type: "text",
  placeholder: "",
});

const input = ref("");
</script>

<template>
  <input
    class="px-3 py-2 rounded w-full focus:outline-none border"
    :type="type"
    :placeholder="placeholder"
    maxlength="250"
    v-model="input"
    @input="
      $emit('update:modelValue', ($event.target as HTMLTextAreaElement)?.value)
    "
    required
  />
</template>
