import React from "react";

import Piece from "./piece";

const Pieces = ({ data, pieceSelected, size }) => {
  return (
    <>
      {data.map((p) => (
        <Piece size={size} type={p.type} coord={p.coord} key={p.id} />
      ))}
    </>
  );
};

export default Pieces;
