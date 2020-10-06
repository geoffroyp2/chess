import React from "react";

const Buttons = ({ reset, flip }) => {
  return (
    <div className="Buttons">
      <button className="ResetButton" onClick={() => reset()}>
        RESET
      </button>
      <button className="FlipButton" onClick={() => flip()}>
        Flip Board
      </button>
    </div>
  );
};

export default Buttons;
