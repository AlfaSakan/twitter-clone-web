<script setup lang="ts">
import IconExplore from "../icons/IconExplore.vue";
import IconHome from "../icons/IconHome.vue";
import IconMessage from "../icons/IconMessage.vue";
import IconNotification from "../icons/IconNotification.vue";
import SearchComp from "../molecules/SearchComp.vue";
import TrendingContainer from "../organisms/TrendingContainer.vue";
</script>

<template>
  <div
    class="justify-between items-center border-y md:w-[33.5%] md:flex-col md:border-l md:border-y-0 md:fixed md:right-0 md:h-full md:items-start md:pl-6 md:pt-2"
  >
    <button class="p-4 md:hidden">
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
    <div class="hidden md:flex flex-col gap-4">
      <SearchComp />
      <TrendingContainer />
    </div>
  </div>
</template>
