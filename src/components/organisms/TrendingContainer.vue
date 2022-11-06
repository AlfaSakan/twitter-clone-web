<script setup lang="ts">
import { ref } from "vue";
import TrendingCard from "../molecules/TrendingCard.vue";

interface Trending {
  id: string;
  name: string;
  amountTweet: number;
  location: string;
}

const trendings = ref<Trending[]>([
  {
    id: "1",
    amountTweet: 12345,
    location: "Indonesia",
    name: "Perang",
  },
  {
    id: "1",
    amountTweet: 1234567,
    location: "Indonesia",
    name: "Perang",
  },
  {
    id: "1",
    amountTweet: 1000,
    location: "Indonesia",
    name: "Perang",
  },
  {
    id: "1",
    amountTweet: 1000,
    location: "Indonesia",
    name: "Perang",
  },
  {
    id: "1",
    amountTweet: 1000,
    location: "",
    name: "Perang",
  },
]);
</script>

<template>
  <div class="w-full bg-slate-100 flex-col rounded-2xl overflow-hidden">
    <p class="font-bold text-xl pl-4 py-4">Trending for you</p>
    <TrendingCard
      v-for="trending in trendings"
      :key="trending.id"
      :amount="trending.amountTweet"
      :location="trending.location"
      :tweet="trending.name"
    />
  </div>
</template>
