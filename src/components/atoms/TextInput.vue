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

onMounted(() => {
  if (props.isFocus) {
    inputRef.value?.focus();
  }
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
