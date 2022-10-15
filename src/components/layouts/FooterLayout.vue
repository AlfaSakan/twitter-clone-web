<script setup lang="ts">
import IconExplore from "../icons/IconExplore.vue";
import IconHome from "../icons/IconHome.vue";
import IconMessage from "../icons/IconMessage.vue";
import IconNotification from "../icons/IconNotification.vue";
</script>

<template>
  <div
    class="justify-between items-center border-y md:w-1/4 md:flex-col md:border-l"
  >
    <button class="p-4">
      <IconHome class="w-6" />
    </button>
    <button class="p-4 md:hidden">
      <IconExplore class="w-6" />
    </button>
    <button class="p-4 md:hidden">
      <IconNotification class="w-6" />
    </button>
    <button class="p-4 md:hidden">
      <IconMessage class="w-6" />
    </button>
  </div>
</template>
