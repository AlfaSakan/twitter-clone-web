import type { User } from "./userModel";

export enum TWEET_TYPE {
  "tweet" = 1,
  "retweet" = 2,
  "reply" = 3,
}

type TweetType = "tweet" | "retweet" | "reply";
export interface Tweet {
  id: string;
  content: string;
  user_id: string;
  likes: number;
  created_at: number;
  is_like?: boolean;
  User: User;
  reply_counts: number;
  retweet_counts: number;
  type_id: TWEET_TYPE;
  type: TweetType;
  reference_id: string;
}
