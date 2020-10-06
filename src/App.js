import React from "react";
// import Board from "./UI/board/board";
import ChessGame from "./UITest/components/chessGame";
import "./App.css";

import GameLogic from "./gameLogic/gameLogic";

const App = () => {
  const game = new GameLogic();
  return (
    <div className="App noselect">
      {/* <Board game={game} /> */}
      <ChessGame game={game} />
    </div>
  );
};

export default App;
