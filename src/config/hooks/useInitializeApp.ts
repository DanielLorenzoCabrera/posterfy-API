import express from "express";
import * as Config from "config/";
import cors from "cors";
import cookieParser from "cookie-parser";

export const useInitializeApp = () => {
  const app = express();

  if (process.env.NODE_ENV === "development") {
    console.log("Running in development mode, enabling CORS");
    app.use(
      cors({
        origin: "http://localhost:5173",
        credentials: true,
      }),
    );
  }
  app.use(cookieParser());
  app.listen(Config.PORT, () => {
    console.log("app running on port " + Config.PORT);
  });

  return { app };
};
