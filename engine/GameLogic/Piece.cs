using ChessEngine.GameLogic.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessEngine.GameLogic
{
    public class Piece
    {
        public Piece()
            : this(false, new Coord())
        {
        }

        public Piece(bool team, Coord coord)
        {
            Team = team;
            Coord = coord;
            Moves = new List<Move>();
        }

        public bool isDefault()
        {
            return Coord.IsDefault();
        }

        public bool Team { get; set; }
        public Coord Coord { get; set; }
        public List<Move> Moves { get; set; }

        public void VerifyMoves(List<Piece> pieces)
        {

        }

        public virtual void ComputeMoves(List<Piece> pieces, bool needToVerify) { } //Overriden in separate child classes

    }
}
