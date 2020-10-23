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
            WPieces = new Dictionary<Coord, Piece>();
            BPieces = new Dictionary<Coord, Piece>();
        }

        // params
        public string Fen { get; }
        public bool PlayerTurn { get; }
        public Dictionary<Coord, Piece> BPieces { get; set; }
        public Dictionary<Coord, Piece> WPieces { get; set; }
        public bool Check { get; set; }
        public bool CheckMate { get; set; }
        public bool StaleMate { get; set; }

        // Methods
        public void AddPiece(char type, bool team, Coord coord, bool extraParam)
        {
            switch (type)
            {
                case 'K':
                    if (team) WPieces.Add(coord, new King(team, coord, extraParam));
                    else BPieces.Add(coord, new King(team, coord, extraParam));
                    break;
                case 'Q':
                    if (team) WPieces.Add(coord, new Queen(team, coord));
                    else BPieces.Add(coord, new Queen(team, coord));
                    break;
                case 'R':
                    if (team) WPieces.Add(coord, new Rook(team, coord, extraParam));
                    else BPieces.Add(coord, new Rook(team, coord, extraParam));
                    break;
                case 'N':
                    if (team) WPieces.Add(coord, new Knight(team, coord));
                    else BPieces.Add(coord, new Knight(team, coord));
                    break;
                case 'B':
                    if (team) WPieces.Add(coord, new Bishop(team, coord));
                    else BPieces.Add(coord, new Bishop(team, coord));
                    break;
                case 'P':
                    if (team) WPieces.Add(coord, new Pawn(team, coord, extraParam));
                    else BPieces.Add(coord, new Pawn(team, coord, extraParam));
                    break;
            }
        }

        public void ComputeMoves()
        {
            // 1. Compute Opponent's moves without check for illegal moves (to look for checks and mates)
            ComputeOpponentMoves();

            // 2. Compute Current player's moves and eliminate illegal moves. If there is no moves, it's either checkmate or stalemate
            bool atLeastOneMove = false;
            if (PlayerTurn)
            {
                foreach (KeyValuePair<Coord, Piece> entry in WPieces)
                {
                    entry.Value.ComputeMoves(WPieces, BPieces, true);
                    if (!atLeastOneMove && entry.Value.Moves.Count > 0) 
                        atLeastOneMove = true;
                }
            }
            else
            {
                foreach (KeyValuePair<Coord, Piece> entry in BPieces)
                {
                    entry.Value.ComputeMoves(BPieces, WPieces, true);
                    if (!atLeastOneMove && entry.Value.Moves.Count > 0)
                        atLeastOneMove = true;
                }
            }

            //3. checkMate and stalemate
            if (!atLeastOneMove)
                if (Check) CheckMate = true;
                else StaleMate = true;
        }

        public void ComputeOpponentMoves()
        {
            // Compute opponent's move and see if the current situation is check
            // Separate method because it is accessed to check if a situation is possible (maybe change that ?)
            if (PlayerTurn)
            {
                Coord kingCoord = new Coord();
                foreach (KeyValuePair<Coord, Piece> entry in WPieces)
                    if (entry.Value is King) kingCoord = entry.Value.Coord;
                foreach (KeyValuePair<Coord, Piece> entry in BPieces)
                {
                    entry.Value.ComputeMoves(BPieces, WPieces, false);
                    if (!Check)
                        if (entry.Value.Moves.ContainsKey(kingCoord)) Check = true;
                }
            }
            else
            {
                Coord kingCoord = new Coord();
                foreach (KeyValuePair<Coord, Piece> entry in BPieces)
                    if (entry.Value is King) kingCoord = entry.Value.Coord;
                foreach (KeyValuePair<Coord, Piece> entry in WPieces)
                {
                    entry.Value.ComputeMoves(WPieces, BPieces, false);
                    if (!Check)
                        if (entry.Value.Moves.ContainsKey(kingCoord)) Check = true;
                }
            }
        }

        public bool ValidateMove(string move)
        {
            return true;
        }
    }
}
