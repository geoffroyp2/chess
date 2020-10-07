import React, { useState, useCallback } from "react";

import Board from "./board";
import Buttons from "./buttons";

import getCoord from "../helpers/getCoord";
import GameLogic from "../../gameLogic/gameLogic";

const ChessGame = () => {
  const [game] = useState(new GameLogic());

  const [boardOrientation, setBoardOrientation] = useState(true);
  const [gameData, setGameData] = useState(game.getInitialData());

  const resetGame = useCallback(() => {
    game.reset();
    setGameData(game.getInitialData());
  }, [game]);

  const flipBoard = useCallback(() => {
    setBoardOrientation(!boardOrientation);
  }, [boardOrientation]);

  const sendClick = (x, y) => {
    setGameData(game.click(getCoord({ x, y }, boardOrientation)));
  };

  return (
    <>
      <Buttons reset={resetGame} flip={flipBoard} />
      <Board
        data={gameData}
        sendClick={sendClick}
        boardOrientation={boardOrientation}
      />
    </>
  );
};
export default ChessGame;
