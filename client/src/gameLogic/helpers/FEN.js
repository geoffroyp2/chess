// FEN-notation maker/parser to communicate more easily with the API

/* Piece array needs to be constructed the following way :

PIECE = {
    type: p.type + p.team,                                          ==> "KW", "PB"...
    coord: p.coord,                                                 ==> {x: 1, y: 5}...
    ep: p.type === "P" && p.enPassant === 1,                        ==> true when en-passant is possible (even if no opposing pawn can actually capture)
    castle: (p.type === "R" || p.type === "K") && p.canCastle,      ==> true for Kings and Rooks when castle is possible
}
*/

class FEN {
  createFEN(pieces, playerTurn, moveClock, moveNumber) {
    let FEN = "";

    // Rows of pieces
    for (let y = 0; y < 8; y++) {
      let count = 0;
      for (let x = 0; x < 8; x++) {
        let piece = pieces.find((p) => p.coord.x === x && p.coord.y === y);
        if (piece) {
          if (count > 0) FEN += count;
          count = 0;
          FEN +=
            piece.type[1] === "W"
              ? piece.type[0]
              : String.fromCharCode(piece.type.charCodeAt(0) + 32);
        } else {
          count++;
        }
      }
      if (count > 0) FEN += count;
      if (y !== 7) FEN += "/";
    }

    // player turn
    FEN += " " + String.fromCharCode(playerTurn.charCodeAt(0) + 32);

    // castle
    FEN += " ";
    let castles = [];
    let wk = pieces.find((p) => p.castle && p.type === "KW");
    if (wk)
      pieces.forEach((p) => {
        if (p.castle && p.type === "RW")
          castles.push(p.coord.x < wk.coord.x ? "Q" : "K");
      });
    let bk = pieces.find((p) => p.castle && p.type === "KB");
    if (bk)
      pieces.forEach((p) => {
        if (p.castle && p.type === "RB")
          castles.push(p.coord.x < bk.coord.x ? "q" : "k");
      });

    let castleString = "";
    if (castles.includes("K")) castleString += "K";
    if (castles.includes("Q")) castleString += "Q";
    if (castles.includes("k")) castleString += "k";
    if (castles.includes("q")) castleString += "q";
    FEN += castleString.length > 0 ? castleString : "-";

    // en-passant
    FEN += " ";
    let epPawn = pieces.find((p) => p.ep);
    if (epPawn) {
      FEN += String.fromCharCode(epPawn.coord.x + 97);
      FEN +=
        epPawn.type[1] === "W"
          ? String.fromCharCode(6 - epPawn.coord.y + 49)
          : String.fromCharCode(8 - epPawn.coord.y + 49);
    } else {
      FEN += "-";
    }

    // move clock (number of half-moves since last capture or pawn move)
    if (moveClock) FEN += " " + moveClock;

    // move number
    if (moveNumber) FEN += " " + moveNumber;

    return FEN;
  }

  parseFEN(FENString) {}
}

const FENHandler = new FEN();
export default FENHandler;
