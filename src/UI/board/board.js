import React, { useState, useCallback } from "react";

import getCoord from "./helpers/getCoord";
import "./board.css";

// import populateSquares from "./helpers/populateSquares";
import Piece from "../Sprites/pieceReact";
import Highlight from "../Sprites/highlightReact";
import PromotionArea from "../Sprites/promotionArea";
import BoardSVG from "../assets/svgboard/board_darkBlue.svg";
import MouseControl from "./mouseControls";

//TODO : update highlights correctly when there was already one on the square

/* TODO : 

- mouseDown : register as a click
              if piece selected, start dragging piece
- mouseUp : if same square as mouseDown, do nothing (stop dragging)
            if other square, register as a click 
- mouseMove : always : change hoverable highlights
              if mouseDown && pieceSelected : start dragging
- change cursor if hovered piece is selectable (maybe mouse move also sends current hovered square)

need to remember : isMouseDown, lastMouseDownCoord (in terms of square)
need to receive from gameLogic : pieceSelected

*/

const Board = ({ game }) => {
  const boardSize = 744;
  const pieceSize = boardSize / 8;
  const boardOffset = 50; // rework that && mouse coords

  const [pieces, changePieces] = useState(game.getInitPieces());
  const [highlights, changeHighlights] = useState([]);
  const [promotionArea, changePromotionArea] = useState(null);
  const [boardOrientation, changeBoardOrientation] = useState(true);
  const [isMouseDown, changeIsMouseDown] = useState(false);
  const [lastMouseDown, changeLastMouseDown] = useState([]);
  const [mouseLocation, changeMouseLocation] = useState({});

  const [pieceSelected, changePieceSelected] = useState(null);

  const resetBoard = (e) => {
    game.reset();
    handleNewPieces(game.getInitPieces());
    handleNewHighlights([]);
    handleNewPromotionArea(null);
  };

  const flipBoard = useCallback(
    (e) => {
      changeBoardOrientation(!boardOrientation);
    },
    [boardOrientation]
  );

  const handleNewPieces = useCallback((newPiecesPositions) => {
    changePieces(newPiecesPositions);
  }, []);

  const handleNewHighlights = useCallback((newHighlights) => {
    changeHighlights(newHighlights);
  }, []);

  const handleNewPromotionArea = useCallback((newPromotionArea) => {
    changePromotionArea(newPromotionArea);
  }, []);

  const handleNewPieceSelected = useCallback(
    (newPieceSelected) => {
      changePieceSelected(
        newPieceSelected && pieces.find((p) => p.id === newPieceSelected.id)
      );
    },
    [pieces]
  );

  const click = (x, y) => {
    const [
      newPiecesPositions,
      newHighlights,
      newPromotionArea,
      newPieceSelected,
    ] = game.click(getCoord({ x, y }, boardOrientation));

    handleNewPieces(newPiecesPositions);
    handleNewHighlights(newHighlights);
    handleNewPromotionArea(newPromotionArea);
    handleNewPieceSelected(newPieceSelected);
  };

  const handleMouseDown = (x, y) => {
    changeIsMouseDown(true);
    changeLastMouseDown([x, y]);
    click(x, y);

    // if (pieceSelected) {
    console.log(pieceSelected);
    // }
  };

  const handleMouseUp = (x, y) => {
    changeIsMouseDown(false);
    changeLastMouseDown([]);

    if (lastMouseDown[0] !== x || lastMouseDown[1] !== y) {
      click(x, y);
    }

    // console.log("mouse up", x, y);
  };
  const handleMouseMove = (x, y) => {
    if (isMouseDown) {
      changeMouseLocation({ x: x, y: y });
    }
  };

  // const getCurrentMouseLocation = () => {
  //   return mous
  // };

  return (
    <>
      <div className="Buttons">
        <button className="ResetButton" onClick={resetBoard}>
          RESET
        </button>
        <button className="FlipButton" onClick={flipBoard}>
          Flip Board
        </button>
      </div>
      <div
        className="Board"
        style={{
          top: boardOffset,
          left: boardOffset,
          width: boardSize,
          height: boardSize,
          backgroundImage: `url(${BoardSVG})`,
          zIndex: 1,
        }}
      >
        <MouseControl
          size={boardSize}
          handleMouseMove={handleMouseMove}
          handleMouseDown={handleMouseDown}
          handleMouseUp={handleMouseUp}
        />
        {pieces.map((p) => (
          <Piece
            size={pieceSize}
            type={p.type}
            coord={
              p === pieceSelected
                ? mouseLocation
                : getCoord(p.coord, boardOrientation)
            }
            key={p.id}
          />
        ))}
        {highlights.map((h) => (
          <Highlight
            size={pieceSize}
            type={h.type}
            coord={getCoord(h.coord, boardOrientation)}
            key={h.id}
          />
        ))}
        {promotionArea ? (
          <PromotionArea
            pieceCoord={promotionArea.coord}
            graphicsCoord={getCoord(promotionArea.coord, boardOrientation)}
            size={pieceSize}
          />
        ) : null}
      </div>
    </>
  );
};

export default Board;
