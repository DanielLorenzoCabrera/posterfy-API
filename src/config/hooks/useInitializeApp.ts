import express from "express";
import * as Config from "config/";
import cors from "cors";

export const useInitializeApp = () => {
  const app = express();

  if (process.env.NODE_ENV === "development") {
    app.use(
      cors({
        origin: "http://localhost:5173",
        credentials: true,
      }),
    );
  }
  app.listen(Config.PORT, () => {
    console.log("app running on port " + Config.PORT);
  });

  return { app };
};
