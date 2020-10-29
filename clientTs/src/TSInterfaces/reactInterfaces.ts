import { Coordinate, Piece } from "./boardData";

export interface BoardUI {
  PlayerTurn: boolean;
  Pieces: Piece[];
  Highlights: Highlight[];
  PromotionArea: PromotionAreaInfos | null;
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

export interface PromotionAreaInfos {
  Coord: Coordinate;
  Team: boolean;
}
