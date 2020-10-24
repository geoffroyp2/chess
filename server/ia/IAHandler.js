const axios = require("axios");

class IAHandler {
  getNewBoard = async (fen) => {
    const r = await axios
      .get("https://localhost:44352/engine/move", {
        params: {
          fen: fen,
          move: "null",
          prom: "null",
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.error("request path: ", e.request.path);
        console.error("Response error code: ", e.response.status);
      });
    return Promise.resolve(r);
  };

  sendMove = async (from, to, prom, fen) => {
    const r = await axios
      .get("https://localhost:44352/engine/move", {
        params: {
          fen: fen,
          move: from + to,
          prom: prom || "null",
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.error("request path: ", e.request.path);
        console.error("Response error code: ", e.response.status);
      });
    return Promise.resolve(r);
  };

  getIA = async (query) => {
    const r = await axios
      .get("https://localhost:44352/engine/move", {
        params: {
          fen: query.args.fen,
          move: query.args.from ? query.args.from + query.args.to : "null",
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.error("request path: ", e.request.path);
        // console.error("Request config:\n", e.config);
        console.error("Response error code: ", e.response.status);
      });
    return Promise.resolve(r);
  };
}

module.exports = new IAHandler();
