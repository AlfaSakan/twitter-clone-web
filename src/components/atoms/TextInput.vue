<script setup lang="ts">
import { onMounted, ref } from "vue";

export interface Props {
  placeholder?: string;
  isFocus?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "",
  isFocus: false,
});

const inputRef = ref<HTMLTextAreaElement | null>();
const input = ref("");
const inputHeight = ref("48px");

const handleKeyUp = (e: KeyboardEvent) => {
  inputHeight.value = `${(e.target as HTMLTextAreaElement).scrollHeight}px`;
};

onMounted(() => {
  if (props.isFocus) {
    inputRef.value?.focus();
  }
});
</script>

<template>
  <textarea
    class="w-full focus:outline-none resize-none h-12 scrollbar-hide"
    type="text"
    ref="inputRef"
    :placeholder="placeholder"
    maxlength="250"
    v-model="input"
    :style="{ height: inputHeight }"
    @input="
      $emit('update:modelValue', ($event.target as HTMLTextAreaElement)?.value)
    "
    v-on:keyup="handleKeyUp"
  />
</template>
