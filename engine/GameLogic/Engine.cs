using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChessEngine.GameLogic.Utils;
using ChessEngine.GameLogic.Pieces;
using ChessEngine.DataFormats;

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


        public bool PlayMove(BoardState board, SerializedSelectedMove move, char promotionTarget)
        {
            // Exececutes the chosen move, returns false is the move is invalid

            Coord from = new Coord(move.From);
            Coord to = new Coord(move.To);
            Piece pieceToMove = new Piece();
            Move selectedMove = new Move();
            bool isValid = checkValid(board.PlayerTurn ? board.WPieces : board.BPieces);

            if (isValid)
            {
                //Clear en-passant status from every Piece
                foreach (KeyValuePair<Coord, Piece> entry in board.WPieces)
                    entry.Value.Ep = false;
                foreach (KeyValuePair<Coord, Piece> entry in board.BPieces)
                    entry.Value.Ep = false;


                // Play move (en-passant is reapplied to a specific pawn if necessary
                if (board.PlayerTurn)
                    play(board.WPieces, board.BPieces);
                else
                    play(board.BPieces, board.WPieces);


                board.PlayerTurn = !board.PlayerTurn;
                board.ComputeMoves();
                return true;
            }
            else
            {
                return false;
            }


            // LOCAL FUNCTIONS
            // Check if move is valid
            bool checkValid(Dictionary<Coord, Piece> pieces)
            {
                if (pieces.ContainsKey(from))
                {
                    pieceToMove = pieces[from];
                   
                    if (pieceToMove.Moves.ContainsKey(to) || (move.Type == 'E' && pieceToMove.Moves.ContainsKey(new Coord(to.x, pieceToMove.Coord.y))))
                    {
                        selectedMove = pieceToMove.Moves[to];
                        return true;
                    }
                }
                return false;
            }

            // PLAY MOVE : todo -> give that responsibility to the board to be able to verify moves more easily
            void play(Dictionary<Coord, Piece> alliedPieces, Dictionary<Coord, Piece> opponentPieces)
            {

                // Remove moving piece from the list
                alliedPieces.Remove(pieceToMove.Coord);

                // Castle status
                if (pieceToMove is Rook || pieceToMove is King)
                    pieceToMove.Castle = false;


                // handle promotion : change Piece into target Piece
                if (selectedMove.MoveType == Move.MoveTypes.Promote || selectedMove.MoveType == Move.MoveTypes.PromoteCapture)
                {
                    Piece newPiece = new Piece();
                    switch(promotionTarget)
                    {
                        case 'Q':
                            newPiece = new Queen(pieceToMove.Team, pieceToMove.Coord);
                            break;
                        case 'R':
                            newPiece = new Rook(pieceToMove.Team, pieceToMove.Coord, false);
                            break;
                        case 'N':
                            newPiece = new Knight(pieceToMove.Team, pieceToMove.Coord);
                            break;
                        case 'B':
                            newPiece = new Bishop(pieceToMove.Team, pieceToMove.Coord);
                            break;
                    }
                    pieceToMove = newPiece;
                }

                // handle different moves/captures
                switch (selectedMove.MoveType)
                {
                    case Move.MoveTypes.Normal:
                    case Move.MoveTypes.Promote:
                        pieceToMove.Coord = selectedMove.Destination;
                        break;
                    case Move.MoveTypes.Pawntwo:
                        pieceToMove.Ep = true;
                        pieceToMove.Coord = selectedMove.Destination;
                        break;
                    case Move.MoveTypes.Capture:
                    case Move.MoveTypes.PromoteCapture:
                        opponentPieces.Remove(selectedMove.Destination);
                        pieceToMove.Coord = selectedMove.Destination;
                        break;
                    case Move.MoveTypes.EnPassant:
                        opponentPieces.Remove(new Coord(selectedMove.Destination.x, pieceToMove.Coord.y));
                        pieceToMove.Coord = selectedMove.Destination;
                        break;
                    case Move.MoveTypes.ShortCastle:
                        // find corresponding rook and update it's position
                        Piece rookS = alliedPieces[new Coord(7,pieceToMove.Coord.y)];
                        alliedPieces.Remove(rookS.Coord);
                        rookS.Coord = new Coord(selectedMove.Destination.x - 1, selectedMove.Destination.y);
                        alliedPieces.Add(rookS.Coord, rookS);
                        pieceToMove.Coord = selectedMove.Destination;
                        break;
                    case Move.MoveTypes.LongCastle:
                        Piece rookL = alliedPieces[new Coord(0, pieceToMove.Coord.y)];
                        alliedPieces.Remove(rookL.Coord);
                        rookL.Coord = new Coord(selectedMove.Destination.x + 1, selectedMove.Destination.y);
                        alliedPieces.Add(rookL.Coord, rookL);
                        pieceToMove.Coord = selectedMove.Destination;
                        break;
                    default:
                        break;
                }

                // put moved piece back into the list
                alliedPieces.Add(pieceToMove.Coord, pieceToMove);
            }
        }
    }
}

