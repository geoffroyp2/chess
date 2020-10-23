const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");
const app = express();

const gameHandler = require("./API/APIHandler");
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
    return Promise.all([
      await gameHandler.request(req.query.q),
      await getIA(JSON.parse(req.query.q)),
    ]);
  })()
    .then(([game, ai]) => {
      const result = {
        id: game.id,
        args: game.args,
        ai: ai,
      };
      res.json(result);
    })
    .catch((e) => console.error(e.code));
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
