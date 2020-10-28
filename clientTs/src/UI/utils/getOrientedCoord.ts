// convert the coordinates to display correctly when the board is flipped

import { Coordinate } from "../../../../sharedResources/TSInterfaces/boardData";

export default function getOrientedCoord(coord: Coordinate, boardOrientation: boolean): Coordinate {
  return boardOrientation ? { x: coord.x, y: coord.y } : { x: 7 - coord.x, y: 7 - coord.y };
}
