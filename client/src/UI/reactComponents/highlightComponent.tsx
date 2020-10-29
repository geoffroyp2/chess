import React, { memo } from "react";
import { Coordinate } from "../../TSInterfaces/boardData";
import { HighlightType } from "../../TSInterfaces/reactInterfaces";

import { getHighlightSVG } from "../utils/getSVG";
import getZIndex from "../utils/getZIndex";

interface Props {
  pieceSize: number;
  type: HighlightType;
  coord: Coordinate;
  hover: boolean;
}

const HighlightComponent = memo(({ pieceSize, type, coord, hover }: Props) => {
  return (
    <img
      className="Highlight"
      src={getHighlightSVG(hover ? HighlightType.Select : type)}
      alt=""
      style={{
        position: "absolute",
        height: pieceSize,
        width: pieceSize,
        top: `${coord.y * pieceSize}px`,
        left: `${coord.x * pieceSize}px`,
        zIndex: getZIndex(type),
      }}></img>
  );
});
export default HighlightComponent;
