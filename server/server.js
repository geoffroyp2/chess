const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");
const app = express();

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
}

app.get("/api/chess", (req, res) => {
  console.log(req.query);
  res.json(req.query);
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
