using ChessEngine.GameLogic.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

/*
Move Types:
    'M': normal move
    'X': normal capture
    'Z': capture en-passant
    'P': normal promotion
    'Q': promotion + capture
    'L': long castle
    'S': short castle
*/


namespace ChessEngine.GameLogic.Utils
{
    public class Move
    {

        public Move(MoveTypes type, Coord destination)
        {
            MoveType = type;
            Destination = destination;
        }

        [Flags]
        public enum MoveTypes
        {
            Normal = 0x1,
            Capture = 0x2,
            Promote = 0x4,
            EnPassant = 0x8,
            PromoteCapture = Promote | Capture,
            LongCastle = 0x10,
            ShortCastle = 0x20
        }

        public MoveTypes MoveType { get; }
        public Coord Destination { get; }
    }
}

