using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChessEngine.GameLogic.Utils;

namespace ChessEngine.GameLogic.Pieces
{
    public sealed class King : Piece
    {
        public King(bool team, Coord coord, bool castle)
            : base(team, coord)
        {
            Castle = castle;
        }


        public override void ComputeMoves(Dictionary<Coord, Piece> teamPieces, Dictionary<Coord, Piece> opponentPieces)
        {
            Moves.Clear();

            // Normal Moves
            void Square(Coord coord)
            {
                if (coord.IsValid())
                {
                    if (opponentPieces.ContainsKey(coord))
                        Moves.Add(coord, new Move(Move.MoveTypes.Capture, coord));
                    else if (!teamPieces.ContainsKey(coord))
                        Moves.Add(coord, new Move(Move.MoveTypes.Normal, coord));
                }
            }

            for (int x = -1; x < 2; x++)
                for (int y = -1; y < 2; y++)
                    if (x != 0 || y != 0)
                        Square(new Coord(Coord.x + x, Coord.y + y));


            // Castle moves
            void CastleSquare(int end, int rook, List<int> block, List<int> check, Move.MoveTypes type)
            {
                bool isBlocked = false;
                foreach (int i in block)
                {
                    Coord blockCoord = new Coord(i, Coord.y);
                    if (teamPieces.ContainsKey(blockCoord) || opponentPieces.ContainsKey(blockCoord))
                        isBlocked = true;
                }

                if (!isBlocked)
                {
                    bool isCheck = false;
                    Coord rookCoord = new Coord(rook, Coord.y);
                    if (teamPieces.ContainsKey(rookCoord) && teamPieces[rookCoord] is Rook && teamPieces[rookCoord].Castle)
                    {
                        foreach (KeyValuePair<Coord, Piece> entry in opponentPieces)
                        {
                            foreach (int i in check)
                                if (entry.Value.Moves.ContainsKey(new Coord(i, Coord.y)))
                                {
                                    isCheck = true;
                                    break;
                                }
                        }
                        if (!isCheck)
                        {
                            Coord kingDestination = new Coord(end, Coord.y);
                            Moves.Add(kingDestination, new Move(type, kingDestination));
                        }
                    }
                }
            }

            if (Castle)
            {
                CastleSquare(2, 0, new List<int> { 1, 2, 3 }, new List<int> { 2, 3, 4 }, Move.MoveTypes.LongCastle);    // long castle
                CastleSquare(6, 7, new List<int> { 5, 6 }, new List<int> { 4, 5, 6 }, Move.MoveTypes.ShortCastle);      // short castle
            }
        }
    }
}
