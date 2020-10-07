import React, { memo } from "react";

import getSVG from "../helpers/getSVG";
import getZIndex from "../helpers/getZIndex";

const Highlight = memo(({ size, type, x, y, hover }) => {
  return (
    <img
      className="Highlight"
      src={getSVG(hover ? "HS" : type)}
      alt=""
      style={{
        position: "absolute",
        height: size,
        width: size,
        top: `${y * size}px`,
        left: `${x * size}px`,
        zIndex: getZIndex(type),
      }}
    ></img>
  );
});
export default Highlight;
