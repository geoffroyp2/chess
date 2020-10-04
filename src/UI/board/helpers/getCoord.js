// convert the coordinates to display correctly when the board is flipped

export default function getCoord({ x, y }, boardOrientation) {
  return boardOrientation ? { x: x, y: y } : { x: 7 - x, y: 7 - y };
}
