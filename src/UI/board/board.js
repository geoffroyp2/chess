import React, { useState, useCallback } from "react";

import getCoord from "./helpers/getCoord";
import "./board.css";

import populateSquares from "./helpers/populateSquares";
// import Piece from "../Sprites/pieceReact";
// import Highlight from "../Sprites/highlightReact";
import PromotionArea from "../Sprites/promotionArea";
import BoardSVG from "../assets/svgboard/board_darkBlue.svg";

//TODO : update highlights correctly when there was already one on the square

const Board = ({ game }) => {
  const boardSize = 744;
  const pieceSize = boardSize / 8;
  const boardOffset = 50; // rework needed

  const [pieces, changePieces] = useState(game.getInitPieces());
  const [highlights, changeHighlights] = useState([]);
  const [promotionArea, changePromotionArea] = useState(null);
  const [boardOrientation, changeBoardOrientation] = useState(true);

  const resetBoard = (e) => {
    game.reset();
    handleNewPieces(game.getInitPieces());
    handleNewHighlights([]);
    handleNewPromotionArea(null);
  };

  const squareClick = (coord) => {
    const [newPiecesPositions, newHighlights, newPromotionArea] = game.click(
      getCoord(coord, boardOrientation)
    );
    handleNewPieces(newPiecesPositions);
    handleNewHighlights(newHighlights);
    handleNewPromotionArea(newPromotionArea);
  };

  const flipBoard = useCallback(() => {
    changeBoardOrientation(!boardOrientation);
  }, [boardOrientation]);

  const handleNewPieces = useCallback((newPiecesPositions) => {
    changePieces(newPiecesPositions);
  }, []);

  const handleNewHighlights = useCallback((newHighlights) => {
    changeHighlights(newHighlights);
  }, []);

  const handleNewPromotionArea = useCallback((newPromotionArea) => {
    changePromotionArea(newPromotionArea);
  }, []);

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
        {populateSquares(
          pieceSize,
          boardOrientation,
          pieces,
          highlights,
          squareClick
        )}
        {promotionArea && (
          <PromotionArea
            pieceCoord={promotionArea.coord}
            graphicsCoord={getCoord(promotionArea.coord, boardOrientation)}
            size={pieceSize}
          />
        )}
      </div>
    </>
  );
};

export default Board;

// const Board = ({ game }) => {
//   const boardSize = 744;
//   const pieceSize = boardSize / 8;
//   const boardOffset = 50; // rework that && mouse coords

//   const [pieces, changePieces] = useState(game.getInitPieces());
//   const [highlights, changeHighlights] = useState([]);
//   const [promotionArea, changePromotionArea] = useState(null);
//   const [boardOrientation, changeBoardOrientation] = useState(true);

//   const handleClick = (e) => {
//     const [newPiecesPositions, newHighlights, newPromotionArea] = game.click(
//       getCoord(
//         {
//           // Need to rework mouse coords
//           x: Math.floor((e.nativeEvent.clientX - boardOffset) / pieceSize),
//           y: Math.floor((e.nativeEvent.clientY - boardOffset) / pieceSize),
//         },
//         boardOrientation
//       )
//     );
//     handleNewPieces(newPiecesPositions);
//     handleNewHighlights(newHighlights);
//     handleNewPromotionArea(newPromotionArea);
//   };

//   const resetBoard = (e) => {
//     game.reset();
//     handleNewPieces(game.getInitPieces());
//     handleNewHighlights([]);
//     handleNewPromotionArea(null);
//   };

//   const flipBoard = useCallback(
//     (e) => {
//       changeBoardOrientation(!boardOrientation);
//     },
//     [boardOrientation]
//   );

//   const handleNewPieces = useCallback((newPiecesPositions) => {
//     changePieces(newPiecesPositions);
//   }, []);

//   const handleNewHighlights = useCallback((newHighlights) => {
//     changeHighlights(newHighlights);
//   }, []);

//   const handleNewPromotionArea = useCallback((newPromotionArea) => {
//     changePromotionArea(newPromotionArea);
//   }, []);

//   return (
//     <>
//       <div className="Buttons">
//         <button className="ResetButton" onClick={resetBoard}>
//           RESET
//         </button>
//         <button className="FlipButton" onClick={flipBoard}>
//           Flip Board
//         </button>
//       </div>
//       <div
//         className="Board"
//         style={{
//           top: boardOffset,
//           left: boardOffset,
//           width: boardSize,
//           height: boardSize,
//           backgroundImage: `url(${BoardSVG})`,
//           zIndex: 1,
//         }}
//         // onMouseMove={handleMove}
//         onClick={handleClick}
//         //onDragEnter
//         //onDrop
//       >
//         {pieces.map((p) => (
//           <Piece
//             size={pieceSize}
//             type={p.type}
//             coord={getCoord(p.coord, boardOrientation)}
//             key={p.id}
//           />
//         ))}
//         {highlights.map((h) => (
//           <Highlight
//             size={pieceSize}
//             type={h.type}
//             coord={getCoord(h.coord, boardOrientation)}
//             key={h.id}
//           />
//         ))}
//         {promotionArea ? (
//           <PromotionArea
//             pieceCoord={promotionArea.coord}
//             graphicsCoord={getCoord(promotionArea.coord, boardOrientation)}
//             size={pieceSize}
//           />
//         ) : null}
//       </div>
//     </>
//   );
// };

// export default Board;

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
//       squareX: Math.floor(e.nativeEvent.offsetX / pieceSize),
//       squareY: Math.floor(e.nativeEvent.offsetY / pieceSize),
//     });
//   },
//   [pieceSize]
// );

// const handleClick = useCallback(
//   (e) => {
//     const x = Math.floor((e.nativeEvent.clientX - boardOffset) / pieceSize);
//     const y = Math.floor((e.nativeEvent.clientY - boardOffset) / pieceSize);

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
//   [HLSquare, pieceSize]
// );
