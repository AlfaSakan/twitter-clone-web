import { env } from "@/contants/env";
import { Methods } from "@/contants/requestMethod";
import type { Response } from "@/models/responseModel";
import type { Token } from "@/models/sessionModel";
import { TWEET_TYPE, type Tweet } from "@/models/tweetModel";
import { authorizationHeader } from "./authService";

const { apiBaseUrl, apiVersion } = env;

type PostLikeSchema = { tweet_id: string };
type PostTweetSchema = {
  content: string;
  type_id: TWEET_TYPE;
};

const tweetUrl = `${apiBaseUrl}${apiVersion}/tweet`;

export const getAllTweetsApi = async (headers?: Token) => {
  const request = await fetch(`${tweetUrl}s`, {
    method: Methods.GET,
    headers: headers ? authorizationHeader(headers) : undefined,
  });
  const response: Response<Tweet[]> = await request.json();

  return response;
};

export const getListTweetsApi = async (headers: Token, user_id: string) => {
  const body = { user_id, type_id: TWEET_TYPE.tweet };

  const request = await fetch(`${tweetUrl}s`, {
    method: Methods.POST,
    headers: authorizationHeader(headers),
    body: JSON.stringify(body),
  });
  const response: Response<Tweet[]> = await request.json();

  return response;
};

export const getTweetApi = async (headers: Token, tweetId: string) => {
  const request = await fetch(`${tweetUrl}/${tweetId}`, {
    method: Methods.GET,
    headers: authorizationHeader(headers),
  });

  const response: Response<Tweet> = await request.json();

  return response;
};

export const postTweetApi = async (headers: Token, body: PostTweetSchema) => {
  const request = await fetch(`${tweetUrl}`, {
    method: Methods.POST,
    headers: authorizationHeader(headers),
    body: JSON.stringify(body),
  });

  const response: Response<Tweet> = await request.json();

  return response;
};

export const patchLikeTweetApi = async (
  headers: Token,
  body: PostLikeSchema
) => {
  const request = await fetch(`${tweetUrl}/like`, {
    method: Methods.PATCH,
    headers: authorizationHeader(headers),
    body: JSON.stringify(body),
  });

  const response: Response<string> = await request.json();

  return response;
};

export const getListTweetLikedApi = async (userId: string) => {
  const body = {
    user_id: userId,
  };

  const request = await fetch(`${tweetUrl}/like`, {
    method: Methods.POST,
    body: JSON.stringify(body),
  });
  const response: Response<Tweet[]> = await request.json();

  return response;
};
