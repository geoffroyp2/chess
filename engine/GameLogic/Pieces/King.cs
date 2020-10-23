using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChessEngine.GameLogic.Utils;

namespace ChessEngine.GameLogic.Pieces
{
    public sealed class King : Piece
    {
        public King(bool team, Coord coord, bool castle)
            : base(team, coord)
        {
            Castle = castle;
        }

        public bool Castle { get; set; }

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

            for (int x = -1; x < 2; x++)
                for (int y = -1; y < 2; y++)
                    if (x != 0 || y != 0)
                        Square(new Coord(Coord.x + x, Coord.y + y));

            if (Castle && needToVerify)
                ComputeCastleMove(teamPieces, opponentPieces);

            if (needToVerify) base.VerifyMoves(teamPieces, opponentPieces);
        }

        private void ComputeCastleMove(Dictionary<Coord, Piece> teamPieces, Dictionary<Coord, Piece> opponentPieces)
        {

        }

    }
}
