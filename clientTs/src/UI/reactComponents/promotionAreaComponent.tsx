import React from "react";

import PromotionOverlay from "./promotionOverlay";
import PieceComponent from "./pieceComponent";
import { PieceType } from "../../TSInterfaces/boardData";
import { PromotionAreaInfos } from "../../TSInterfaces/reactInterfaces";

interface Props {
  pieceSize: number;
  promotionAreaInfos: PromotionAreaInfos;
}

const PromotionAreaComponent = ({ pieceSize, promotionAreaInfos }: Props) => {
  const direction = promotionAreaInfos.Team ? -1 : +1;

  return (
    <div className="PromotionArea" style={{ position: "absolute", zIndex: 16 }}>
      <PromotionOverlay coord={{ x: promotionAreaInfos.Coord.x, y: promotionAreaInfos.Team ? 0 : 4 }} />
      <PieceComponent
        pieceSize={pieceSize}
        pieceTeam={promotionAreaInfos.Team}
        pieceType={PieceType.Queen}
        coord={{ x: promotionAreaInfos.Coord.x, y: promotionAreaInfos.Coord.y }}
        key={"PQ"}
      />
      <PieceComponent
        pieceSize={pieceSize}
        pieceTeam={promotionAreaInfos.Team}
        pieceType={PieceType.Rook}
        coord={{ x: promotionAreaInfos.Coord.x, y: promotionAreaInfos.Coord.y + direction }}
        key={"PR"}
      />
      <PieceComponent
        pieceSize={pieceSize}
        pieceTeam={promotionAreaInfos.Team}
        pieceType={PieceType.Knight}
        coord={{ x: promotionAreaInfos.Coord.x, y: promotionAreaInfos.Coord.y + 2 * direction }}
        key={"PN"}
      />
      <PieceComponent
        pieceSize={pieceSize}
        pieceTeam={promotionAreaInfos.Team}
        pieceType={PieceType.Bishop}
        coord={{ x: promotionAreaInfos.Coord.x, y: promotionAreaInfos.Coord.y + 3 * direction }}
        key={"PB"}
      />
    </div>
  );
};

export default PromotionAreaComponent;
