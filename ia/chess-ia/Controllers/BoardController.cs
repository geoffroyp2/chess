using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace chess_ia.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BoardController : ControllerBase
    {
        Board[] messages = new Board[]
        {
            new Board { Text = "Hello, " },
            new Board { Text = "World!" }
        };

        [HttpGet]
        public IEnumerable<Board> GetAllBoards()
        {
            return messages;
        }
    }
}
