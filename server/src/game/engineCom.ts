import { BoardState, Move } from "../../../client/src/TSInterfaces/boardData";
import * as https from "https";
import axios from "axios";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
const instance = axios.create({ httpsAgent });

class EngineCom {
  sendPosition(board: BoardState, move: Move, prom: number, callback: (res: any) => void) {
    const body = {
      Board: board,
      Move: move,
      Prom: prom,
    };

    instance
      .post("https://localhost:44352/engine/move", body)
      .then((res) => callback(res))
      .catch((e) => {
        console.error(e.status);
        console.error(e.data);
      });
  }
}

const engineCom = new EngineCom();
export default engineCom;
