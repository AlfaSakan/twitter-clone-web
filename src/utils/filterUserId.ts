import type { Tweet } from "@/models/tweetModel";
import { filterDuplicate } from "./filterDuplicate";

export const filterUserIdFromTweet = (tweets: Tweet[]) => {
  const userIds = tweets.map((tw) => tw.user_id);

  return filterDuplicate(userIds);
};
