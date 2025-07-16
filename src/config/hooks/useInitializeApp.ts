import express from "express";
import * as Config from "config/";

export const useInitializeApp = () => {
  const app = express();

  app.listen(Config.PORT, () => {
    console.log("app running on port " + Config.PORT);
  });

  return { app };
};
