// converts all coordinates in the board data if the board is flipped

import { BoardUI } from "../../TSInterfaces/reactInterfaces";
import { getOrientedCoord } from "./getOrientedCoord";

export default function handleData(data: BoardUI, boardOrientation: boolean): BoardUI {
  if (!boardOrientation) {
    let newData: BoardUI = {
      PlayerTurn: data.PlayerTurn,
      Pieces: [],
      Highlights: [],
      PromotionArea: data.PromotionArea
        ? { Coord: getOrientedCoord(data.PromotionArea.Coord, boardOrientation), Team: data.PromotionArea.Team }
        : null,
    };
    data.Pieces.forEach((p) => {
      newData.Pieces.push({
        Type: p.Type,
        Team: p.Team,
        EP: p.EP,
        Castle: p.Castle,
        Coord: getOrientedCoord(p.Coord, boardOrientation),
        Moves: [],
      });
    });
    data.Highlights.forEach((h) => {
      newData.Highlights.push({
        Type: h.Type,
        Coord: getOrientedCoord(h.Coord, boardOrientation),
      });
    });

    return newData;
  } else return data;
}
