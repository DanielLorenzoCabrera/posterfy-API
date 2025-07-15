import api from "../../config/axios";
import AUTH_SERVICE from "./routes";

export const getAuthToken = async () => {
  const CLIENT_ID: string | undefined = process.env.SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET: string | undefined = process.env.SPOTIFY_SECRET;
  const auth: string = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    "base64"
  );
  const credentials = await api.post(
    AUTH_SERVICE.TOKEN,
    {},
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    }
  );
};
