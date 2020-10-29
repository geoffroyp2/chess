import { HighlightType } from "../../TSInterfaces/reactInterfaces";

export default function getZIndex(type: HighlightType): number {
  switch (type) {
    case HighlightType.LastMove:
      return 6;
    case HighlightType.Move:
      return 7;
    case HighlightType.Capture:
      return 7;
    case HighlightType.Select:
      return 8;
    case HighlightType.Check:
      return 8;
    default:
      return 5;
  }
}
