using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChessEngine.GameLogic.Utils;

namespace ChessEngine.GameLogic.Pieces
{
    public sealed class Rook : Piece
    {

        public Rook(bool team, Coord coord, bool castle)
            : base(team, coord)
        {
            Castle = castle;
        }

        public bool Castle { get; set; }

        public override void ComputeMoves(List<Piece> pieces, bool needToVerify)
        {
            bool[] flags = { true, true, true, true };

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

            for (int i = 1; i <= 8; i++)
            {
                Square(0, new Coord(Coord.x - i, Coord.y));
                Square(1, new Coord(Coord.x + i, Coord.y));
                Square(2, new Coord(Coord.x, Coord.y - i));
                Square(3, new Coord(Coord.x, Coord.y + i));
            }
            if (needToVerify) base.VerifyMoves(pieces);
        }

    }
}
