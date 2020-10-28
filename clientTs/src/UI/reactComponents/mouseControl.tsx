import React, { memo, useState } from "react";
import { Coordinate } from "../../../../sharedResources/TSInterfaces/boardData";

interface Props {
  BoardSize: number;
  sendClick: (cFine: Coordinate, cSquare: Coordinate, isMouseDown: boolean) => void;
  updateHoverSquare: (coord: Coordinate | null) => void;
  updateDragPosition: (coord: Coordinate) => void;
}

const MouseControl = memo(({ BoardSize, sendClick, updateHoverSquare, updateDragPosition }: Props) => {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [lastHoverSquare, setLastHoverSquare] = useState<Coordinate | null>(null);

  const onMouseDown = (e: MouseEvent): void => {
    // TODO
    // const x = e.nativeEvent.layerX;
    // const y = e.nativeEvent.layerY;
    // const sX = Math.floor((x / size) * 8);
    // const sY = Math.floor((y / size) * 8);
    // setIsMouseDown(true);
    // click(x, y, sX, sY, true);
  };

  const onMouseUp = (e: MouseEvent): void => {
    // TODO
    // const x = e.nativeEvent.layerX;
    // const y = e.nativeEvent.layerY;
    // const sX = Math.floor((x / size) * 8);
    // const sY = Math.floor((y / size) * 8);
    // // if (lastMouseDown && (lastMouseDown[0] !== sX || lastMouseDown[1] !== sY))
    // click(x, y, sX, sY, false);
    // setIsMouseDown(false);
    // // setLastMouseDown(null);
  };

  const onMouseMove = (e: MouseEvent): void => {
    // TODO
    // const x = e.nativeEvent.layerX;
    // const y = e.nativeEvent.layerY;
    // const sX = Math.floor((x / size) * 8);
    // const sY = Math.floor((y / size) * 8);
    // if (isMouseDown) {
    //   dragPosition(x, y);
    // }
    // if (lastHoverSquare[0] !== sX || lastHoverSquare[1] !== sY) {
    //   setLastHoverSquare([sX, sY]);
    //   hoverSquare(sX, sY);
    // }
  };

  const onMouseLeave = (): void => {
    updateHoverSquare(null);
    setLastHoverSquare(null);
  };

  return (
    <div
      style={{ position: "absolute", width: BoardSize, height: BoardSize, zIndex: 100 }}
      onMouseMove={() => onMouseMove}
      onMouseDown={() => onMouseDown}
      onMouseUp={() => onMouseUp}
      onMouseLeave={onMouseLeave}></div>
  );
});

export default MouseControl;
