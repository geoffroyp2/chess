import React from "react";
import Board from "./UI/board/board";
import "./App.css";

import GameLogic from "./gameLogic/gameLogic";

const App = () => {
  const game = new GameLogic();
  return (
    <div className="App">
      <Board game={game} />
    </div>
  );
};

export default App;
