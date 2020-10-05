import React, { useState, useCallback } from "react";

import Piece from "../Sprites/pieceReact";
import Highlight from "../Sprites/highlightReact";

// coord of child elements might not be necessary

// const Square = ({ size, params, squareClick }) => {
//   const { coord, piece, hoverableHighlight, normalHighlight } = params;

//   const [HHType, changeHHType] = useState(
//     hoverableHighlight ? hoverableHighlight.type : null
//   );

//   const mouseOver = useCallback(() => {
//     changeHHType("HS");
//   }, []);

//   const mouseLeave = useCallback(() => {
//     changeHHType(hoverableHighlight ? hoverableHighlight.type : null);
//   }, [hoverableHighlight]);

//   return (
//     <div
//       className="Square"
//       onClick={(e) => squareClick(coord)}
//       onMouseOver={hoverableHighlight ? mouseOver : null}
//       onMouseLeave={hoverableHighlight ? mouseLeave : null}
//       style={{
//         position: "absolute",
//         height: size,
//         width: size,
//         top: `${coord.y * size}px`,
//         left: `${coord.x * size}px`,
//       }}
//     >
//       {piece && <Piece size={size} type={piece.type} key={piece.id} />}
//       {hoverableHighlight && (
//         <Highlight size={size} type={HHType} key={hoverableHighlight.id} />
//       )}
//       {normalHighlight && (
//         <Highlight
//           size={size}
//           type={normalHighlight.type}
//           key={normalHighlight.id}
//         />
//       )}
//     </div>
//   );
// };
// export default Square;
