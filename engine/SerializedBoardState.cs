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

namespace ChessEngine
{
    public class SerializedCoord
    {
        public SerializedCoord(Coord coord)
        {
            x = coord.x;
            y = coord.y;
        }
        public int x { get; }
        public int y { get; }
    }
    public class SerializedMove
    {
        public SerializedMove(Move move)
        {
            To = new SerializedCoord(move.Destination);
            switch (move.MoveType)
            {
                case Move.MoveTypes.Capture: Type = 'X'; break;
                case Move.MoveTypes.EnPassant: Type = 'E'; break;
                case Move.MoveTypes.LongCastle: Type = 'L'; break;
                case Move.MoveTypes.ShortCastle: Type = 'S'; break;
                case Move.MoveTypes.Normal: Type = 'M'; break;
                case Move.MoveTypes.Promote: Type = 'P'; break;
                case Move.MoveTypes.PromoteCapture: Type = 'Q'; break;
                default: Type = '0'; break;
            }
        }

        public SerializedCoord To { get; }
        public char Type { get; }
    }

    public class SerializedPiece
    {
        public SerializedPiece(Piece p)
        {
            Moves = new List<SerializedMove>();
            foreach (var entry in p.Moves)
                Moves.Add(new SerializedMove(entry.Value));

            Team = p.Team;
            Coord = new SerializedCoord(p.Coord);
            EP = p.Ep;
            Castle = p.Castle;

            if (p is King) Type = 'K';
            else if (p is Queen) Type = 'Q';
            else if (p is Rook) Type = 'R';
            else if (p is Bishop) Type = 'B';
            else if (p is Knight) Type = 'N';
            else if (p is Pawn) Type = 'P';
            else Type = '0';
        }

        public char Type { get; }
        public bool Team { get; }
        public bool EP { get; }
        public bool Castle { get; }
        public SerializedCoord Coord { get; }
        public List<SerializedMove> Moves { get; }
    }

    public class SerializedBoardState
    {
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


        public bool PlayerTurn { get; }
        public bool Check { get; }
        public bool Checkmate { get; }
        public bool Stalemate { get; }
        public List<SerializedPiece> Pieces { get; }
    }
}
