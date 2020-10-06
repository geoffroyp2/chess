import React, { useState } from "react";

const MouseControl = ({ size, click }) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [lastMouseDown, setLastMouseDown] = useState(null);

  // const onMouseMove = (e) => {
  //   handleMouseMove(e.nativeEvent.layerX, e.nativeEvent.layerY);
  // };
  const onMouseDown = (e) => {
    const x = Math.floor((e.nativeEvent.layerX / size) * 8);
    const y = Math.floor((e.nativeEvent.layerY / size) * 8);
    setIsMouseDown(true);
    setLastMouseDown([x, y]);
    click(x, y);
  };

  const onMouseUp = (e) => {
    const x = Math.floor((e.nativeEvent.layerX / size) * 8);
    const y = Math.floor((e.nativeEvent.layerY / size) * 8);

    if (lastMouseDown && (lastMouseDown[0] !== x || lastMouseDown[1] !== y))
      click(x, y);

    setIsMouseDown(false);
    setLastMouseDown(null);
  };

  // const handleMouseDown = (x, y) => {
  //   changeIsMouseDown(true);
  //   changeLastMouseDown([x, y]);
  //   click(x, y);

  //   // if (pieceSelected) {
  //   console.log(pieceSelected);
  //   // }
  // };

  // const handleMouseUp = (x, y) => {
  //   changeIsMouseDown(false);
  //   changeLastMouseDown([]);

  //   if (lastMouseDown[0] !== x || lastMouseDown[1] !== y) {
  //     click(x, y);
  //   }

  //   // console.log("mouse up", x, y);
  // };
  // const handleMouseMove = (x, y) => {
  //   if (isMouseDown) {
  //     changeMouseLocation({ x: x, y: y });
  //   }
  // };

  return (
    <div
      // onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      style={{ position: "absolute", width: size, height: size, zIndex: 100 }}
    ></div>
  );
};

export default MouseControl;
