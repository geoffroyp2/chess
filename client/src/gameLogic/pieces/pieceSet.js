import Coord from "../helpers/coordinates";

import King from "./king";
import Queen from "./queen";
import Rook from "./rook";
import Bishop from "./bishop";
import Knight from "./knight";
import Pawn from "./pawn";

export default class PieceSet {
  constructor(mode) {
    this.pieces = [];
    this.initPieces(mode);

    this.isCheck = false;
    this.isCheckmate = false;
    this.isStalemate = false;
  }

  initPieces(mode) {
    if (mode === "STANDARD") {
      // White set
      this.pieces.push(new King("W", "WK", new Coord(4, 7)));
      this.pieces.push(new Queen("W", "WQ", new Coord(3, 7)));
      this.pieces.push(new Bishop("W", "WB1", new Coord(2, 7)));
      this.pieces.push(new Bishop("W", "WB2", new Coord(5, 7)));
      this.pieces.push(new Knight("W", "WN1", new Coord(1, 7)));
      this.pieces.push(new Knight("W", "WN2", new Coord(6, 7)));
      this.pieces.push(new Rook("W", "WR1", new Coord(0, 7)));
      this.pieces.push(new Rook("W", "WR2", new Coord(7, 7)));
      for (let i = 0; i < 8; i++) {
        this.pieces.push(new Pawn("W", `WP${i}`, new Coord(i, 6)));
      }

      // Black set
      this.pieces.push(new King("B", "BK", new Coord(4, 0)));
      this.pieces.push(new Queen("B", "BQ", new Coord(3, 0)));
      this.pieces.push(new Bishop("B", "BB1", new Coord(2, 0)));
      this.pieces.push(new Bishop("B", "BB2", new Coord(5, 0)));
      this.pieces.push(new Knight("B", "BN1", new Coord(1, 0)));
      this.pieces.push(new Knight("B", "BN2", new Coord(6, 0)));
      this.pieces.push(new Rook("B", "BR1", new Coord(0, 0)));
      this.pieces.push(new Rook("B", "BR2", new Coord(7, 0)));
      for (let i = 0; i < 8; i++) {
        this.pieces.push(new Pawn("B", `BP${i}`, new Coord(i, 1)));
      }
    }
  }

  computeMoves(playerTurn) {
    // 1. Compute opponent's move to see if the current state is check (used to look for checkmate)
    this.computeOpponentMoves(playerTurn);

    // 2. Compute current player's move, and eliminate illegal moves (2nd arg of p.computeMoves())
    this.pieces.forEach((p) => {
      if (p.team === playerTurn) p.computeMoves(this, true);
    });

    // 3. Look for checkmate and stalemate
    let atLeastOneValidMove = false;
    this.pieces.forEach((p) => {
      if (p.team === playerTurn)
        if (p.moves.size() > 0) atLeastOneValidMove = true;
    });
    if (!atLeastOneValidMove) {
      if (this.isCheck) this.isCheckmate = true;
      else this.isStalemate = true;
    }
  }

  computeOpponentMoves(playerTurn) {
    // called from the general computeMoves() and from each piece's verifyMove() to eliminate invalid ones
    this.pieces.forEach((p) => {
      if (p.team !== playerTurn) p.computeMoves(this, false);
    });
    this.check(playerTurn);
  }

  check(playerTurn) {
    // Look for checks from opponent
    const king = this.findById(playerTurn + "K");
    this.pieces.forEach((p) => {
      if (p.team !== playerTurn) {
        if (p.moves.find(king.coord)) {
          this.isCheck = true;
          return;
        }
      }
    });
  }

  copy() {
    // Deep copy
    const newPieceSet = new PieceSet();
    this.pieces.forEach((p) => {
      newPieceSet.pieces.push(p.copy());
    });
    return newPieceSet;
  }

  promotePawn(pawnToPromote, targetPiece) {
    switch (targetPiece) {
      case "Q":
        this.pieces.push(new Queen(...pawnToPromote.getInfos()));
        break;
      case "R":
        this.pieces.push(new Rook(...pawnToPromote.getInfos()));
        break;
      case "B":
        this.pieces.push(new Bishop(...pawnToPromote.getInfos()));
        break;
      case "N":
        this.pieces.push(new Knight(...pawnToPromote.getInfos()));
        break;
      default:
        break;
    }
  }

  // ACCESS METHODS
  findById(id) {
    return this.pieces.find((p) => p.id === id);
  }

  findByCoord(coord) {
    return this.pieces.find((p) => p.coord.equals(coord));
  }

  remove(piece) {
    this.pieces.splice(this.pieces.indexOf(piece), 1);
  }

  getFormattedPieces() {
    // Format pieces in a simpler way for the UI
    let pieces = [];
    this.pieces.forEach((p) => {
      pieces.push({
        type: p.type + p.team,
        coord: p.coord,
        id: p.id,
        ep: p.type === "P" && p.enPassant === 1,
        castle: (p.type === "R" || p.type === "K") && p.canCastle,
      });
    });
    return pieces;
  }
}
