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


        public override void ComputeMoves(Dictionary<Coord, Piece> teamPieces, Dictionary<Coord, Piece> opponentPieces)
        {
            Moves.Clear();
            bool[] flags = { true, true, true, true };

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
            }
        }
    }
}
