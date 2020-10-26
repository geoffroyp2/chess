using ChessEngine.GameLogic;
using ChessEngine.GameLogic.Pieces;
using ChessEngine.GameLogic.Utils;
using ChessEngine.DataFormats;
using ChessEngine.AI.utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChessEngine.IA;

namespace ChessEngine.AI
{
    public class AIHandler
    {

        private Engine engine = new Engine();
        //private StateEvaluator


        public StateEvaluation PlayAIMove(BoardState board)
        {
            Queue<StateEvaluation> queue = new Queue<StateEvaluation>();

            GenerateNextPositions(board, queue);

            StateEvaluation bestNewPosition = new StateEvaluation();
            if (board.PlayerTurn)
            {
                double bestEval = Double.MinValue;
                foreach (StateEvaluation b in queue)
                {
                    if (b.Eval > bestEval)
                    {
                        bestNewPosition = b;
                        bestEval = b.Eval;
                    }
                }
            }
            else
            {
                double bestEval = Double.MaxValue;
                foreach (StateEvaluation b in queue)
                {
                    if (b.Eval < bestEval)
                    {
                        bestNewPosition = b;
                        bestEval = b.Eval;
                    }
                }
            }

            return bestNewPosition;
        }

        private void GenerateNextPositions(BoardState board, Queue<StateEvaluation> queue)
        {
            if (board.PlayerTurn)
            {
                foreach (KeyValuePair<Coord, Piece> piece in board.WPieces)
                {
                    foreach (KeyValuePair<Coord, Move> move in piece.Value.Moves)
                    {
                        if (move.Value.MoveType == Move.MoveTypes.Promote || move.Value.MoveType == Move.MoveTypes.PromoteCapture)
                        {
                            BoardState boardQ = new BoardState(board);
                            engine.PlayMove(boardQ, piece.Value, move.Value, 'Q');
                            queue.Enqueue(new StateEvaluation(boardQ, StateEvaluator.StateValue(boardQ), piece.Value, move.Value));


                            BoardState boardR = new BoardState(board);
                            engine.PlayMove(boardR, piece.Value, move.Value, 'R');
                            queue.Enqueue(new StateEvaluation(boardR, StateEvaluator.StateValue(boardR), piece.Value, move.Value));

                            BoardState boardB = new BoardState(board);
                            engine.PlayMove(boardB, piece.Value, move.Value, 'B');
                            queue.Enqueue(new StateEvaluation(boardB, StateEvaluator.StateValue(boardB), piece.Value, move.Value));

                            BoardState boardN = new BoardState(board);
                            engine.PlayMove(boardN, piece.Value, move.Value, 'N');
                            queue.Enqueue(new StateEvaluation(boardN, StateEvaluator.StateValue(boardN), piece.Value, move.Value));
                        }
                        else
                        {
                            BoardState boardCopy = new BoardState(board);
                            engine.PlayMove(boardCopy, piece.Value, move.Value, '0');
                            queue.Enqueue(new StateEvaluation(boardCopy, StateEvaluator.StateValue(boardCopy), piece.Value, move.Value));
                        }
                    }
                }
            }
            else
            {
                foreach (KeyValuePair<Coord, Piece> piece in board.BPieces)
                {
                    foreach (KeyValuePair<Coord, Move> move in piece.Value.Moves)
                    {
                        if (move.Value.MoveType == Move.MoveTypes.Promote || move.Value.MoveType == Move.MoveTypes.PromoteCapture)
                        {
                            BoardState boardQ = new BoardState(board);
                            engine.PlayMove(boardQ, piece.Value, move.Value, 'Q');
                            queue.Enqueue(new StateEvaluation(boardQ, StateEvaluator.StateValue(boardQ), piece.Value, move.Value));


                            BoardState boardR = new BoardState(board);
                            engine.PlayMove(boardR, piece.Value, move.Value, 'R');
                            queue.Enqueue(new StateEvaluation(boardR, StateEvaluator.StateValue(boardR), piece.Value, move.Value));

                            BoardState boardB = new BoardState(board);
                            engine.PlayMove(boardB, piece.Value, move.Value, 'B');
                            queue.Enqueue(new StateEvaluation(boardB, StateEvaluator.StateValue(boardB), piece.Value, move.Value));

                            BoardState boardN = new BoardState(board);
                            engine.PlayMove(boardN, piece.Value, move.Value, 'N');
                            queue.Enqueue(new StateEvaluation(boardN, StateEvaluator.StateValue(boardN), piece.Value, move.Value));
                        }
                        else
                        {
                            BoardState boardCopy = new BoardState(board);
                            engine.PlayMove(boardCopy, piece.Value, move.Value, '0');
                            queue.Enqueue(new StateEvaluation(boardCopy, StateEvaluator.StateValue(boardCopy), piece.Value, move.Value));
                        }
                    }
                }
            }
        }

    }
}
