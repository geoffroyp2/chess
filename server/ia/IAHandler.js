const https = require("https");

class IAHandler {
  contructor() {
    this.BoardGETOptions = {
      hostname: "localhost",
      port: 44352,
      path: "/Board",
      method: "GET",
      //   agentOptions: {
      //     rejectUnauthorized: false,
      //   },
    };
  }

  getBoard(cb) {
    const req = https.request(
      {
        hostname: "localhost",
        port: 44352,
        path: "/Board",
        method: "GET",
      },
      cb
    );

    req.on("error", (e) => console.error(e));
    req.end();
  }
}

module.exports = new IAHandler();
