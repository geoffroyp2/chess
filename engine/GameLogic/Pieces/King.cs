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
    }
}
