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

        public Move()
        {
            MoveType = 0;
            Destination = new Coord();
        }

        public Move(MoveTypes type, Coord destination)
        {
            MoveType = type;
            Destination = destination;
        }

        public enum MoveTypes
        {
            Normal,
            Pawntwo,
            Capture,
            EnPassant,
            Promote,
            PromoteCapture,
            LongCastle,
            ShortCastle,
        }

        public MoveTypes MoveType { get; }
        public Coord Destination { get; }
    }
}

