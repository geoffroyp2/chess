using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChessEngine.GameLogic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.Text.Json;
using System.Text.Json.Serialization;

namespace ChessEngine.Controllers
{
    [Route("engine")]
    [ApiController]
    public class EngineController : ControllerBase
    {
       
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
            // creating an instance of engine here to deal with multiple calls ?
            Engine engine = new Engine();
            BoardState currentState = engine.GetCurrentState(fen);
            if (move != "null")
            {
                if (engine.VerifyMove(currentState, move))
                {
                    engine.PlayMove(currentState, move);
                    string serializedBoard = JsonSerializer.Serialize(new SerializedBoardState(currentState));
                    return new OkObjectResult(serializedBoard);
                }
                else
                {
                    return new ConflictObjectResult("Invalid Move");
                }
            }
            else
            {
                string serializedBoard = JsonSerializer.Serialize(new SerializedBoardState(currentState));
                return new OkObjectResult(serializedBoard);
            }
        }

    }
}
