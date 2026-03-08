import { getAuthToken } from "controllers/Auth";
import { Router, type Request, type Response } from "express";
import type { SpotifyCredentials } from "types/Auth";
import type { APIResponse } from "types/HTTPService";
import { handleServerError } from "utils/HTTPUtils";

const router = Router();

// TO DO: Replace this logic for custom util that receives an object {apiResponse, onSuccess, onError}
router.get("/", async (request: Request, response: Response) => {
  const APIresponse: APIResponse<SpotifyCredentials> = await getAuthToken();
  if (APIresponse.type === "left") {
    return handleServerError(APIresponse.value, response);
  }
  if (APIresponse.value.status === 200) {
    const successResponse = APIresponse.value;
    response.cookie("token", successResponse.content, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
  }
  response.status(200).json({ message: "Logged in" });
});

export default router;
