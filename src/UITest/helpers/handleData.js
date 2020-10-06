import getCoord from "../helpers/getCoord";

export default function handleData(
  [pieces, highlights, promotionArea, pieceSelected],
  boardOrientation
) {
  console.log("handling data", boardOrientation);
  const newPieces = pieces.map((p) => ({
    coord: getCoord(p.coord, boardOrientation),
    type: p.type,
    id: p.id,
  }));
  const newHighlights = highlights.map((h) => ({
    coord: getCoord(h.coord, boardOrientation),
    type: h.type,
    id: h.id,
  }));
  const newPromotionArea = promotionArea && {
    pieceCoord: promotionArea.coord,
    graphicsCoord: getCoord(promotionArea.coord, boardOrientation),
  };
  const newPieceSelected =
    pieceSelected && newPieces.find((p) => p.id === pieceSelected.id);

  return [newPieces, newHighlights, newPromotionArea, newPieceSelected];
}
