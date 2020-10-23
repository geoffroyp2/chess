using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChessEngine.GameLogic.Pieces;
using ChessEngine.GameLogic.Utils;

namespace ChessEngine.GameLogic
{
    public class BoardState
    {
        public BoardState(string fen, bool playerTurn)
        {
            Fen = fen;
            PlayerTurn = playerTurn;
            Pieces = new List<Piece>();
        }

        // params
        public string Fen { get; }
        public bool PlayerTurn { get; }
        public List<Piece> Pieces { get; set; }
        public bool Check { get; set; }
        public bool CheckMate { get; set; }
        public bool StaleMate { get; set; }

        // Methods
        public void AddPiece(char type, bool team, Coord coord, bool extraParam)
        {
            switch (type)
            {
                case 'K':
                    Pieces.Add(new King(team, coord, extraParam));
                    break;
                case 'Q':
                    Pieces.Add(new Queen(team, coord));
                    break;
                case 'R':
                    Pieces.Add(new Rook(team, coord, extraParam));
                    break;
                case 'N':
                    Pieces.Add(new Knight(team, coord));
                    break;
                case 'B':
                    Pieces.Add(new Bishop(team, coord));
                    break;
                case 'P':
                    Pieces.Add(new Pawn(team, coord, extraParam));
                    break;
            }
        }

        public void ComputeMoves()
        {
            // 1. Compute Opponent's moves without check for illegal moves (to look for checks and mates)
            ComputeOpponentMoves();

            // 2. Compute Current player's moves and eliminate illegal moves. If there is no moves, it's either checkmate or stalemate
            bool atLeastOneMove = false;
            foreach (Piece p in Pieces)
            {
                if (p.Team == PlayerTurn)
                {
                    p.ComputeMoves(Pieces, true);
                    if (p.Moves.Count > 0) atLeastOneMove = true;
                }
            }

            //3. checkMate and stalemate
            if (!atLeastOneMove)
                if (Check) CheckMate = true;
                else StaleMate = true;
        }

        private void ComputeOpponentMoves()
        {
            // Compute opponent's move and see if the current situation is check
            Coord kingCoord = new Coord(-1, -1);
            foreach (Piece p in Pieces)
            {
                if (p.Team == PlayerTurn && p is King)
                    kingCoord = p.Coord;
                if (p.Team != PlayerTurn) p.ComputeMoves(Pieces, false);
                foreach (Coord m in p.Moves)
                    if (m == kingCoord) Check = true;
            }
        }

        public bool ValidateMove(string move)
        {
            return true;
        }
    }
}
