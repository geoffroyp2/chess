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

        public override void ComputeMoves(Dictionary<Coord, Piece> teamPieces, Dictionary<Coord, Piece> opponentPieces)
        {
            Moves.Clear();
            bool[] flags = { true, true, true, true, true, true, true, true };

            void Square(int flag, Coord coord)
            {
                if (flags[flag])
                {
                    if (!coord.IsValid())
                        flags[flag] = false;
                    else
                    {
                        if (opponentPieces.ContainsKey(coord))
                        {
                            Moves.Add(coord, new Move(Move.MoveTypes.Capture, coord));
                            flags[flag] = false;
                        }
                        else if (!teamPieces.ContainsKey(coord))
                            Moves.Add(coord, new Move(Move.MoveTypes.Normal, coord));
                        else
                            flags[flag] = false;
                    }

                }
            }

            for (int i = 1; i <= 8; i++)
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
        }
    }
}
