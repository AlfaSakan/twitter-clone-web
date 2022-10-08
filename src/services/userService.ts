import { env } from "@/contants/env";
import type { Response } from "@/models/responseModel";
import type { User } from "@/models/userModel";

const { apiBaseUrl, apiVersion } = env;

export const getUserRequestApi = async (userId: string) => {
  const request = await fetch(`${apiBaseUrl}${apiVersion}/user/${userId}`, {
    method: "GET",
  });

  const response: Response<User> = await request.json();

  return response;
};
