import React, { useEffect } from "react";
import ChessGame from "./UI/react_components/chessGame";
import "./App.css";

const App = () => {
  return (
    <div className="App noselect">
      <ChessGame />
    </div>
  );
};

export default App;
