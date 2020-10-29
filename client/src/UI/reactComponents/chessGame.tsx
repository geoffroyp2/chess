import React, { useState, useCallback, useEffect } from "react";
import { Coordinate } from "../../TSInterfaces/boardData";

import game from "../../gameLogic/gameLogic";

import Board from "./board";
import Buttons from "./buttons";
import Timer from "./timer";
// import PGN from "./pgn";

import { getOrientedCoord } from "../utils/getOrientedCoord";

const ChessGame = () => {
  useEffect(() => {
    game.plugUI(() => setGameData(game.getGameInfos()));
    game.newGame(300, 5, "DEFAULT");
  }, []);

  const [boardOrientation, setBoardOrientation] = useState(true);
  const [gameData, setGameData] = useState(game.getGameInfos());
  const boardSize = 744;

  const resetGame = useCallback((): void => {
    game.reset();
  }, []);

  const flipBoard = useCallback((): void => {
    setBoardOrientation(!boardOrientation);
  }, [boardOrientation]);

  const sendClick = (coord: Coordinate, isMouseUp: boolean): void => {
    game.click(getOrientedCoord(coord, boardOrientation), isMouseUp);
  };

  return (
    <div>
      <Buttons reset={resetGame} flip={flipBoard} />
      <Board boardSize={boardSize} boardData={gameData} sendClick={sendClick} boardOrientation={boardOrientation} />
      <Timer boardSize={boardSize} boardOrientation={boardOrientation} />
    </div>
  );
};

export default ChessGame;
