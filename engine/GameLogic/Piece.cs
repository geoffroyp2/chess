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
            Moves = new Dictionary<Coord, Move>();
        }

        public bool isDefault()
        {
            return Coord.IsDefault();
        }

        public bool Team { get; set; }
        public Coord Coord { get; set; }
        public Dictionary<Coord, Move> Moves { get; set; }

        public void VerifyMoves(Dictionary<Coord, Piece> teamPieces, Dictionary<Coord, Piece> opponentPieces)
        {

        }

        public virtual void ComputeMoves(Dictionary<Coord, Piece> teamPieces, Dictionary<Coord, Piece> opponentPieces, bool needToVerify) { } //Overriden in separate child classes

    }
}
