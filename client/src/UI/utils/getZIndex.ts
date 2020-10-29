import { HighlightType } from "../../TSInterfaces/reactInterfaces";

// Get css Z-Index for each highlight type

const highlightZIndex = [8, 7, 7, 8, 4];

export default function getZIndex(type: HighlightType): number {
  return highlightZIndex[type];
}
