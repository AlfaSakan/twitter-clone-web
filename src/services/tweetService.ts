import { env } from "@/contants/env";
import { Methods } from "@/contants/requestMethod";
import type { Response } from "@/models/responseModel";
import type { TweetLike } from "@/models/tweetLikeModel";
import type { Tweet } from "@/models/tweetModel";

const { apiBaseUrl, apiVersion } = env;

type PostLikeSchema = { tweet_id: string; user_id: string };

export const getListTweetsApi = async (user_id: string) => {
  const body = { user_id };

  const request = await fetch(`${apiBaseUrl}${apiVersion}/tweets`, {
    method: Methods.POST,
    body: JSON.stringify(body),
  });
  const response: Response<Tweet[]> = await request.json();

  return response;
};

export const getTweetApi = async (tweetId: string) => {
  const request = await fetch(`${apiBaseUrl}${apiVersion}/tweet/${tweetId}`, {
    method: Methods.GET,
  });

  const response: Response<Tweet> = await request.json();

  return response;
};

export const patchLikeTweetApi = async (body: PostLikeSchema) => {
  const request = await fetch(`${apiBaseUrl}${apiVersion}/tweet/like`, {
    method: Methods.PATCH,
    body: JSON.stringify(body),
  });

  const response: Response<string> = await request.json();

  return response;
};

export const postLikeTweetApi = async (body: PostLikeSchema) => {
  const request = await fetch(`${apiBaseUrl}${apiVersion}/tweet/like`, {
    method: Methods.POST,
    body: JSON.stringify(body),
  });

  const response: Response<TweetLike> = await request.json();

  return response;
};
