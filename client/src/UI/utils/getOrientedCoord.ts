// convert the coordinates to display correctly when the board is flipped

import { Coordinate } from "../../TSInterfaces/boardData";

export const getOrientedCoord = (coord: Coordinate, boardOrientation: boolean): Coordinate => {
  if (!boardOrientation) return { x: 7 - coord.x, y: 7 - coord.y };
  return coord;
};

export const getOrientedCoordFine = (coord: Coordinate, boardOrientation: boolean, boardSize: number): Coordinate => {
  if (!boardOrientation) return { x: boardSize - coord.x, y: boardSize - coord.y };
  return coord;
};
