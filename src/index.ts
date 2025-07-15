import express from "express";
import "./config";
import { getAuthToken } from "./controllers/Auth";

const app = express();
const port = 3000;

app.get("/", async (request, response) => {
  response.send("");
  await getAuthToken();
});

app.listen(port, () => {
  console.log("app running on port " + port);
});
