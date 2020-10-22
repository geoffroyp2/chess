const express = require("express");
const https = require("https");
const favicon = require("serve-favicon");
const path = require("path");
const app = express();

const gameHandler = require("./API/APIHandler");
const iaHandler = require("./ia/IAHandler");

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
}

app.get("/api/chess", (req, res) => {
  const APIanswer = gameHandler.request(req.query.q);

  const cb = (api, ai) => {
    const answer = {
      id: APIanswer.id,
      args: APIanswer.args,
      ai: ai,
    };
    res.json(answer);
  };

  iaHandler.getBoard((r) => {
    let AIanswer = "";
    r.on("data", (d) => {
      AIanswer += d;
    });
    r.on("end", () => {
      AIanswer = JSON.parse(AIanswer);
      cb(APIanswer, AIanswer);
    });
  });
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
