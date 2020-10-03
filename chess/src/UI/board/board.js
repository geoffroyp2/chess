import React, { useState, useCallback } from "react";

import "./board.css";

import Piece from "../Sprites/pieceReact";
import Highlight from "../Sprites/highlightReact";
import PromotionArea from "../Sprites/promotionArea";
import BoardSVG from "../assets/svgboard/board_darkBlue.svg";

//TODO : handle coordinates conversion when board is flipped

const Board = ({ game }) => {
  const boardSize = 744;
  const PieceSize = boardSize / 8;
  const boardOffset = 50; // rework that && mouse coords

  const [pieces, changePieces] = useState(game.getInitPieces());
  const [highlights, changeHighlights] = useState([]);
  const [promotionArea, changePromotionArea] = useState(null);

  const handleClick = (e) => {
    // Need to rework mouse coords
    const [newPiecesPositions, newHighlights, newPromotionArea] = game.click(
      Math.floor((e.nativeEvent.clientX - boardOffset) / PieceSize),
      Math.floor((e.nativeEvent.clientY - boardOffset) / PieceSize)
    );
    handleNewPieces(newPiecesPositions);
    handleNewHighlights(newHighlights);
    handleNewPromotionArea(newPromotionArea);
  };

  const handleNewPieces = useCallback((newPiecesPositions) => {
    changePieces(newPiecesPositions);
  }, []);

  const handleNewHighlights = useCallback((newHighlights) => {
    changeHighlights(newHighlights);
  }, []);

  const handleNewPromotionArea = useCallback((newPromotionArea) => {
    changePromotionArea(newPromotionArea);
  }, []);

  const resetBoard = (e) => {
    game.reset();
    handleNewPieces(game.getInitPieces());
    handleNewHighlights([]);
  };

  return (
    <>
      <button className="ResetButton" onClick={resetBoard}>
        RESET
      </button>
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
        // onMouseMove={handleMove}
        onClick={handleClick}
        //onDragEnter
        //onDrop
      >
        {highlights.map((h) => (
          <Highlight
            size={PieceSize}
            type={h.type}
            coord={h.coord}
            key={h.id}
          />
        ))}
        {pieces.map((p) => (
          <Piece size={PieceSize} type={p.type} coord={p.coord} key={p.id} />
        ))}
        {promotionArea ? (
          <PromotionArea coord={promotionArea.coord} size={PieceSize} />
        ) : null}
      </div>
    </>
  );
};

export default Board;

// const [mouseLocation, mouseMove] = useState({
//   absX: 0,
//   absY: 0,
//   squareX: 0,
//   squareY: 0,
// });
// const [HLSquare, changeHLSquare] = useState(null);

// const handleMove = useCallback(
//   (e) => {
//     mouseMove({
//       absX: e.nativeEvent.offsetX,
//       absY: e.nativeEvent.offsetY,
//       squareX: Math.floor(e.nativeEvent.offsetX / PieceSize),
//       squareY: Math.floor(e.nativeEvent.offsetY / PieceSize),
//     });
//   },
//   [PieceSize]
// );

// const handleClick = useCallback(
//   (e) => {
//     const x = Math.floor((e.nativeEvent.clientX - boardOffset) / PieceSize);
//     const y = Math.floor((e.nativeEvent.clientY - boardOffset) / PieceSize);

//     if (HLSquare)
//       if (HLSquare.x === x && HLSquare.y === y) {
//         changeHLSquare(null);
//         return;
//       }

//     changeHLSquare({
//       x: x,
//       y: y,
//     });
//   },
//   [HLSquare, PieceSize]
// );
