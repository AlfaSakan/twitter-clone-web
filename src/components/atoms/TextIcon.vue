<script setup lang="ts">
export interface Props {
  text: string;
}

withDefaults(defineProps<Props>(), {
  text: "",
});
</script>

<template>
  <div class="text-slate-500 gap-1 text-sm items-center">
    <slot name="icon"></slot>
    <p>{{ text }}</p>
  </div>
</template>
