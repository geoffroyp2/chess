using ChessEngine.GameLogic.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessEngine.GameLogic.Pieces
{
    public sealed class Pawn : Piece
    {
        public Pawn(bool team, Coord coord, bool ep)
            : base(team, coord)
        {
            Ep = ep;
        }


        public override void ComputeMoves(Dictionary<Coord, Piece> teamPieces, Dictionary<Coord, Piece> opponentPieces)
        {
            Moves.Clear();

            // Move Forward
            int teamDirection = Team ? -1 : +1;
            Coord oneSquare = new Coord(Coord.x, Coord.y + teamDirection);
            if (!(teamPieces.ContainsKey(oneSquare) || opponentPieces.ContainsKey(oneSquare)))
            {
                if ((Team && Coord.y > 1) || (!Team && Coord.y < 6))
                    Moves.Add(oneSquare, new Move(Move.MoveTypes.Normal, oneSquare)); //Normal Move
                else if ((Team && Coord.y == 1) || (!Team && Coord.y == 6))
                    Moves.Add(oneSquare, new Move(Move.MoveTypes.Promote, oneSquare)); // Promotion
                if ((Team && Coord.y == 6) || (!Team && Coord.y == 1))
                {
                    Coord twoSquares = new Coord(Coord.x, Coord.y + 2 * teamDirection);
                    if (!(teamPieces.ContainsKey(twoSquares) || opponentPieces.ContainsKey(twoSquares)))
                        Moves.Add(twoSquares, new Move(Move.MoveTypes.Pawntwo, twoSquares)); // Move 2 squares
                }
            }

            // Captures Left
            Coord captureLeft = new Coord(Coord.x - 1, Coord.y + teamDirection);
            if (captureLeft.IsValid())
            {
                if (opponentPieces.ContainsKey(captureLeft))
                {
                    if ((Team && Coord.y == 1) || (!Team && Coord.y == 6))
                        Moves.Add(captureLeft, new Move(Move.MoveTypes.PromoteCapture, captureLeft));
                    else 
                        Moves.Add(captureLeft, new Move(Move.MoveTypes.Capture, captureLeft));

                }
                if ((Team && Coord.y == 3) || (!Team && Coord.y == 4))
                {
                    Coord captureEPLeft = new Coord(Coord.x - 1, Coord.y);
                    if (opponentPieces.ContainsKey(captureEPLeft))
                        if (opponentPieces[captureEPLeft].Ep)
                            Moves.Add(captureEPLeft, new Move(Move.MoveTypes.EnPassant, captureEPLeft));
                }
            }
            
            // Captures Right
            Coord captureRight = new Coord(Coord.x + 1, Coord.y + teamDirection);
            if (captureRight.IsValid())
            {
                if (opponentPieces.ContainsKey(captureRight))
                {
                    if ((Team && Coord.y == 1) || (!Team && Coord.y == 6))
                        Moves.Add(captureRight, new Move(Move.MoveTypes.PromoteCapture, captureRight));
                    else 
                        Moves.Add(captureRight, new Move(Move.MoveTypes.Capture, captureRight));

                }
                if ((Team && Coord.y == 3) || (!Team && Coord.y == 4))
                {
                    Coord captureEPRight = new Coord(Coord.x + 1, Coord.y);
                    if (opponentPieces.ContainsKey(captureEPRight))
                        if (opponentPieces[captureEPRight].Ep)
                            Moves.Add(captureEPRight, new Move(Move.MoveTypes.EnPassant, captureEPRight));
                }
            }
        }
    }
}
