import React, { memo } from "react";
import { Highlight } from "../../TSInterfaces/reactInterfaces";

import HighlightComponent from "./highlightComponent";

interface Props {
  highlights: Highlight[];
  pieceSize: number;
  highlightHovered: Highlight | null;
}

const HighlightsContainer = memo(({ highlights, pieceSize, highlightHovered }: Props) => {
  return (
    <>
      {highlights.map((h) => (
        <HighlightComponent
          pieceSize={pieceSize}
          type={h.Type}
          coord={h.Coord}
          hover={h === highlightHovered}
          key={"" + h.Type + h.Coord.x + h.Coord.y}
        />
      ))}
    </>
  );
});

export default HighlightsContainer;
