const axios = require("axios");

class IAHandler {
  getIA = async (query) => {
    const r = await axios
      .get("https://localhost:44352/engine/move", {
        params: {
          fen: query.args.fen,
          move: query.args.from ? query.args.from + query.args.to : "init",
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
