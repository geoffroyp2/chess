import React, { useState } from "react";

import MoveSVG from "../assets/highlights/hl_move_green.svg";
import CaptureSVG from "../assets/highlights/hl_capture_green.svg";

const MoveHighlight = ({ size, typeInit, coord }) => {
  let type = null;
  switch (typeInit) {
    case "M":
      type = MoveSVG;
      break;
    case "X":
      type = CaptureSVG;
      break;
  }

  return (
    <img
      className="Highlight"
      src={type}
      style={{
        zIndex: 3,
        height: size,
        width: size,
        top: `${coord.y * size}px`,
        left: `${coord.x * size}px`,
      }}
      alt=""
    />
  );
};
export default MoveHighlight;
