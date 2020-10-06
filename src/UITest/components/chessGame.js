import React, { useState, useCallback } from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Board from "./board";
import Buttons from "./buttons";

import handleData from "../helpers/handleData";
import getCoord from "../helpers/getCoord";

const ChessGame = ({ game }) => {
  const [boardOrientation, setBoardOrientation] = useState(true);
  // const boardOrientation = true;
  const [gameData, setGameData] = useState(
    handleData(game.getInitialData(), true)
  );

  const updateData = useCallback(
    (newData) => {
      setGameData(handleData(newData, boardOrientation));
      console.log("updating data", newData, boardOrientation);
    },
    [boardOrientation]
  );

  const resetGame = useCallback(() => {
    game.reset();
    const newData = game.getInitialData();
    updateData(newData);
  }, [game, updateData]);

  const flipBoard = useCallback(() => {
    setBoardOrientation(!boardOrientation);
    updateData(gameData);
  }, [gameData, boardOrientation, updateData]);

  const sendClick = (x, y) => {
    const newData = game.click(getCoord({ x, y }, boardOrientation));
    updateData(newData);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Buttons reset={resetGame} flip={flipBoard} />
      <Board data={gameData} click={sendClick} bi={boardOrientation} />
    </DndProvider>
  );
};
export default ChessGame;
