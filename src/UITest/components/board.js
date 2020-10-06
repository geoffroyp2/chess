import React from "react";

import MouseControl from "./mouseControls";
import Pieces from "./pieces";
import Highlights from "./highlights";
import PromotionArea from "./promotionArea";

import BoardSVG from "../assets/svgboard/board_darkBlue.svg";

const Board = ({
  data: [pieces, highlights, promotionArea, pieceSelected],
  click,
  bi,
}) => {
  console.log("re-drawn board", bi);
  const boardSize = 744;
  const pieceSize = boardSize / 8;

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
      <MouseControl click={click} size={boardSize} />
      <Pieces data={pieces} pieceSelected={pieceSelected} size={pieceSize} />
      <Highlights data={highlights} size={pieceSize} />
      {promotionArea && <PromotionArea data={promotionArea} size={boardSize} />}
    </div>
  );
};

export default Board;
