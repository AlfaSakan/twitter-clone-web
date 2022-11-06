<script setup lang="ts">
import IconSearch from "@/components/icons/IconSearch.vue";
</script>

<template>
  <div class="items-center bg-slate-200 rounded-full py-3 px-4 gap-2">
    <IconSearch class="w-6" />
    <input
      type="text"
      name="search"
      class="bg-transparent min-w-min w-72 focus:outline-none"
      placeholder="Search"
    />
  </div>
</template>
