import React, { useState, useEffect } from "react";

import game from "../../gameLogic/gameLogic";

import formatTime from "../utils/formatTime";

interface Props {
  boardSize: number;
  boardOrientation: boolean;
}

const Timer = ({ boardSize, boardOrientation }: Props) => {
  const [time, setTime] = useState({ white: 0, black: 0 });

  // call the getTime function every 100ms to refresh the timer component
  useEffect(() => {
    setTimeout(() => {
      setTime(game.getTime());
    }, 100);
  });

  return (
    <div style={{ position: "relative", left: boardSize + 50, height: boardSize, width: "100px" }}>
      <div
        style={{
          position: "absolute",
          top: `${boardOrientation ? boardSize - 50 : 10}px`,
          left: `20px`,
        }}>
        White:
        <div>{formatTime(time.white)}</div>
      </div>
      <div
        style={{
          position: "absolute",
          top: `${boardOrientation ? 10 : boardSize - 50}px`,
          left: `20px`,
        }}>
        Black:
        <div>{formatTime(time.black)}</div>
      </div>
    </div>
  );
};

export default Timer;
