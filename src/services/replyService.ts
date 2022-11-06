import { env } from "@/contants/env";
import { Methods } from "@/contants/requestMethod";
import type { Response } from "@/models/responseModel";
import type { Token } from "@/models/sessionModel";
import type { Tweet, TWEET_TYPE } from "@/models/tweetModel";
import { authorizationHeader } from "./authService";

const { apiBaseUrl, apiVersion } = env;
const replyUrl = `${apiBaseUrl}${apiVersion}/reply`;

type PostReplySchema = {
  content: string;
  user_id: string;
  type_id: TWEET_TYPE;
  tweet_id: string;
};

export const postReplyApi = async (body: PostReplySchema) => {
  const request = await fetch(`${replyUrl}`, {
    method: Methods.POST,
    body: JSON.stringify(body),
  });

  const response: Response<Tweet> = await request.json();

  return response;
};

export const getRepliesApi = async (headers: Token, tweetId: string) => {
  const request = await fetch(`${replyUrl}/${tweetId}`, {
    method: Methods.GET,
    headers: headers ? authorizationHeader(headers) : undefined,
  });

  const response: Response<Tweet[]> = await request.json();

  return response;
};
