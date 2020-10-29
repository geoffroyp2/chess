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

export const getPieceSVG = (type: PieceType, team: boolean): string => {
  if (team && type === PieceType.King) return KingWhite;
  else if (!team && type === PieceType.King) return KingBlack;
  else if (team && type === PieceType.Queen) return QueenWhite;
  else if (!team && type === PieceType.Queen) return QueenBlack;
  else if (team && type === PieceType.Rook) return RookWhite;
  else if (!team && type === PieceType.Rook) return RookBlack;
  else if (team && type === PieceType.Bishop) return BishopWhite;
  else if (!team && type === PieceType.Bishop) return BishopBlack;
  else if (team && type === PieceType.Knight) return KnightWhite;
  else if (!team && type === PieceType.Knight) return KnightBlack;
  else if (team && type === PieceType.Pawn) return PawnWhite;
  else if (!team && type === PieceType.Pawn) return PawnBlack;
  else return "";
};

export const getHighlightSVG = (type: HighlightType): string => {
  switch (type) {
    case HighlightType.Capture:
      return HCapture;
    case HighlightType.Check:
      return HCheck;
    case HighlightType.LastMove:
      return HLastMove;
    case HighlightType.Move:
      return HMove;
    case HighlightType.Select:
      return HSelection;
    default:
      return "";
  }
};
