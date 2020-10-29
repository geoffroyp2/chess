import { APIResponse } from "../../TSInterfaces/APIRequest";
import { GameState, Move, PieceType } from "../../TSInterfaces/boardData";
import generateFEN from "../utils/FENGenerator";
import { sendRequest } from "./sendRequest";

const newGame = (mode: string, totalTime: number, increment: number, callback: (state: GameState) => void): void => {
  const onReceive = (res: APIResponse): void => {
    if (res.ResId > 0) callback(res.GameState);
    else console.error("New game error, ID:", res.ResId);
  };

  sendRequest(
    {
      ReqType: "NG",
      GameMode: mode,
      Time: totalTime,
      Increment: increment,
    },
    onReceive
  );
};

const sendMove = (state: GameState, move: Move, promotionTarget: PieceType | null, callback: (state: GameState) => void): void => {
  const onReceive = (res: APIResponse): void => {
    if (res.ResId > 0) callback(res.GameState);
    else console.error("Move send error, ID:", res.ResId);
  };

  sendRequest(
    {
      ReqType: "M",
      GameId: state.GameData.GameId,
      Data: {
        Board: state.BoardState,
        FEN: generateFEN(state),
        Move: move,
        Prom: promotionTarget,
      },
    },
    onReceive
  );
};

const client = { newGame, sendMove };
export default client;
