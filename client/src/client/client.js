import axios from "axios";

function sendRequest(query, callback) {
  axios
    .post("http://localhost:3001/chess", { query })
    .then((res) => {
      callback(res.data);
    })
    .catch((e) => console.error(e));
}

const Client = { sendRequest };
export default Client;
