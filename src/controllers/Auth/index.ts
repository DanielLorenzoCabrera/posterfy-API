import type { AxiosResponse } from "axios";
import apiService from "config/axios";
import AUTH_SERVICE from "./routes";
import type { APIResponse } from "types/HTTPService";
import type { SpotifyCredentials } from "types/Auth";
import { createServerError } from "utils/HTTPUtils";
import { ERRORS } from "constants/Errors";

export const getAuthToken = async (): Promise<
  APIResponse<SpotifyCredentials>
> => {
  try {
    const CLIENT_ID: string | undefined = process.env.SPOTIFY_CLIENT_ID;
    const CLIENT_SECRET: string | undefined = process.env.SPOTIFY_SECRET;
    if (!CLIENT_ID || !CLIENT_SECRET)
      return { type: "left", value: ERRORS.UNAUTHORIZED };

    const auth: string = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
      "base64"
    );
    const { data, status }: AxiosResponse = await apiService.post(
      AUTH_SERVICE.TOKEN,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    console.log(data);
    return {
      type: "right",
      value: { status, content: data as SpotifyCredentials },
    };
  } catch (error) {
    return { type: "left", value: createServerError<typeof error>(error) };
  }
};
