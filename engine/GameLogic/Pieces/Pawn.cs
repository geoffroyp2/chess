using ChessEngine.GameLogic.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessEngine.GameLogic.Pieces
{
    public sealed class Pawn : Piece
    {
        public Pawn(bool team, Coord coord, bool ep)
            : base(team, coord)
        {
            Ep = ep;
        }

        public bool Ep { get; set; }

    }
}
