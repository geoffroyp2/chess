using Microsoft.VisualBasic.CompilerServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessEngine.GameLogic.Utils
{
    public class Coord
    {
        public Coord()
        {
            x = -1;
            y = -1;
        }
        public Coord(int _x, int _y)
        {
            x = _x;
            y = _y;
        }

        public int x { get; set; }
        public int y { get; set; }

        public bool IsDefault()
        {
            return x < 0;
        }
        public bool IsValid()
        {
            return x >= 0 && x <= 7 && y >= 0 && y <= 7;
        }
        public string toString()
        {
            string s = "" + (char)(x + 97) + (char)(7 - y + 49);
            return s;
        }


        public static bool operator ==(Coord a, Coord b) => a.x == b.x && a.y == b.y;
        public static bool operator !=(Coord a, Coord b) => !(a == b);
        public override bool Equals(object other)
        {
            if ((other == null) || !this.GetType().Equals(other.GetType()))
                return false;
            else
                return this == (Coord)other;
        }
        public override int GetHashCode()
        {
            return Tuple.Create(x, y).GetHashCode();
        }


    }
}
