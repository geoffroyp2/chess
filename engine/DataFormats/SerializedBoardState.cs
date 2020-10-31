using ChessEngine.GameLogic;
using ChessEngine.GameLogic.Pieces;
using ChessEngine.GameLogic.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


// Series of classes that mimic the structure of the data used by the engine,
// changing types and variables to simple chars or bool and stripping them from functionalities
// Used to be easily parsed into a json format and sent over http

namespace ChessEngine.DataFormats
{


    public class SerializedCoord
    {
        public SerializedCoord() { }

        public SerializedCoord(Coord coord)
        {
            x = coord.x;
            y = coord.y;
        }
        public int x { get; set; }
        public int y { get; set; }
    }

    public class SerializedSelectedMove
    {
        public SerializedSelectedMove() { }

        public SerializedSelectedMove(Coord from, Coord to, Move.MoveTypes type)
        {
            From = new SerializedCoord(from);
            To = new SerializedCoord(to);
            Type = (int)type;
        }

        public SerializedCoord From { get; set; }
        public SerializedCoord To { get; set; }
        public int Type { get; set; }
    }


    public class SerializedMove
    {
        /*public enum MoveTypes (from the Move class)
        {
            Normal,
            Pawntwo,
            Capture,
            EnPassant,
            Promote,
            PromoteCapture,
            LongCastle,
            ShortCastle,
        }*/

        public SerializedMove() { }

        public SerializedMove(Move move)
        {
            To = new SerializedCoord(move.Destination);
            Type = (int)move.MoveType;
        }

        public SerializedCoord To { get; set; }
        public int Type { get; set; }
    }

    public class SerializedPiece
    {
        public SerializedPiece() { }

        public enum PieceType
        {
            King = 1,
            Queen,
            Rook,
            Knight,
            Bishop,
            Pawn,
        }


        public SerializedPiece(Piece p)
        {
            Moves = new List<SerializedMove>();
            foreach (var entry in p.Moves)
                Moves.Add(new SerializedMove(entry.Value));

            Team = p.Team;
            Coord = new SerializedCoord(p.Coord);
            EP = p.Ep;
            Castle = p.Castle;

            if (p is King) Type = (int)PieceType.King;
            else if (p is Queen) Type = (int)PieceType.Queen;
            else if (p is Rook) Type = (int)PieceType.Rook;
            else if (p is Bishop) Type = (int)PieceType.Bishop;
            else if (p is Knight) Type = (int)PieceType.Knight;
            else if (p is Pawn) Type = (int)PieceType.Pawn;
            else Type = -1;
        }

        public int Type { get; set; }
        public bool Team { get; set; }
        public bool EP { get; set; }
        public bool Castle { get; set; }
        public SerializedCoord Coord { get; set; }
        public List<SerializedMove> Moves { get; set; }
    }

    public class SerializedBoardState
    {
        public SerializedBoardState() { }
        public SerializedBoardState(BoardState board)
        {
            PlayerTurn = board.PlayerTurn;
            Check = board.Check;
            Checkmate = board.Checkmate;
            Stalemate = board.Stalemate;

            Pieces = new List<SerializedPiece>();
            foreach (var entry in board.WPieces)
                Pieces.Add(new SerializedPiece(entry.Value));
            foreach (var entry in board.BPieces)
                Pieces.Add(new SerializedPiece(entry.Value));
        }


        public bool PlayerTurn { get; set; }
        public bool Check { get; set; }
        public bool Checkmate { get; set; }
        public bool Stalemate { get; set; }
        public List<SerializedPiece> Pieces { get; set; }
    }
}
