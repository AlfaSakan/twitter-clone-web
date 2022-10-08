<script setup lang="ts">
export interface Props {
  num: number;
  text: string;
}

withDefaults(defineProps<Props>(), {
  num: 0,
  text: "",
});
</script>

<template>
  <div>
    <p class="font-bold">
      {{ num }}<span class="font-normal ml-1">{{ text }}</span>
    </p>
  </div>
</template>
