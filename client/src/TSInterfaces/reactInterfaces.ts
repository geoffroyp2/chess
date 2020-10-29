import { Coordinate, PieceType } from "./boardData";

// interfaces with simplified data to be passed to the UI

export interface BoardUI {
  PlayerTurn: boolean;
  Pieces: PieceUI[];
  Highlights: HighlightUI[];
  PromotionArea: PromotionAreaInfos | null;
}

export interface PieceUI {
  Team: boolean;
  Type: PieceType;
  Coord: Coordinate;
}

export enum HighlightType {
  Select,
  Move,
  Capture,
  Check,
  LastMove,
}

export interface HighlightUI {
  Type: HighlightType;
  Coord: Coordinate;
}

export interface PromotionAreaInfos {
  Coord: Coordinate;
  Team: boolean;
}
