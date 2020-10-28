// converts all coordinates in the board data if the board is flipped

import { BoardUI } from "../../../../sharedResources/TSInterfaces/reactInterfaces";
import getOrientedCoord from "./getOrientedCoord";

export default function handleData(data: BoardUI, boardOrientation: boolean) {
  if (!boardOrientation) {
    data.Pieces.forEach((p) => {
      p.Coord = getOrientedCoord(p.Coord, boardOrientation);
    });
    data.Highlights.forEach((h) => {
      h.Coord = getOrientedCoord(h.Coord, boardOrientation);
    });
  }
}
