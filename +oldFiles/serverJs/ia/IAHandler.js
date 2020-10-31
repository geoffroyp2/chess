const axios = require("axios");

class IAHandler {
  getNewBoard = async (board) => {
    const r = await axios
      .post("https://localhost:44352/engine/move", {
        Board: board,
        Move: { Type: "0", From: { x: -1, y: -1 }, To: { x: -1, y: -1 } },
        Prom: "0",
      })
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.error("request path: ", e.request.path);
        console.error("Response error code: ", e.response.status);
        console.error(e.response.config);
      });
    return Promise.resolve(r);
  };

  sendMove = async (move, prom, board) => {
    const r = await axios
      .post("https://localhost:44352/engine/move", {
        Board: board,
        Move: move,
        Prom: prom || "null",
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
}

module.exports = new IAHandler();
