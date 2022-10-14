import { env } from "@/contants/env";
import { Methods } from "@/contants/requestMethod";
import type { Response } from "@/models/responseModel";
import type { RegisterSchema, Token } from "@/models/sessionModel";
import type { User } from "@/models/userModel";
import { authorizationHeader } from "./authService";

const { apiBaseUrl, apiVersion } = env;

export const getUserRequestApi = async (userId: string) => {
  const request = await fetch(`${apiBaseUrl}${apiVersion}/user/${userId}`, {
    method: Methods.GET,
  });

  const response: Response<User> = await request.json();

  return response;
};

export const getUserMeRequestApi = async (header: Token) => {
  const request = await fetch(`${apiBaseUrl}${apiVersion}/user/me`, {
    method: Methods.GET,
    headers: authorizationHeader(header),
  });

  const response: Response<User> = await request.json();

  return response;
};

export const createUserRequestApi = async (body: RegisterSchema) => {
  const request = await fetch(`${apiBaseUrl}${apiVersion}/user`, {
    method: Methods.POST,
    body: JSON.stringify(body),
  });

  const response: Response<User> = await request.json();

  return response;
};
