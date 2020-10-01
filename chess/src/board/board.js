import React, { useState, useCallback } from "react";

import "./board.css";

import Piece from "../Sprites/pieces";
import SquareHighlight from "../Sprites/squareHighlight";
import MoveHighlight from "../Sprites/moveHighlight";
import BoardSVG from "../assets/svgboard/board_darkBlue.svg";
import GameLogic from "../gameLogic/gameLogic";

const Board = () => {
  const game = new GameLogic();
  const boardSize = 744;
  const PieceSize = boardSize / 8;
  const boardOffset = 50;

  const [mouseLocation, mouseMove] = useState({
    absX: 0,
    absY: 0,
    squareX: 0,
    squareY: 0,
  });
  const [HLSquare, changeHLSquare] = useState(null);

  const handleMove = useCallback(
    (e) => {
      mouseMove({
        absX: e.nativeEvent.offsetX,
        absY: e.nativeEvent.offsetY,
        squareX: Math.floor(e.nativeEvent.offsetX / PieceSize),
        squareY: Math.floor(e.nativeEvent.offsetY / PieceSize),
      });
    },
    [PieceSize]
  );

  const handleClick = useCallback(
    (e) => {
      const x = Math.floor((e.nativeEvent.clientX - boardOffset) / PieceSize);
      const y = Math.floor((e.nativeEvent.clientY - boardOffset) / PieceSize);

      if (HLSquare)
        if (HLSquare.x === x && HLSquare.y === y) {
          changeHLSquare(null);
          return;
        }

      changeHLSquare({
        x: x,
        y: y,
      });
    },
    [HLSquare, PieceSize]
  );

  const getPieces = () => {
    return game
      .getPieces()
      .map((x) => (
        <Piece
          initSize={PieceSize}
          initType={x.type}
          initCoord={x.coord}
          key={x.id}
        />
      ));
  };

  const getHighlights = () => {
    return game
      .getHighlights()
      .map((x) => (
        <MoveHighlight
          size={PieceSize}
          typeInit={x.type}
          coord={x.coord}
          key={x.id}
        />
      ));
  };

  return (
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
      {HLSquare ? <SquareHighlight size={PieceSize} coord={HLSquare} /> : null}
      {getHighlights()}
      {getPieces()}
    </div>
  );
};

export default Board;
