import React from "react";
import { Coordinate } from "../../TSInterfaces/boardData";

interface Props {
  coord: Coordinate;
}

const PromotionOverlay = ({ coord }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" shapeRendering="crispEdges">
      <mask id="mask">
        <rect width="8" height="8" fill="white" />
        <rect x={coord.x} y={coord.y} width="1" height="4" fill="black" />
      </mask>
      <rect mask="url(#mask)" width="100%" height="100%" fill="#424242" fillOpacity="0.6" />
    </svg>
  );
};

export default PromotionOverlay;
