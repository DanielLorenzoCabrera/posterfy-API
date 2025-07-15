import express from "express";

const app = express();
const port = 3000;

app.get("/", (request, response) => {
  response.send("");
});

app.listen(port, () => {
  console.log("app running on port " + port);
});
