import HMove from "../../assets/highlights/hl_move_green.svg";
import HCapture from "../../assets/highlights/hl_capture_green.svg";
import HSelection from "../../assets/highlights/hl_green.svg";
import HLastMove from "../../assets/highlights/hl_yellow.svg";
import HCheck from "../../assets/highlights/hl_check_red.svg";

import KingBlack from "../../assets/lichess/king_black.svg";
import QueenBlack from "../../assets/lichess/queen_black.svg";
import RookBlack from "../../assets/lichess/rook_black.svg";
import BishopBlack from "../../assets/lichess/bishop_black.svg";
import KnightBlack from "../../assets/lichess/knight_black.svg";
import PawnBlack from "../../assets/lichess/pawn_black.svg";
import KingWhite from "../../assets/lichess/king_white.svg";
import QueenWhite from "../../assets/lichess/queen_white.svg";
import RookWhite from "../../assets/lichess/rook_white.svg";
import BishopWhite from "../../assets/lichess/bishop_white.svg";
import KnightWhite from "../../assets/lichess/knight_white.svg";
import PawnWhite from "../../assets/lichess/pawn_white.svg";

import { PieceType } from "../../TSInterfaces/boardData";
import { HighlightType } from "../../TSInterfaces/reactInterfaces";

// Get SVG files from id

const pieceSVG = [
  { white: KingWhite, black: KingBlack },
  { white: QueenWhite, black: QueenBlack },
  { white: RookWhite, black: RookBlack },
  { white: KnightWhite, black: KnightBlack },
  { white: BishopWhite, black: BishopBlack },
  { white: PawnWhite, black: PawnBlack },
];

export const getPieceSVG = (type: PieceType, team: boolean): string => {
  return pieceSVG[type][team ? "white" : "black"];
};

const highlightSVG = [HSelection, HMove, HCapture, HCheck, HLastMove];

export const getHighlightSVG = (type: HighlightType): string => {
  return highlightSVG[type];
};
