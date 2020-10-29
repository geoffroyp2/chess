export default function coordToString(coord) {
  return (
    String.fromCharCode(coord.x + 97) + String.fromCharCode(7 - coord.y + 49)
  );
}
