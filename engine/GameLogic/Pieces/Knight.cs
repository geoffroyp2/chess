using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChessEngine.GameLogic.Utils;

namespace ChessEngine.GameLogic.Pieces
{
    public sealed class Knight : Piece
    {
        public Knight(bool team, Coord coord)
            : base(team, coord) { }

        public override void ComputeMoves(Dictionary<Coord, Piece> teamPieces, Dictionary<Coord, Piece> opponentPieces, bool needToVerify)
        {

            void Square(Coord coord)
            {
                if (coord.IsValid())
                {
                    if (opponentPieces.ContainsKey(coord))
                        Moves.Add(coord, new Move('X', coord));
                    else if (!teamPieces.ContainsKey(coord))
                        Moves.Add(coord, new Move('M', coord));
                }
            }

            Square(new Coord(Coord.x - 1, Coord.y - 2));
            Square(new Coord(Coord.x - 2, Coord.y - 1));
            Square(new Coord(Coord.x + 1, Coord.y - 2));
            Square(new Coord(Coord.x + 2, Coord.y - 1));
            Square(new Coord(Coord.x - 1, Coord.y + 2));
            Square(new Coord(Coord.x - 2, Coord.y + 1));
            Square(new Coord(Coord.x + 1, Coord.y + 2));
            Square(new Coord(Coord.x + 2, Coord.y + 1));

            if (needToVerify) base.VerifyMoves(teamPieces, opponentPieces);
        }
    }
}
