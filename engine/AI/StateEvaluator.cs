using ChessEngine.GameLogic;
using ChessEngine.GameLogic.Utils;
using ChessEngine.GameLogic.Pieces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessEngine.IA
{
    public static class StateEvaluator
    {
        // Evaluate board piece values
        public static double StateValue(BoardState board)
        {
            if (board.Checkmate)
                return 1000.0;
            else if (board.Stalemate)
                return 0.0;

            return PieceValue(board);
        }

        static double QueenValue = 9.0;
        static double RookValue = 5.0;
        static double BishopValue = 3.0;
        static double KnightValue = 3.0;
        static double PawnValue = 1.0;

        private static double PieceValue(BoardState board)
        {
            double value = 0.0;
            foreach (KeyValuePair<Coord, Piece> entry in board.WPieces)
            {
                if (entry.Value is Queen) value += QueenValue;
                else if (entry.Value is Rook) value += RookValue;
                else if (entry.Value is Bishop) value += BishopValue;
                else if (entry.Value is Knight) value += KnightValue;
                else if (entry.Value is Pawn) value += PawnValue;
            }
            foreach (KeyValuePair<Coord, Piece> entry in board.BPieces)
            {
                if (entry.Value is Queen) value -= QueenValue;
                else if (entry.Value is Rook) value -= RookValue;
                else if (entry.Value is Bishop) value -= BishopValue;
                else if (entry.Value is Knight) value -= KnightValue;
                else if (entry.Value is Pawn) value -= PawnValue;
            }

            return value;
        } 
    }
}
