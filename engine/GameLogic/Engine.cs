using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChessEngine.GameLogic.Utils;

namespace ChessEngine.GameLogic
{
    public class Engine
    {
        private FenHandler fenHandler = new FenHandler();

        public BoardState GetCurrentState(string fen)
        {
            BoardState newState = fenHandler.ParseFEN(fen);
            newState.ComputeMoves();
            return newState;
        }

        public bool VerifyMove(BoardState board, string move)
        {
            return true;
        }

        public void PlayMove(BoardState board, string move)
        {
            if (move == "OO" || move == "OOO")
            {
                // TODO maybe useless ?
            }
            else
            {
                Coord from = new Coord(move.Substring(0, 2));
                Coord to = new Coord(move.Substring(2, 2));

                if (move.Length > 4)
                {
                    char PromoteType = move[move.Length - 2];
                    // TODO
                }

                if (board.PlayerTurn)
                {
                    // Remove entry, Remove captured piece, change coord, re-add entry
                    Piece movePiece = board.WPieces[from];
                    board.WPieces.Remove(from);

                    if (board.BPieces.ContainsKey(to))
                        board.BPieces.Remove(to);

                    movePiece.Coord = to;
                    board.WPieces.Add(to, movePiece);


                }
                else
                {
                    Piece movePiece = board.BPieces[from];
                    board.BPieces.Remove(from);

                    if (board.WPieces.ContainsKey(to))
                        board.WPieces.Remove(to);

                    movePiece.Coord = to;
                    board.BPieces.Add(to, movePiece);
                }
            }

            board.PlayerTurn = !board.PlayerTurn;
            board.ComputeMoves();
        }

    }
}
