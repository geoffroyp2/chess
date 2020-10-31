import React, { memo } from "react";
import { HighlightUI } from "../../TSInterfaces/reactInterfaces";

import HighlightComponent from "./highlightComponent";

interface Props {
  highlights: HighlightUI[];
  pieceSize: number;
  highlightHovered: HighlightUI | null;
}

const HighlightsContainer = memo(({ highlights, pieceSize, highlightHovered }: Props) => {
  return (
    <>
      {highlights.map((h) => (
        <HighlightComponent
          pieceSize={pieceSize}
          type={h.Type}
          coord={h.Coord}
          hover={highlightHovered ? h.Coord.x === highlightHovered.Coord.x && h.Coord.y === highlightHovered.Coord.y : false}
          key={"" + h.Type + h.Coord.x + h.Coord.y}
        />
      ))}
    </>
  );
});

export default HighlightsContainer;
