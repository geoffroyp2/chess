import React, { useState, useEffect } from "react";

import formatTime from "../helpers/formatTime.js";

const Timer = ({ game, boardSize, boardOrientation }) => {
  const [time, setTime] = useState(game.getTime());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(game.getTime());
    }, 100);
  });

  return (
    <div style={{ position: "relative", height: boardSize, width: "100px" }}>
      <div
        style={{
          position: "absolute",
          top: `${boardOrientation ? boardSize - 50 : 10}px`,
          left: `20px`,
        }}
      >
        White:
        <div>{formatTime(time.w)}</div>
      </div>
      <div
        style={{
          position: "absolute",
          top: `${boardOrientation ? 10 : boardSize - 50}px`,
          left: `20px`,
        }}
      >
        Black:
        <div>{formatTime(time.b)}</div>
      </div>
    </div>
  );
};

export default Timer;
