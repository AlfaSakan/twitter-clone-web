<script setup lang="ts">
import { initialName } from "@/utils/initialName";
import TextAtom from "./TextAtom.vue";

defineProps<{
  text: string;
}>();
</script>

<template>
  <div
    class="rounded-full border w-5 h-5 items-center justify-center overflow-hidden"
  >
    <TextAtom :text="initialName(text)" size="xs" />
  </div>
</template>
