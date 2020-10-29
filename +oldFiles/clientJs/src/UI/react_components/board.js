import React, { useState } from "react";

import MouseControl from "./mouseControls";
import PiecesContainer from "./piecesContainer";
import HighlightsContainer from "./highlightsContainer";
import PromotionArea from "./promotionArea";

import BoardSVG from "../assets/svgboard/board_darkBlue.svg";
import handleData from "../helpers/handleData";

const Board = ({ size, data, sendClick, boardOrientation }) => {
  const [pieces, highlights, promotionArea, playerTurn] = handleData(data, boardOrientation);

  const boardSize = size;
  const pieceSize = boardSize / 8;

  const [highlightHovered, setHighlightHovered] = useState(null);
  const [dragPosition, setDragPosition] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pieceDragged, setPieceDragged] = useState(null);
  const [lastMouseDown, setLastMouseDown] = useState(null);

  const getHoverSquare = (x, y) => {
    const hovered = highlights.find((h) => h.coord.x === x && h.coord.y === y && (h.type === "HM" || h.type === "HX"));
    setHighlightHovered(hovered && x >= 0 && y >= 0 ? hovered.id : null);
  };

  const getDragPosition = (x, y) => {
    if (isDragging) setDragPosition([x - 0.5 * pieceSize, y - 0.5 * pieceSize]);
  };

  const processClick = (x, y, sX, sY, mouseAction) => {
    if (mouseAction) {
      // true = mouseDown
      setLastMouseDown([sX, sY]);
      const pieceToDrag = pieces.find((p) => p.coord.x === sX && p.coord.y === sY && p.type[1] === playerTurn);
      if (pieceToDrag) {
        //begin drag
        setIsDragging(true);
        setDragPosition([x - 0.5 * pieceSize, y - 0.5 * pieceSize]);
        setPieceDragged(pieceToDrag.id);
      }
      sendClick(sX, sY);
    } else {
      if (lastMouseDown && (lastMouseDown[0] !== sX || lastMouseDown[1] !== sY)) sendClick(sX, sY);
      //release drag
      setIsDragging(false);
      setDragPosition([]);
      setPieceDragged(false);
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
      <MouseControl size={boardSize} click={processClick} hoverSquare={getHoverSquare} dragPosition={getDragPosition} />
      <PiecesContainer data={pieces} size={pieceSize} pieceDragged={pieceDragged} dragPosition={dragPosition} />
      <HighlightsContainer data={highlights} size={pieceSize} highlightHovered={highlightHovered} />
      {promotionArea && <PromotionArea data={promotionArea} size={pieceSize} />}
    </div>
  );
};

export default Board;
