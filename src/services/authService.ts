import { env } from "@/contants/env";
import type { Response } from "@/models/responseModel";
import type { LoginSchema, Session, Token } from "@/models/sessionModel";

const { apiBaseUrl, apiVersion } = env;

export const authorizationHeader = (headers: Token) => ({
  Authorization: headers.access_token,
  "X-Refresh": headers.refresh_token,
});

export const loginRequestApi = async (body: LoginSchema) => {
  const request = await fetch(`${apiBaseUrl}${apiVersion}/session`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  const response: Response<Session> = await request.json();

  return response;
};
