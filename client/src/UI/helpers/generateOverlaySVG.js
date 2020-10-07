import React from "react";

export default function generateOverlaySVG(x, y) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 8 8"
      shapeRendering="crispEdges"
    >
      <mask id="mask">
        <rect width="8" height="8" fill="white" />
        <rect x={x} y={y} width="1" height="4" fill="black" />
      </mask>
      <rect
        mask="url(#mask)"
        width="100%"
        height="100%"
        fill="#424242"
        fillOpacity="0.6"
      />
    </svg>
  );
}
