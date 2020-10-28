import React, { useState, useEffect } from "react";
import { ClockTime } from "../../../../sharedResources/TSInterfaces/boardData.js";

import formatTime from "../utils/formatTime.js";

interface Props {
  getTime: () => ClockTime;
  boardSize: number;
  boardOrientation: boolean;
}

const Timer = ({ getTime, boardSize, boardOrientation }: Props) => {
  const [time, setTime] = useState(getTime());

  // call the getTime function every 100ms to refresh the timer component
  useEffect(() => {
    setTimeout(() => {
      setTime(getTime());
    }, 100);
  });

  return (
    <div style={{ position: "relative", height: boardSize, width: "100px" }}>
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
