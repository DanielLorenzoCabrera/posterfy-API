import type { AxiosResponse } from "axios";
import api from "config/axios";
import AUTH_SERVICE from "./APIRoutes";
import type { APIResponse } from "types/HTTPService";
import type { SpotifyCredentials } from "types/Auth";
import { handleServerError } from "utils/HTTPUtils";
import { ERRORS } from "constants/Errors";

export const getAuthToken = async (): APIResponse<SpotifyCredentials> => {
  try {
    const CLIENT_ID: string | undefined = process.env.SPOTIFY_CLIENT_ID;
    const CLIENT_SECRET: string | undefined = process.env.SPOTIFY_SECRET;
    if (!CLIENT_ID || !CLIENT_SECRET) return ERRORS.UNAUTHORIZED;

    const auth: string = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
      "base64"
    );
    const { data, status }: AxiosResponse = await api.post(
      AUTH_SERVICE.TOKEN,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    console.log(data);
    return { status, content: data };
  } catch (error) {
    return handleServerError<typeof error>(error);
  }
};
