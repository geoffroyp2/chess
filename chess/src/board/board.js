import React from "react";
import "./board.css";

import Piece from "../Sprites/pieces";
import BoardImg from "../assets/chesscom/board_blue.png";

const Board = () => {
  return (
    <div className="Board">
      <img src={BoardImg} alt="" />
      <Piece />
    </div>
  );
};

export default Board;
