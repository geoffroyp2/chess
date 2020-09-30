import React from "react";

import KingBlack from "../assets/lichess/king_black.svg";
import QueenBlack from "../assets/lichess/queen_black.svg";
import RookBlack from "../assets/lichess/rook_black.svg";
import BishopBlack from "../assets/lichess/bishop_black.svg";
import KnightBlack from "../assets/lichess/knight_black.svg";
import PawnBlack from "../assets/lichess/pawn_black.svg";

import KingWhite from "../assets/lichess/king_white.svg";
import QueenWhite from "../assets/lichess/queen_white.svg";
import RookWhite from "../assets/lichess/rook_white.svg";
import BishopWhite from "../assets/lichess/bishop_white.svg";
import KnightWhite from "../assets/lichess/knight_white.svg";
import PawnWhite from "../assets/lichess/pawn_white.svg";

const Piece = () => {
  const size = 80;
  return (
    <div className="Pieces">
      <div>
        <img src={KingWhite} style={{ height: size, width: size }} alt="" />
        <img src={QueenWhite} style={{ height: size, width: size }} alt="" />
        <img src={RookWhite} style={{ height: size, width: size }} alt="" />
        <img src={BishopWhite} style={{ height: size, width: size }} alt="" />
        <img src={KnightWhite} style={{ height: size, width: size }} alt="" />
        <img src={PawnWhite} style={{ height: size, width: size }} alt="" />
      </div>
      <div>
        {" "}
        <img src={KingBlack} style={{ height: size, width: size }} alt="" />
        <img src={QueenBlack} style={{ height: size, width: size }} alt="" />
        <img src={RookBlack} style={{ height: size, width: size }} alt="" />
        <img src={BishopBlack} style={{ height: size, width: size }} alt="" />
        <img src={KnightBlack} style={{ height: size, width: size }} alt="" />
        <img src={PawnBlack} style={{ height: size, width: size }} alt="" />
      </div>
    </div>
  );
};
export default Piece;
