import React from "react";
import ChessGame from "./UI/reactComponents/chessGame";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="App noselect">
        <ChessGame />
      </div>
    </>
  );
};

export default App;
