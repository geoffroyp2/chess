// game is the only instance of GameLogic()
import game from "../../globalInstances";

import React, { useState, useCallback, useEffect } from "react";

import Board from "./board";
import Buttons from "./buttons";
import Timer from "./timer";
import PGN from "./pgn";

import getCoord from "../helpers/getCoord";

import materialClasses from "./css/materialClasses.js";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
// import Card from "@material-ui/core/Card";
// import Paper from "@material-ui/core/Paper";

const ChessGame = () => {
  // Give the UIUpdate callback to the GameLogic instance
  useEffect(() => {
    game.giveUICallback(() => setGameData(game.getGameInfos()));
  }, []);

  //UI data
  // TODO: make boardSize scale with the window size (+ rescalable by hand ?)
  const [boardOrientation, setBoardOrientation] = useState(true);
  const [gameData, setGameData] = useState(game.getInitialData());
  const boardSize = 744;

  // TODO css with material-ui
  const styles = materialClasses();

  // Actions that are triggered by user interaction
  const resetGame = useCallback(() => {
    game.reset();
    setGameData(game.getInitialData());
  }, [game]);

  const flipBoard = useCallback(() => {
    setBoardOrientation(!boardOrientation);
  }, [boardOrientation]);

  const sendClick = (x, y) => {
    game.click(getCoord({ x, y }, boardOrientation), () =>
      setGameData(game.getGameInfos())
    );
  };

  return (
    <Grid container className={styles.root} spacing={2} xl={2}>
      <Grid item className={styles.buttons}>
        <Buttons reset={resetGame} flip={flipBoard} />
      </Grid>

      <Grid item className={styles.board} align="center">
        <Box>
          <Board
            size={boardSize}
            data={gameData}
            sendClick={sendClick}
            boardOrientation={boardOrientation}
          />
        </Box>
      </Grid>

      <Grid item>
        <Timer
          game={game}
          boardSize={boardSize}
          boardOrientation={boardOrientation}
        />
        <PGN />
      </Grid>
    </Grid>
  );
};
export default ChessGame;
