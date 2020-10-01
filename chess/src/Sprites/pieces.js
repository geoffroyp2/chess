import React, { useState } from "react";

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

const Piece = ({ initSize, initType, initCoord }) => {
  const [size, changeSize] = useState(initSize);
  const [type, changeType] = useState(() => {
    switch (initType) {
      case "KB":
        return KingBlack;
      case "KW":
        return KingWhite;
      case "QB":
        return QueenBlack;
      case "QW":
        return QueenWhite;
      case "RB":
        return RookBlack;
      case "RW":
        return RookWhite;
      case "BB":
        return BishopBlack;
      case "BW":
        return BishopWhite;
      case "NB":
        return KnightBlack;
      case "NW":
        return KnightWhite;
      case "PB":
        return PawnBlack;
      case "PW":
      default:
        return PawnWhite;
    }
  });
  const [coord, changeCoord] = useState(initCoord);

  return (
    <img
      className="Piece"
      src={type}
      style={{
        zIndex: 5,
        height: size,
        width: size,
        top: `${coord.y * size}px`,
        left: `${coord.x * size}px`,
      }}
      alt=""
    />
  );
};
export default Piece;
