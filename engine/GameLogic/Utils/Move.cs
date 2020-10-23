using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessEngine.GameLogic.Utils
{
    public class Move
    {

        public Move(char type, Coord destination)
        {
            MoveType = type;
            Destination = destination;
        }

        public char MoveType { get; }
        public Coord Destination { get; }
    }
}

