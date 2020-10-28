import { Coordinate, Piece } from "./boardData";

export interface BoardUI {
  PlayerTurn: boolean;
  Pieces: Piece[];
  Highlights: Highlight[];
  PromotionArea: PromotionArea | null;
}

export enum HighlightType {
  Select,
  Move,
  Capture,
  Check,
  LastMove,
}

export interface Highlight {
  Type: HighlightType;
  Coord: Coordinate;
}

export interface PromotionArea {
  Coord: Coordinate | null;
}
