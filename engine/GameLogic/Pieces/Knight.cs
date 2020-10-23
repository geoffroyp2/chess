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

        public override void ComputeMoves(List<Piece> pieces, bool needToVerify)
        {

            void Square(Coord coord)
            {
                if (coord.IsValid())
                {
                    Piece otherPiece = new Piece();
                    foreach (Piece p in pieces)
                        if (p.Coord == coord)
                            otherPiece = p;

                    if (!otherPiece.isDefault())
                    {
                        if (otherPiece.Team != Team)
                            Moves.Add(new Move('X', coord, otherPiece));
                    }
                    else Moves.Add(new Move('M', coord));
                }
            }

            for (int i = 0; i < 8; i++)
            {
                Square(new Coord(Coord.x - 1, Coord.y - 2));
                Square(new Coord(Coord.x - 2, Coord.y - 1));
                Square(new Coord(Coord.x + 1, Coord.y - 2));
                Square(new Coord(Coord.x + 2, Coord.y - 1));
                Square(new Coord(Coord.x - 1, Coord.y + 2));
                Square(new Coord(Coord.x - 2, Coord.y + 1));
                Square(new Coord(Coord.x + 1, Coord.y + 2));
                Square(new Coord(Coord.x + 2, Coord.y + 1));
            }
            if (needToVerify) base.VerifyMoves(pieces);
        }
    }
}
