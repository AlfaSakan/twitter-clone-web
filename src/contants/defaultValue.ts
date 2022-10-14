import type { Tweet } from "@/models/tweetModel";

export const defaultTweet: Tweet = {
  content: "",
  created_at: 0,
  id: "",
  likes: 0,
  user_id: "",
  User: {
    name: "",
    id: "",
    username: "",
    created_at: 0,
    updated_at: 0,
    email: "",
  },
  is_like: false,
};
