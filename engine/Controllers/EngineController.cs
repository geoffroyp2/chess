using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.Text.Json;
using System.Text.Json.Serialization;

using ChessEngine.GameLogic;
using ChessEngine.DataFormats;



namespace ChessEngine.Controllers
{
    [Route("engine")]
    [ApiController]
    public class EngineController : ControllerBase
    {

        [HttpPost("move")]
        public IActionResult Move(BoardData data)
        {
            // creating an instance of engine here to deal with multiple calls ?
            Engine engine = new Engine();
            BoardState currentState = engine.GetCurrentState(data.Board);

            if (data.Move.Type != '0')
            {
                bool success = engine.PlayMove(currentState, data.Move, data.Prom);
                if (success)
                {
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
