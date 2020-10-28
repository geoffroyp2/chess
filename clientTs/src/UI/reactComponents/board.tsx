import React, { useEffect, useState } from "react";
import { Coordinate, Piece } from "../../../../sharedResources/TSInterfaces/boardData";
import { BoardUI, Highlight, HighlightType } from "../../../../sharedResources/TSInterfaces/reactInterfaces";

import MouseControl from "./mouseControl";
// import PiecesContainer from "./piecesContainer";
// import HighlightsContainer from "./highlightsContainer";
// import PromotionArea from "./promotionArea";

import BoardSVG from "../assets/svgboard/board_darkBlue.svg";
import handleData from "../utils/handleData";

interface Props {
  BoardSize: number;
  BoardData: BoardUI;
  sendClick: (coord: Coordinate, isMouseDown: boolean) => void;
  BoardOrientation: boolean;
}

// interface MouseActions {
//   isDragging: boolean;
//   DragPosition: Coordinate;
//   lastMouseDown: Coordinate;
// }

const Board = ({ BoardSize, BoardData, sendClick, BoardOrientation }: Props) => {
  useEffect(() => {
    handleData(BoardData, BoardOrientation);
    setData(BoardData);
  }, [BoardData, BoardOrientation]);

  const [data, setData] = useState(BoardData);
  const [boardSize] = useState(BoardSize);
  const [pieceSize] = useState(BoardSize / 8);

  const [HighlightHovered, setHighlightHovered] = useState<Highlight | null>(null);
  const [PieceDragged, setPieceDragged] = useState<Piece | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragPosition, setDragPosition] = useState<Coordinate | null>(null);
  const [lastMouseDown, setLastMouseDown] = useState<Coordinate | null>(null);

  const updateHoverSquare = (coord: Coordinate | null): void => {
    // called from the mouseControl zone
    if (coord) {
      const hovered = data.Highlights.find(
        (h) => h.Coord.x === coord.x && h.Coord.y === coord.y && (h.Type === HighlightType.Move || h.Type === HighlightType.Capture)
      );
      setHighlightHovered(hovered || null);
    } else setHighlightHovered(null);
  };

  const updateDragPosition = (coord: Coordinate | null): void => {
    // called from the mouseControl zone
    setDragPosition(coord ? { x: coord.x - 0.5 * pieceSize, y: coord.y - 0.5 * pieceSize } : null);
  };

  const processClick = (cFine: Coordinate, cSquare: Coordinate, isMouseDown: boolean): void => {
    // called from the mouseControl zone
    if (isMouseDown) {
      setLastMouseDown(cSquare);
      const pieceToDrag = data.Pieces.find((p) => p.Coord.x === cSquare.x && p.Coord.y === cSquare.y && p.Team === data.PlayerTurn);
      if (pieceToDrag) {
        setIsDragging(true);
        setDragPosition({ x: cFine.x - 0.5 * pieceSize, y: cFine.y - 0.5 * pieceSize });
        setPieceDragged(pieceToDrag);
      }
      sendClick(cSquare, isMouseDown);
    } else {
      if (lastMouseDown && (lastMouseDown.x !== cSquare.x || lastMouseDown.y !== cSquare.y)) {
        sendClick(cSquare, isMouseDown);
      }
      setIsDragging(false);
      setPieceDragged(null);
      setDragPosition(null);
      setLastMouseDown(null);
    }
  };

  return (
    <div
      className="Board"
      style={{
        position: "absolute",
        width: boardSize,
        height: boardSize,
        backgroundImage: `url(${BoardSVG})`,
        zIndex: 1,
      }}>
      <MouseControl
        BoardSize={boardSize}
        sendClick={processClick}
        updateHoverSquare={updateHoverSquare}
        updateDragPosition={updateDragPosition}
      />
      {/* <PiecesContainer data={pieces} size={pieceSize} pieceDragged={pieceDragged} dragPosition={dragPosition} />
      <HighlightsContainer data={highlights} size={pieceSize} highlightHovered={highlightHovered} />
      {promotionArea && <PromotionArea data={promotionArea} size={pieceSize} />} */}
    </div>
  );
};

export default Board;

/*
  //   const getHoverSquare = (x, y) => {
  //     const hovered = highlights.find((h) => h.coord.x === x && h.coord.y === y && (h.type === "HM" || h.type === "HX"));
  //     setHighlightHovered(hovered && x >= 0 && y >= 0 ? hovered.id : null);
  //   };

  //   const getDragPosition = (x, y) => {
  //     if (isDragging) setDragPosition([x - 0.5 * pieceSize, y - 0.5 * pieceSize]);
  //   };

  //   const processClick = (x, y, sX, sY, mouseAction) => {
  //     if (mouseAction) {
  //       // true = mouseDown
  //       setLastMouseDown([sX, sY]);
  //       const pieceToDrag = pieces.find((p) => p.coord.x === sX && p.coord.y === sY && p.type[1] === playerTurn);
  //       if (pieceToDrag) {
  //         //begin drag
  //         setIsDragging(true);
  //         setDragPosition([x - 0.5 * pieceSize, y - 0.5 * pieceSize]);
  //         setPieceDragged(pieceToDrag.id);
  //       }
  //       sendClick(sX, sY);
  //     } else {
  //       if (lastMouseDown && (lastMouseDown[0] !== sX || lastMouseDown[1] !== sY)) sendClick(sX, sY);
  //       //release drag
  //       setIsDragging(false);
  //       setDragPosition([]);
  //       setPieceDragged(false);
  //       setLastMouseDown(null);
  //     }
  //   };
*/
