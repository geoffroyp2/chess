import React, { memo } from "react";

interface props {
    reset: () => void,
    flip: () => void
}

const Buttons = memo(({ reset, flip }: props) => {
    return (<div className="Buttons" >
        <button className="ResetButton" onClick={() => reset()}>
            RESET
        </ button>
        < button className="FlipButton" onClick={() => flip()}>
            Flip Board
        </ button>
    </div >)
});

export default Buttons;