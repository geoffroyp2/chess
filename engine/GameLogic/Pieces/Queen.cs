using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChessEngine.GameLogic.Utils;

namespace ChessEngine.GameLogic.Pieces
{
    public sealed class Queen : Piece
    {
        public Queen(bool team, Coord coord)
            : base(team, coord) { }

        public override void ComputeMoves(List<Piece> pieces, bool needToVerify)
        {
            bool[] flags = { true, true, true, true, true, true, true, true };

            void Square(int flag, Coord coord)
            {
                if (flags[flag])
                {
                    if (!coord.IsValid())
                        flags[flag] = false;
                    else
                    {
                        Piece otherPiece = new Piece();
                        foreach (Piece p in pieces)
                            if (p.Coord == coord)
                                otherPiece = p;

                        if (!otherPiece.isDefault())
                        {
                            if (otherPiece.Team != Team)
                            {
                                Moves.Add(new Move('X', coord, otherPiece));
                            }
                            flags[flag] = false;
                        }
                        else Moves.Add(new Move('M', coord));
                    }

                }
            }

            for (int i = 0; i < 8; i++)
            {
                Square(0, new Coord(Coord.x - i, Coord.y));
                Square(1, new Coord(Coord.x + i, Coord.y));
                Square(2, new Coord(Coord.x, Coord.y - i));
                Square(3, new Coord(Coord.x, Coord.y + i));
                Square(4, new Coord(Coord.x - i, Coord.y - i));
                Square(5, new Coord(Coord.x + i, Coord.y - i));
                Square(6, new Coord(Coord.x - i, Coord.y + i));
                Square(7, new Coord(Coord.x + i, Coord.y + i));
            }
            if (needToVerify) base.VerifyMoves(pieces);
        }

    }
}
