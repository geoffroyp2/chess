using ChessEngine.GameLogic.Utils;
using ChessEngine.GameLogic.Pieces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessEngine.GameLogic
{
    public class Piece
    {
        public Piece()
            : this(false, new Coord())
        {
        }

        public Piece(bool team, Coord coord)
        {
            Team = team;
            Coord = new Coord(coord);
            Moves = new Dictionary<Coord, Move>();
            Castle = false;
            Ep = false;
        }

        public bool IsEmpty()
        {
            return Coord.x == -1;
        }

        public bool Team { get; set; }
        public Coord Coord { get; set; }
        public bool Castle { get; set; }
        public bool Ep { get; set; }
        public Dictionary<Coord, Move> Moves { get; set; }

        public void VerifyMoves(Dictionary<Coord, Piece> teamPieces, Dictionary<Coord, Piece> opponentPieces, BoardState boardCopy)
        {
            List<Coord> toRemove = new List<Coord>();
            Piece thisInCopy = Team ? boardCopy.WPieces[Coord] : boardCopy.BPieces[Coord];
            Piece capturedPiece = new Piece();

            foreach (KeyValuePair<Coord, Move> entry in Moves)
            {
                // move current piece in the board copy and remove captured piece if necessary
                thisInCopy.Coord = entry.Key;
                if (entry.Value.MoveType == Move.MoveTypes.Capture || entry.Value.MoveType == Move.MoveTypes.PromoteCapture)
                {
                    capturedPiece = opponentPieces[entry.Key];
                    opponentPieces.Remove(entry.Key);
                }
                else if (entry.Value.MoveType == Move.MoveTypes.EnPassant)
                {
                    Coord c = new Coord(entry.Key.x, Team ? entry.Key.y - 1 : entry.Key.y + 1);
                    capturedPiece = opponentPieces[c];
                    opponentPieces.Remove(c);
                }

                // Compute opponent's move and see if it results in a check
                boardCopy.ComputeOpponentMoves();
                if (boardCopy.Check)
                    toRemove.Add(entry.Key);


                // revert move
                thisInCopy.Coord = Coord;
                if (!capturedPiece.IsEmpty())
                {
                    opponentPieces.Add(capturedPiece.Coord, capturedPiece);
                    capturedPiece = new Piece();
                }

            }

            // Remove invalid moves
            foreach (Coord c in toRemove)
                Moves.Remove(c);
        }


        public void ComputeMovesVerify(Dictionary<Coord, Piece> teamPieces, Dictionary<Coord, Piece> opponentPieces, BoardState boardCopy)
        {
            ComputeMoves(teamPieces, opponentPieces);
            //VerifyMoves(teamPieces, opponentPieces, boardCopy);
        }

        public void ComputeMovesNormal(Dictionary<Coord, Piece> teamPieces, Dictionary<Coord, Piece> opponentPieces)
        {
            ComputeMoves(teamPieces, opponentPieces);
        }

        // Virtual method with specific implementation in each piece type
        public virtual void ComputeMoves(Dictionary<Coord, Piece> teamPieces, Dictionary<Coord, Piece> opponentPieces) { }
    }
}
