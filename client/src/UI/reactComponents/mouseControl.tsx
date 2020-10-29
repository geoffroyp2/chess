import React, { memo, useState } from "react";
import { Coordinate } from "../../TSInterfaces/boardData";

interface Props {
  boardSize: number;
  sendClick: (cFine: Coordinate, cSquare: Coordinate, isMouseDown: boolean) => void;
  updateHoverSquare: (coord: Coordinate | null) => void;
  updateDragPosition: (coord: Coordinate | null) => void;
  boardOrientation: boolean;
}

const MouseControl = memo(({ boardSize, sendClick, updateHoverSquare, updateDragPosition, boardOrientation }: Props) => {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [lastHoverSquare, setLastHoverSquare] = useState<Coordinate | null>(null);

  // const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
  const onMouseDown = (e: any): void => {
    const cFine = { x: e.nativeEvent.layerX, y: e.nativeEvent.layerY };
    const cSquare = { x: Math.floor((cFine.x / boardSize) * 8), y: Math.floor((cFine.y / boardSize) * 8) };
    setIsMouseDown(true);
    sendClick(cFine, cSquare, true);
  };

  const onMouseUp = (e: any): void => {
    const cFine = { x: e.nativeEvent.layerX, y: e.nativeEvent.layerY };
    const cSquare = { x: Math.floor((cFine.x / boardSize) * 8), y: Math.floor((cFine.y / boardSize) * 8) };
    sendClick(cFine, cSquare, false);
    setIsMouseDown(false);
  };

  const onMouseMove = (e: any): void => {
    // TODO
    const cFine = { x: e.nativeEvent.layerX, y: e.nativeEvent.layerY };
    const cSquare = { x: Math.floor((cFine.x / boardSize) * 8), y: Math.floor((cFine.y / boardSize) * 8) };

    if (isMouseDown) updateDragPosition(cFine);
    if (lastHoverSquare && (lastHoverSquare.x !== cSquare.x || lastHoverSquare?.y !== cSquare.y)) {
      setLastHoverSquare(cSquare);
      updateHoverSquare(cSquare);
    }
  };

  const onMouseLeave = (): void => {
    // TODO: maybe find a better solution ?
    updateHoverSquare(null);
    setLastHoverSquare(null);
  };

  return (
    <div
      style={{ position: "absolute", width: boardSize, height: boardSize, zIndex: 100 }}
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}></div>
  );
});

export default MouseControl;
