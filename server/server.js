const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");
const app = express();

const gameHandler = require("./API/gameHandler");
const iaHandler = require("./ia/IAHandler");
const { getIA } = require("./ia/IAHandler");

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
}

app.get("/api/chess", (req, res) => {
  (async () => {
    return gameHandler.request(req.query.q);
  })().then((result) => {
    res.json(result);
  });
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
