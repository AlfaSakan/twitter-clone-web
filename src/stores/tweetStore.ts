import type { Tweet } from "@/models/tweetModel";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

const tweetMap = new Map<string, Tweet>();

export const useTweetStore = defineStore("tweet", () => {
  const tweet = ref<Map<string, Tweet>>(tweetMap);

  const getTweetsStore = computed(() => tweet.value);

  function getTweetById(id: string) {
    return tweet.value.get(id);
  }

  function addTweet(key: string, newTweet: Tweet) {
    tweet.value.set(key, newTweet);
  }

  function deleteTweet(key: string) {
    tweet.value.delete(key);
  }

  function addListTweets(tweets: Tweet[]) {
    for (const tw of tweets) {
      if (tweet.value.has(tw.id)) continue;

      tweet.value.set(tw.id, tw);
    }
  }

  return {
    addTweet,
    deleteTweet,
    getTweetById,
    addListTweets,
    getTweetsStore,
  };
});
