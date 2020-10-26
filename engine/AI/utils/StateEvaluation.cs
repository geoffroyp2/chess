using ChessEngine.DataFormats;
using ChessEngine.GameLogic;
using ChessEngine.GameLogic.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessEngine.AI.utils
{
    public class StateEvaluation
    {
        public StateEvaluation() { }
        

        public StateEvaluation(BoardState board, double eval, Piece pieceSelected, Move moveSelected)
        {
            Board = board;
            Eval = eval;
            Move = new SerializedSelectedMove(pieceSelected.Coord, moveSelected.Destination, moveSelected.MoveType);
        }

        public BoardState Board { get; set; }
        public double Eval { get; set; }
        public SerializedSelectedMove Move {get; set;}


    }
}
