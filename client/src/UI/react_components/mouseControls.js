import React, { memo, useState } from "react";

const MouseControl = memo(({ size, click, hoverSquare, dragPosition }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  // const [lastMouseDown, setLastMouseDown] = useState(null);
  const [lastHoverSquare, setLastHoverSquare] = useState([]);

  const onMouseDown = (e) => {
    const x = e.nativeEvent.layerX;
    const y = e.nativeEvent.layerY;
    const sX = Math.floor((x / size) * 8);
    const sY = Math.floor((y / size) * 8);
    setIsMouseDown(true);
    // setLastMouseDown([sX, sY]);
    click(x, y, sX, sY, true);
  };

  const onMouseUp = (e) => {
    const x = e.nativeEvent.layerX;
    const y = e.nativeEvent.layerY;
    const sX = Math.floor((x / size) * 8);
    const sY = Math.floor((y / size) * 8);
    // if (lastMouseDown && (lastMouseDown[0] !== sX || lastMouseDown[1] !== sY))
    click(x, y, sX, sY, false);

    setIsMouseDown(false);
    // setLastMouseDown(null);
  };

  const onMouseMove = (e) => {
    const x = e.nativeEvent.layerX;
    const y = e.nativeEvent.layerY;
    const sX = Math.floor((x / size) * 8);
    const sY = Math.floor((y / size) * 8);
    if (isMouseDown) {
      dragPosition(x, y);
    }
    if (lastHoverSquare[0] !== sX || lastHoverSquare[1] !== sY) {
      setLastHoverSquare([sX, sY]);
      hoverSquare(sX, sY);
    }
  };

  const onMouseLeave = () => {
    hoverSquare();
    setLastHoverSquare([]);
  };

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      style={{ position: "absolute", width: size, height: size, zIndex: 100 }}></div>
  );
});

export default MouseControl;
