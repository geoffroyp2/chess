import React from "react";
import ChessGame from "./UI/react_components/chessGame";
import "./App.css";
import { CssBaseline } from "@material-ui/core";

const App = () => {
  return (
    <>
      <div className="App noselect">
        <ChessGame />
      </div>
      <CssBaseline />
    </>
  );
};

export default App;
