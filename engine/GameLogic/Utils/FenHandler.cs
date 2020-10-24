using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessEngine.GameLogic.Utils
{
    public class FenHandler
    {
        public BoardState ParseFEN(string fen)
        {
            string[] rows = fen.Split("/");
            string[] infos = rows[7].Split(" ");
            rows[7] = infos[0];

            bool[] castles = { false, false, false, false };
            foreach (char c in infos[2])
            {
                if (c == '-')
                    break;
                switch (c)
                {
                    case 'K': castles[0] = true; break;
                    case 'Q': castles[1] = true; break;
                    case 'k': castles[2] = true; break;
                    case 'q': castles[3] = true; break;
                }
            }

            Coord ep = new Coord(-1, -1);
            if (infos[3] != "-")
            {
                ep.x = infos[3][0] - 'a';
                ep.y = 7 - (infos[3][1] - '1');
            }

            BoardState state = new BoardState(infos[1] == "w");

            for (int y = 0; y < 8; y++)
            {
                int x = 0;
                for (int i = 0; i < rows[y].Length; i++)
                {
                    char c = rows[y][i];
                    if (c >= '1' && c <= '8')
                        x += (c - '0');
                    else
                    {
                        bool extra =
                            (c == 'K' && (castles[0] || castles[1])) ||
                            (c == 'k' && (castles[2] || castles[3])) ||
                            (c == 'R' && castles[0] && x == 7 && y == 7) ||
                            (c == 'R' && castles[1] && x == 0 && y == 7) ||
                            (c == 'r' && castles[2] && x == 7 && y == 0) ||
                            (c == 'r' && castles[0] && x == 0 && y == 0) ||
                            (c == 'P' && x == ep.x && y == ep.y - 1) ||
                            (c == 'p' && x == ep.x && y == ep.y + 1);

                        state.AddPiece(c >= 'A' && c <= 'Z' ? c : (char)(c - 32), c >= 'A' && c <= 'Z', new Coord(x, y), extra);
                        x++;
                    }
                }
            }

            return state;
        }

        public string GetFEN(BoardState state)
        {
            return "";
        }
    }
}
