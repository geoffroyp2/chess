import React, { memo } from "react";

import Piece from "./piece";

const Pieces = memo(({ data, size, pieceDragged, dragPosition }) => {
  return (
    <>
      {data.map((p) => (
        <Piece
          size={size}
          type={p.type}
          x={p.coord.x}
          y={p.coord.y}
          dragging={p.id === pieceDragged}
          dragPosition={p.id === pieceDragged ? dragPosition : null}
          key={p.id}
        />
      ))}
    </>
  );
});

export default Pieces;
