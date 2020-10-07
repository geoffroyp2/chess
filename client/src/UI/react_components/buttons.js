import React, { memo } from "react";

const Buttons = memo(({ reset, flip }) => {
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
});

export default Buttons;
