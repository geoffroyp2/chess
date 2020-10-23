using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessEngine.GameLogic.Utils
{
    public class Move
    {

        public Move(char type, Coord destination)
            : this(type, destination, new Piece()) { }

        public Move(char type, Coord destination, Piece otherPiece)
        {
            MoveType = type;
            Destination = destination;
            OtherPiece = otherPiece;
        }

        public char MoveType { get; }
        public Coord Destination { get; }
        public Piece OtherPiece { get; }
    }
}

