const generatePiece = (type, team, x, y, castle, ep) => {
  return {
    Type: type,
    Team: team,
    EP: ep || false,
    Castle: castle || false,
    Coord: {
      x: x,
      y: y,
    },
    Moves: [],
  };
};

const generatePosition = (mode) => {
  let position = {
    PlayerTurn: true,
    Check: false,
    Checkmate: false,
    Stalemate: false,
    Pieces: [],
  };

  if (mode === "DEFAULT") {
    position.Pieces.push(generatePiece("R", true, 0, 7, true));
    position.Pieces.push(generatePiece("N", true, 1, 7));
    position.Pieces.push(generatePiece("B", true, 2, 7));
    position.Pieces.push(generatePiece("Q", true, 3, 7));
    position.Pieces.push(generatePiece("K", true, 4, 7, true));
    position.Pieces.push(generatePiece("B", true, 5, 7));
    position.Pieces.push(generatePiece("N", true, 6, 7));
    position.Pieces.push(generatePiece("R", true, 7, 7, true));
    for (let i = 0; i < 8; i++)
      position.Pieces.push(generatePiece("P", true, i, 6));

    position.Pieces.push(generatePiece("R", false, 0, 0, true));
    position.Pieces.push(generatePiece("N", false, 1, 0));
    position.Pieces.push(generatePiece("B", false, 2, 0));
    position.Pieces.push(generatePiece("Q", false, 3, 0));
    position.Pieces.push(generatePiece("K", false, 4, 0, true));
    position.Pieces.push(generatePiece("B", false, 5, 0));
    position.Pieces.push(generatePiece("N", false, 6, 0));
    position.Pieces.push(generatePiece("R", false, 7, 0, true));
    for (let i = 0; i < 8; i++)
      position.Pieces.push(generatePiece("P", false, i, 1));
  }

  // TEST
  else if (mode === "TEST") {
    position.Pieces.push(generatePiece("K", true, 4, 7, true));
    position.Pieces.push(generatePiece("Q", true, 0, 5));
    position.Pieces.push(generatePiece("R", true, 0, 7, true));
    position.Pieces.push(generatePiece("R", true, 7, 7, true));

    position.Pieces.push(generatePiece("K", false, 7, 0, false));
    position.Pieces.push(generatePiece("R", false, 3, 0, false));
  }

  return position;
};
export default generatePosition;
