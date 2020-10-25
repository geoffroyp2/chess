using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChessEngine.GameLogic.Utils;

namespace ChessEngine.GameLogic
{
    public class Engine
    {
        public BoardState GetCurrentState(string fen)
        {
            FenHandler fenHandler = new FenHandler();
            BoardState newState = fenHandler.ParseFEN(fen);
            newState.ComputeMoves();
            return newState;
        }

        public BoardState GetCurrentState(SerializedBoardState board)
        {
            BoardState newState = new BoardState(board);
            newState.ComputeMoves();
            return newState;
        }

        public bool VerifyMove(BoardState board, SerializedSelectedMove move)
        {
            return true;
        }

        public bool PlayMove(BoardState board, SerializedSelectedMove move, string prom)
        {

            Coord from = new Coord(move.From);
            Coord to = new Coord(move.To);

            if (board.PlayerTurn)
            {
                // Remove entry, Remove captured piece, change coord, re-add entry
                if (!board.WPieces.ContainsKey(from)) return false;
                Piece pieceSelected = board.WPieces[from];
                if (!pieceSelected.Moves.ContainsKey(to)) return false;
                Move moveSelected = pieceSelected.Moves[to];

                board.WPieces.Remove(from);
                if (board.BPieces.ContainsKey(to))
                    board.BPieces.Remove(to);

                if (moveSelected.MoveType == Move.MoveTypes.Pawntwo)
                    pieceSelected.Ep = true;
                else if (moveSelected.MoveType == Move.MoveTypes.Promote || moveSelected.MoveType == Move.MoveTypes.PromoteCapture)
                {
                    //TODO
                }
                else if (moveSelected.MoveType == Move.MoveTypes.ShortCastle || moveSelected.MoveType == Move.MoveTypes.LongCastle)
                {
                    //TODO
                }

                pieceSelected.Coord = to;
                board.WPieces.Add(to, pieceSelected);

            }
            else
            {
                if (!board.BPieces.ContainsKey(from)) return false;
                Piece pieceSelected = board.BPieces[from];
                if (!pieceSelected.Moves.ContainsKey(to)) return false;
                Move moveSelected = pieceSelected.Moves[to];

                board.BPieces.Remove(from);
                if (board.WPieces.ContainsKey(to))
                    board.WPieces.Remove(to);

                if (moveSelected.MoveType == Move.MoveTypes.Pawntwo)
                    pieceSelected.Ep = true;
                else if (moveSelected.MoveType == Move.MoveTypes.Promote || moveSelected.MoveType == Move.MoveTypes.PromoteCapture)
                {
                    //TODO
                }
                else if (moveSelected.MoveType == Move.MoveTypes.ShortCastle || moveSelected.MoveType == Move.MoveTypes.LongCastle)
                {
                    //TODO
                }

                pieceSelected.Coord = to;
                board.BPieces.Add(to, pieceSelected);

            }


            board.PlayerTurn = !board.PlayerTurn;
            board.ComputeMoves();
            return true;
        }
    }
}
