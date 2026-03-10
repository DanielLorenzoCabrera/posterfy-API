import axios from "axios";
import { Router, type Request, type Response } from "express";
import { handleServerError } from "utils/HTTPUtils";

const router = Router();
const LIMIT = 100;

router.get("/", async (request: Request, response: Response) => {
  try {
    const { playlistId } = request.query;

    if (!playlistId || typeof playlistId !== "string") {
      return response.status(400).json({
        message: "playlistId query param is required",
      });
    }

    const token = request.cookies?.token;

    if (!token) {
      return response.status(401).json({
        message: "Missing auth token",
      });
    }

    let items: any[] = [];
    let total: number = LIMIT;

    while (items.length < total) {
      const spotifyResponse = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
          params: {
            limit: LIMIT,
          },
        },
      );

      items = [...items, ...spotifyResponse.data.items];
      total = spotifyResponse.data.total;
    }

    const coversSet = new Set<string>();

    items.forEach((item: any) => {
      const cover = item.track?.album?.images?.[0]?.url;
      if (cover) {
        coversSet.add(cover);
      }
    });

    const covers = Array.from(coversSet);
    console.log(
      `Extracted ${covers.length} unique covers from playlist ${playlistId}`,
    );

    return response.status(200).json({
      covers,
    });
  } catch (error) {
    return handleServerError(error, response);
  }
});

export default router;
