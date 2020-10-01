import React, { useState } from "react";

import HLSVG from "../assets/highlights/hl_green.svg";

const SquareHighlight = ({ size, coord }) => {
  return (
    <img
      className="Highlight"
      src={HLSVG}
      style={{
        zIndex: 2,
        height: size,
        width: size,
        top: `${coord.y * size}px`,
        left: `${coord.x * size}px`,
      }}
      alt=""
    />
  );
};
export default SquareHighlight;
