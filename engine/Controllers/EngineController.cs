using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChessEngine.GameLogic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChessEngine.Controllers
{
    [Route("engine")]
    [ApiController]
    public class EngineController : ControllerBase
    {
        private Engine engine = new Engine();





        [HttpGet]
        public IEnumerable<string> GetDefault()
        {
            System.Diagnostics.Debug.WriteLine("getAll");
            string[] arr = new string[] {
              "1","2"
            };
            return arr;
        }

        [HttpGet("move")]
        public IActionResult Move(string fen, string move)
        {
            bool validMove = engine.verifyMove(fen, move);
            return new OkObjectResult(validMove);
        }

    }
}
