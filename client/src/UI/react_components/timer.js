import React, { useState, useEffect } from "react";

import formatTime from "../helpers/formatTime.js";

const Timer = ({ game }) => {
  const [time, setTime] = useState(game.getTime());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(game.getTime());
    }, 100);
  });
  return (
    <>
      <div>
        White:
        <div>{formatTime(time.w)}</div>
      </div>
      <div>
        Black:
        <div>{formatTime(time.b)}</div>
      </div>
    </>
  );
};

export default Timer;
