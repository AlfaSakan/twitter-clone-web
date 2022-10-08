<script setup lang="ts">
import { onMounted, ref } from "vue";

defineProps<{ placeholder: string }>();

const inputRef = ref();
const input = ref("");

onMounted(() => {
  inputRef.value.focus();
});
</script>

<template>
  <textarea
    class="w-full focus:outline-none resize-none h-full"
    type="text"
    ref="inputRef"
    :placeholder="placeholder"
    maxlength="250"
    v-model="input"
    @input="
      $emit('update:modelValue', ($event.target as HTMLTextAreaElement)?.value)
    "
  />
</template>
