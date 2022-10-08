<script setup lang="ts">
import IconExplore from "../icons/IconExplore.vue";
import IconHome from "../icons/IconHome.vue";
import IconMessage from "../icons/IconMessage.vue";
import IconNotification from "../icons/IconNotification.vue";
</script>

<template>
  <div class="justify-between items-center border-y">
    <button class="p-4">
      <IconHome class="w-6" />
    </button>
    <button class="p-4">
      <IconExplore class="w-6" />
    </button>
    <button class="p-4">
      <IconNotification class="w-6" />
    </button>
    <button class="p-4">
      <IconMessage class="w-6" />
    </button>
  </div>
</template>
