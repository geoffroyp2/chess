import React from "react";

import Highlight from "./highlight";

const Highlights = ({ data, size }) => {
  return (
    <>
      {data.map((h) => (
        <Highlight size={size} type={h.type} coord={h.coord} key={h.id} />
      ))}
    </>
  );
};

export default Highlights;
