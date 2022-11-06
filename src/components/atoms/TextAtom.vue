<script setup lang="ts">
import type { FontSize } from "@/utils/fontSize";
import { onMounted, ref } from "vue";

export interface Props {
  text?: string;
  size?: FontSize;
  isError?: boolean;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  text: "",
  size: "base",
  isError: false,
});

const fontSize = ref("");
const textColor = ref("text-black");

onMounted(() => {
  if (props.color) {
    textColor.value = props.color;
  }

  if (props.isError) {
    textColor.value = "text-red-500";
  }

  switch (props.size) {
    case "xs":
      fontSize.value = "text-xs";
      break;
    case "sm":
      fontSize.value = "text-sm";
      break;
    case "lg":
      fontSize.value = "text-lg";
      break;
    case "xl":
      fontSize.value = "text-xl";
      break;
    case "2xl":
      fontSize.value = "text-2xl";
      break;
    default:
      fontSize.value = "text-base";
      break;
  }
});
</script>

<template>
  <p :class="`${fontSize} ${textColor}`">
    {{ text }}
  </p>
</template>
