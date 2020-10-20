const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");
const app = express();

const gameHandler = require("./API/APIHandler");

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
}

app.get("/api/chess", (req, res) => {
  const answer = gameHandler.request(req.query.q);

  // answer after a random delay of 20-50ms
  //res.json(answer);
  setTimeout(() => res.json(answer), Math.floor(Math.random() * 30) + 20);
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
