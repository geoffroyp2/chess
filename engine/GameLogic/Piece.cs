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

        public bool IsDefault()
        {
            return Coord.x == -1;
        }

        public bool Team { get; set; }
        public Coord Coord { get; set; }
        public bool Castle { get; set; }
        public bool Ep { get; set; }
        public Dictionary<Coord, Move> Moves { get; set; }

        public void VerifyMoves(Dictionary<Coord, Piece> alliedPieces, Dictionary<Coord, Piece> opponentPieces)
        {
            // Add invalid moves to this list to be removed later
            List<Coord> toRemove = new List<Coord>();

            // Memorize current piece's coordinate
            Coord thisCoordMemo = new Coord(Coord);

            // Find the allied king
            Coord kingCoord = new Coord();

            if (this is King)
                kingCoord = Coord;
            else
                foreach (KeyValuePair<Coord, Piece> entry in alliedPieces)
                    if (entry.Value is King)
                    {
                        kingCoord = entry.Key;
                        break;
                    }
            // King not found. Should never happen in a normal game
            if (kingCoord.x < 0)
                return; 

            // Refer to the king's coordinates as x and y to be easier to read
            int x = kingCoord.x;
            int y = kingCoord.y;

            // For each move, see if it results in a self-check
            foreach (KeyValuePair<Coord, Move> entry in Moves)
            {
                //if the move is a capture, remove the captured piece temporarily 
                Piece pieceRemoved = new Piece();
                if (entry.Value.MoveType == Move.MoveTypes.Capture || entry.Value.MoveType == Move.MoveTypes.PromoteCapture)
                {
                    pieceRemoved = opponentPieces[entry.Key];
                    opponentPieces.Remove(pieceRemoved.Coord);
                }
                else if (entry.Value.MoveType == Move.MoveTypes.EnPassant)
                {
                    pieceRemoved = opponentPieces[new Coord(entry.Key.x, Coord.y)];
                    opponentPieces.Remove(pieceRemoved.Coord);
                }

                // Remove current piece from pool, re-add it with the new Coordinates
                alliedPieces.Remove(Coord);
                Coord = entry.Key;
                alliedPieces.Add(Coord, this);

                // if the king moves, update x and y positions
                if (this is King)
                {
                    x = Coord.x;
                    y = Coord.y;
                }

                // Look around the king for attacking pieces (see sub-routines below)
                if (findKnight() || findRBQ() || findKing() || findPawn())
                    toRemove.Add(entry.Key);

                // Re-add captured piece if necessary
                if (!pieceRemoved.IsDefault())
                    opponentPieces.Add(pieceRemoved.Coord, pieceRemoved);

                // Revert the move
                alliedPieces.Remove(Coord);
                Coord = thisCoordMemo;
                alliedPieces.Add(Coord, this);
            }

            // Remove invalid moves
            foreach (Coord c in toRemove)
                Moves.Remove(c);




            //  -------------------------
            //     LOCAL SUB-ROUTINES
            // to look for specific pieces
            //      around the king
            //  -------------------------

            // PAWN
            bool findPawn()
            {
                Coord c = new Coord();

                c.x = x - 1; c.y = Team ? y - 1 : y + 1;
                if (opponentPieces.ContainsKey(c) && opponentPieces[c] is Pawn) return true;
                c.x = x + 1; c.y = Team ? y - 1 : y + 1;
                if (opponentPieces.ContainsKey(c) && opponentPieces[c] is Pawn) return true;

                return false;
            }

            // KING
            bool findKing()
            {
                Coord c = new Coord();

                c.x = x - 1; c.y = y;
                if (opponentPieces.ContainsKey(c) && opponentPieces[c] is King) return true;
                c.x = x + 1; c.y = y;
                if (opponentPieces.ContainsKey(c) && opponentPieces[c] is King) return true;
                c.x = x; c.y = y - 1;
                if (opponentPieces.ContainsKey(c) && opponentPieces[c] is King) return true;
                c.x = x; c.y = y + 1;
                if (opponentPieces.ContainsKey(c) && opponentPieces[c] is King) return true;


                c.x = x - 1; c.y = y - 1;
                if (opponentPieces.ContainsKey(c) && opponentPieces[c] is King) return true;
                c.x = x + 1; c.y = y - 1;
                if (opponentPieces.ContainsKey(c) && opponentPieces[c] is King) return true;
                c.x = x - 1; c.y = y + 1;
                if (opponentPieces.ContainsKey(c) && opponentPieces[c] is King) return true;
                c.x = x + 1; c.y = y + 1;
                if (opponentPieces.ContainsKey(c) && opponentPieces[c] is King) return true;

                return false;
            }

            // KNIGHT
            bool findKnight()
            {
                Coord c = new Coord();

                c.x = x - 2; c.y = y - 1;
                if (opponentPieces.ContainsKey(c) && opponentPieces[c] is Knight) return true;
                c.x = x - 2; c.y = y + 1;
                if (opponentPieces.ContainsKey(c) && opponentPieces[c] is Knight) return true;
                c.x = x + 2; c.y = y - 1;
                if (opponentPieces.ContainsKey(c) && opponentPieces[c] is Knight) return true;
                c.x = x + 2; c.y = y + 1;
                if (opponentPieces.ContainsKey(c) && opponentPieces[c] is Knight) return true;

                c.x = x - 1; c.y = y - 2;
                if (opponentPieces.ContainsKey(c) && opponentPieces[c] is Knight) return true;
                c.x = x - 1; c.y = y + 2;
                if (opponentPieces.ContainsKey(c) && opponentPieces[c] is Knight) return true;
                c.x = x + 1; c.y = y - 2;
                if (opponentPieces.ContainsKey(c) && opponentPieces[c] is Knight) return true;
                c.x = x + 1; c.y = y + 2;
                if (opponentPieces.ContainsKey(c) && opponentPieces[c] is Knight) return true;

                return false;
            }


            // ROOK, BISHOP, QUEEN
            bool findRBQ()
            {
                bool[] flags = { true, true, true, true, true, true, true, true };

                Coord c = new Coord();

                for (int i = 1; i < 8; i++)
                {
                    c.x = x - i; c.y = y;
                    if (flags[0] && checkSquare(0, c) && (opponentPieces[c] is Rook || opponentPieces[c] is Queen)) return true;
                    c.x = x + i; c.y = y;
                    if (flags[1] && checkSquare(1, c) && (opponentPieces[c] is Rook || opponentPieces[c] is Queen)) return true;
                    c.x = x; c.y = y - i;
                    if (flags[2] && checkSquare(2, c) && (opponentPieces[c] is Rook || opponentPieces[c] is Queen)) return true;
                    c.x = x; c.y = y + i;
                    if (flags[3] && checkSquare(3, c) && (opponentPieces[c] is Rook || opponentPieces[c] is Queen)) return true;

                    c.x = x - i; c.y = y - i;
                    if (flags[4] && checkSquare(4, c) && (opponentPieces[c] is Bishop || opponentPieces[c] is Queen)) return true;
                    c.x = x + i; c.y = y - i;
                    if (flags[5] && checkSquare(5, c) && (opponentPieces[c] is Bishop || opponentPieces[c] is Queen)) return true;
                    c.x = x - i; c.y = y + i;
                    if (flags[6] && checkSquare(6, c) && (opponentPieces[c] is Bishop || opponentPieces[c] is Queen)) return true;
                    c.x = x + i; c.y = y + i;
                    if (flags[7] && checkSquare(7, c) && (opponentPieces[c] is Bishop || opponentPieces[c] is Queen)) return true;
                }

                return false;

                bool checkSquare(int f, Coord c)
                {
                    // returns true if an opponent's piece is found and set the flag if the coord is out of bounds or if a piece is found
                    if (flags[f])
                    {
                        if (!c.IsValid()) flags[f] = false;
                        else
                        {
                            if (alliedPieces.ContainsKey(c)) // && alliedPieces[c] != this
                            {
                                flags[f] = false;
                                return false;
                            }
                            if (opponentPieces.ContainsKey(c))
                            {
                                flags[f] = false;
                                return true;
                            }
                        }
                    }
                    return false;
                }
            }
        }


        public void ComputeMovesVerify(Dictionary<Coord, Piece> teamPieces, Dictionary<Coord, Piece> opponentPieces)
        {
            ComputeMoves(teamPieces, opponentPieces);
            VerifyMoves(teamPieces, opponentPieces);
        }

        public void ComputeMovesNormal(Dictionary<Coord, Piece> teamPieces, Dictionary<Coord, Piece> opponentPieces)
        {
            ComputeMoves(teamPieces, opponentPieces);
        }

        public virtual void ComputeMoves(Dictionary<Coord, Piece> teamPieces, Dictionary<Coord, Piece> opponentPieces) { }
    }
}
