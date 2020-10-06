export default function getZIndex(type) {
  switch (type) {
    case "HLM":
      return 6;
    case "HM":
      return 7;
    case "HX":
      return 7;
    case "HS":
      return 8;
    case "HC":
      return 8;
    default:
      return 5;
  }
}
