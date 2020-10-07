import React, { memo } from "react";

import Highlight from "./highlight";

const HighlightsContainer = memo(({ data, size, highlightHovered }) => {
  return (
    <>
      {data.map((h) => (
        <Highlight
          size={size}
          type={h.type}
          x={h.coord.x}
          y={h.coord.y}
          hover={h.id === highlightHovered}
          key={h.id}
        />
      ))}
    </>
  );
});

export default HighlightsContainer;
