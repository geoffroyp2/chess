import React, { useState } from "react";
import { Coordinate } from "../../TSInterfaces/boardData";
import { BoardUI, PieceUI, HighlightUI, HighlightType } from "../../TSInterfaces/reactInterfaces";

import MouseControl from "./mouseControl";
import PiecesContainer from "./piecesContainer";
import HighlightsContainer from "./highlightsContainer";
import PromotionAreaComponent from "./promotionAreaComponent";

import BoardSVG from "../../assets/svgboard/board_darkBlue.svg";
import handleData from "../utils/handleData";

interface Props {
  boardSize: number;
  boardData: BoardUI;
  sendClick: (coord: Coordinate, isMouseDown: boolean) => void;
  boardOrientation: boolean;
}

const Board = ({ boardSize, boardData, sendClick, boardOrientation }: Props) => {
  const { PlayerTurn, Pieces, Highlights, PromotionArea } = handleData(boardData, boardOrientation);
  const pieceSize = boardSize / 8;

  const [highlightHovered, setHighlightHovered] = useState<HighlightUI | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [pieceDragged, setPieceDragged] = useState<PieceUI | null>(null);
  const [dragPosition, setDragPosition] = useState<Coordinate | null>(null);
  const [lastMouseDown, setLastMouseDown] = useState<Coordinate | null>(null);

  const updateHoverSquare = (coord: Coordinate | null): void => {
    // called from the mouseControl zone

    if (coord) {
      const hovered = Highlights.find(
        (h) => h.Coord.x === coord.x && h.Coord.y === coord.y && (h.Type === HighlightType.Move || h.Type === HighlightType.Capture)
      );
      setHighlightHovered(hovered || null);
    } else setHighlightHovered(null);
  };

  const updateDragPosition = (coord: Coordinate | null): void => {
    // called from the mouseControl zone
    if (isDragging) setDragPosition(coord ? { x: coord.x - 0.5 * pieceSize, y: coord.y - 0.5 * pieceSize } : null);
  };

  const processClick = (cFine: Coordinate, cSquare: Coordinate, isMouseDown: boolean): void => {
    // called from the mouseControl zone
    if (isMouseDown) {
      setLastMouseDown(cSquare);
      const pieceToDrag = Pieces.find((p) => p.Coord.x === cSquare.x && p.Coord.y === cSquare.y && p.Team === PlayerTurn);

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
        left: 50,
        width: boardSize,
        height: boardSize,
        backgroundImage: `url(${BoardSVG})`,
        zIndex: 1,
      }}>
      <MouseControl
        boardSize={boardSize}
        sendClick={processClick}
        updateHoverSquare={updateHoverSquare}
        updateDragPosition={updateDragPosition}
        boardOrientation={boardOrientation}
      />
      <PiecesContainer pieces={Pieces} pieceSize={pieceSize} pieceDragged={pieceDragged} dragPosition={dragPosition} />
      <HighlightsContainer highlights={Highlights} pieceSize={pieceSize} highlightHovered={highlightHovered} />
      {PromotionArea && <PromotionAreaComponent pieceSize={pieceSize} promotionAreaInfos={PromotionArea} />}
    </div>
  );
};

export default Board;
