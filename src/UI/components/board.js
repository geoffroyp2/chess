import React, { useState } from "react";

import MouseControl from "./mouseControls";
import Pieces from "./pieces";
import Highlights from "./highlights";
import PromotionArea from "./promotionArea";

import BoardSVG from "../assets/svgboard/board_darkBlue.svg";
import handleData from "../helpers/handleData";

const Board = ({ data, sendClick, boardOrientation }) => {
  const [pieces, highlights, promotionArea, playerTurn] = handleData(
    data,
    boardOrientation
  );

  const boardSize = 744;
  const pieceSize = boardSize / 8;

  const [highlightHovered, setHighlightHovered] = useState(null);
  const [dragPosition, setDragPosition] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pieceDragged, setPieceDragged] = useState(null);
  const [lastMouseDown, setLastMouseDown] = useState(null);

  const getHoverSquare = (x, y) => {
    const hovered = highlights.find(
      (h) =>
        h.coord.x === x &&
        h.coord.y === y &&
        (h.type === "HM" || h.type === "HX")
    );
    setHighlightHovered(hovered && x && y ? hovered.id : null);
  };

  const getDragPosition = (x, y) => {
    if (isDragging) setDragPosition([x, y]);
  };

  const processClick = (x, y, sX, sY, mouseAction) => {
    if (mouseAction) {
      // true = mouseDown
      setLastMouseDown([sX, sY]);
      const pieceToDrag = pieces.find(
        (p) => p.coord.x === sX && p.coord.y === sY && p.id[0] === playerTurn
      );
      if (pieceToDrag) {
        //begin drag
        setIsDragging(true);
        setDragPosition([x, y]);
        setPieceDragged(pieceToDrag.id);
      }
      sendClick(sX, sY);
    } else {
      if (lastMouseDown && (lastMouseDown[0] !== sX || lastMouseDown[1] !== sY))
        sendClick(sX, sY);
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
      }}
    >
      <MouseControl
        click={processClick}
        size={boardSize}
        hoverSquare={getHoverSquare}
        dragPosition={getDragPosition}
      />
      <Pieces
        data={pieces}
        size={pieceSize}
        pieceDragged={pieceDragged}
        dragPosition={dragPosition}
      />
      <Highlights
        data={highlights}
        size={pieceSize}
        highlightHovered={highlightHovered}
      />
      {promotionArea && <PromotionArea data={promotionArea} size={pieceSize} />}
    </div>
  );
};

export default Board;
