import { env } from "@/contants/env";
import { Methods } from "@/contants/requestMethod";
import type { Response } from "@/models/responseModel";
import type { Token } from "@/models/sessionModel";
import type { Tweet } from "@/models/tweetModel";
import { authorizationHeader } from "./authService";

const { apiBaseUrl, apiVersion } = env;
const retweetUrl = `${apiBaseUrl}${apiVersion}/retweet`;

type PostRetweetSchema = {
  content: string;
  tweet_id: string;
};

export const postRetweetApi = async (
  headers: Token,
  body: PostRetweetSchema
) => {
  const request = await fetch(`${retweetUrl}`, {
    method: Methods.POST,
    headers: headers ? authorizationHeader(headers) : undefined,
    body: JSON.stringify(body),
  });

  const response: Response<Tweet> = await request.json();

  return response;
};

export const getRetweetApi = async (headers: Token, tweetId: string) => {
  const request = await fetch(`${retweetUrl}/${tweetId}`, {
    method: Methods.GET,
    headers: headers ? authorizationHeader(headers) : undefined,
  });

  const response: Response<Tweet[]> = await request.json();

  return response;
};
