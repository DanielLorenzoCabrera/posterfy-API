import { getAuthToken } from "controllers/Auth";
import { Router, type Request, type Response } from "express";

const router = Router();

router.get("/", async (request: Request, response: Response) => {
  const APIresponse = await getAuthToken();
  response.status(APIresponse.status).json(APIresponse);
});

export default router;
