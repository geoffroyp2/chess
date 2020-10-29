// FEN-notation maker/parser to communicate more easily with the API
/*
Board = {
    Pieces: [Piece,...]
    PlayerTurn: bool
}
Piece = {
    Type: single char
    Team: bool
    EP: bool
    Castle: bool
}
*/

class FENCreator {
  createFEN(board, moveClock, moveCount) {
    let FEN = "";

    // Rows of pieces
    for (let y = 0; y < 8; y++) {
      let count = 0;
      for (let x = 0; x < 8; x++) {
        let piece = board.Pieces.find(
          (p) => p.Coord.x === x && p.Coord.y === y
        );
        if (piece) {
          if (count > 0) FEN += count;
          count = 0;
          FEN += piece.Team
            ? piece.Type
            : String.fromCharCode(piece.Type.charCodeAt(0) + 32);
        } else count++;
      }
      if (count > 0) FEN += count;
      if (y !== 7) FEN += "/";
    }

    // player turn
    FEN += " ";
    FEN += board.PlayerTurn ? "w" : "b";

    // castle
    FEN += " ";
    let castles = [];
    let whiteKing = board.Pieces.find(
      (p) => p.Team && p.Type === "K" && p.Castle
    );
    if (whiteKing)
      board.Pieces.forEach((p) => {
        if (p.Team && p.Type === "R" && p.Castle)
          castles.push(p.Coord.x < whiteKing.Coord.x ? "Q" : "K");
      });
    let blackKing = board.Pieces.find(
      (p) => !p.Team && p.Type === "K" && p.Castle
    );
    if (blackKing)
      board.Pieces.forEach((p) => {
        if (!p.Team && p.Type === "R" && p.Castle)
          castles.push(p.Coord.x < blackKing.Coord.x ? "q" : "k");
      });
    let castleString = "";
    if (castles.includes("K")) castleString += "K";
    if (castles.includes("Q")) castleString += "Q";
    if (castles.includes("k")) castleString += "k";
    if (castles.includes("q")) castleString += "q";
    FEN += castleString.length > 0 ? castleString : "-";

    // en-passant
    FEN += " ";
    let epPawn = board.Pieces.find((p) => p.EP);
    if (epPawn) {
      FEN += String.fromCharCode(epPawn.Coord.x + 97);
      FEN += epPawn.Team
        ? String.fromCharCode(6 - epPawn.Coord.y + 49)
        : String.fromCharCode(8 - epPawn.Coord.y + 49);
    } else FEN += "-";

    // move clock (number of half-moves since last capture or pawn move)
    // if (moveClock) FEN += " " + moveClock;

    // move number
    // if (moveNumber) FEN += " " + moveNumber;

    return FEN;
  }

  parseFEN(FENString) {}
}

const FEN = new FENCreator();
export default FEN;
