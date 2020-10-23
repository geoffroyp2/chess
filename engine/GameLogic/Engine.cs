using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChessEngine.GameLogic.Utils;

namespace ChessEngine.GameLogic
{
    public class Engine
    {
        private FenHandler fenHandler = new FenHandler();


        public bool verifyMove(string fen, string move)
        {
            //System.Diagnostics.Debug.WriteLine(fen);
            //System.Diagnostics.Debug.WriteLine(move);

            BoardState newState = fenHandler.ParseFEN(fen);
            newState.ComputeMoves();
            bool valid = newState.ValidateMove(move);


            return valid;
        }

    }
}
