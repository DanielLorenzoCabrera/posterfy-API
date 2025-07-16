import type { AxiosResponse } from "axios";
import api from "config/axios";
import AUTH_SERVICE from "./routes";
import type { APIResponse } from "types/HTTPService";
import type { SpotifyCredentials } from "types/Auth";
import { handleServerError } from "utils/HTTPUtils";

export const getAuthToken =
  async (): APIResponse<SpotifyCredentials | void> => {
    try {
      const CLIENT_ID: string | undefined = process.env.SPOTIFY_CLIENT_ID;
      const CLIENT_SECRET: string | undefined = process.env.SPOTIFY_SECRET;
      if (!CLIENT_ID || !CLIENT_SECRET)
        return console.error("Missing client ID or Secret");
      const auth: string = Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64");
      const { data }: AxiosResponse = await api.post(
        AUTH_SERVICE.TOKEN,
        "grant_type=client_credentials",
        {
          headers: {
            Authorization: `Basic ${auth}`,
          },
        }
      );
      console.log(data);
      return data;
    } catch (error) {
      handleServerError<typeof error>(error);
    }
  };
