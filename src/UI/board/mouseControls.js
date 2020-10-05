import React from "react";

const MouseControl = ({
  size,
  handleMouseMove,
  handleMouseDown,
  handleMouseUp,
}) => {
  const onMouseMove = (e) => {
    handleMouseMove(e.nativeEvent.layerX, e.nativeEvent.layerY);
  };
  const onMouseDown = (e) => {
    handleMouseDown(
      Math.floor((e.nativeEvent.layerX / size) * 8),
      Math.floor((e.nativeEvent.layerY / size) * 8)
    );
  };
  const onMouseUp = (e) => {
    handleMouseUp(
      Math.floor((e.nativeEvent.layerX / size) * 8),
      Math.floor((e.nativeEvent.layerY / size) * 8)
    );
  };

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      style={{ position: "absolute", width: size, height: size, zIndex: 100 }}
    ></div>
  );
};

export default MouseControl;
