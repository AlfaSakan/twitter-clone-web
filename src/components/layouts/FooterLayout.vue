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
    class="justify-between items-center border-y lg:w-[33.5%] lg:flex-col lg:border-l lg:border-y-0 lg:fixed lg:right-0 lg:h-full lg:items-start lg:pl-6 lg:pt-2"
  >
    <button class="p-4 lg:hidden">
      <IconHome class="w-6" />
    </button>
    <button class="p-4 lg:hidden">
      <IconExplore class="w-6" />
    </button>
    <button class="p-4 lg:hidden">
      <IconNotification class="w-6" />
    </button>
    <button class="p-4 lg:hidden">
      <IconMessage class="w-6" />
    </button>
    <div class="hidden lg:flex flex-col gap-4">
      <SearchComp />
      <TrendingContainer />
    </div>
  </div>
</template>
