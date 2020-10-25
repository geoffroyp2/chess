using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChessEngine.DataFormats
{
    public class BoardData
    {
        public BoardData() { }

        public SerializedBoardState Board { get; set; }
        //public SerializedMove Move { get; set; }
        public SerializedSelectedMove Move { get; set; }
        public char Prom { get; set; }
    }
}
