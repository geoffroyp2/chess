using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.Text.Json;
using System.Text.Json.Serialization;

using ChessEngine.DataFormats;
using ChessEngine.GameLogic;
using ChessEngine.GameLogic.Utils;
using ChessEngine.AI;
using ChessEngine.AI.utils;

namespace ChessEngine.Controllers
{
    [Route("engine")]
    [ApiController]
    public class EngineController : ControllerBase
    {

        private Engine engine = new Engine();
        private AIHandler ai = new AIHandler();

        [HttpPost("move")]
        public IActionResult Move(BoardData data)
        {
            BoardState currentState = engine.GetCurrentState(data.Board);

            if (data.Move.Type >= 0)
            {
                bool moveIsValid = engine.ValidateMove(currentState, data.Move);
                if (moveIsValid)
                {
                    engine.PlayMove(currentState, data.Move, (SerializedPiece.PieceType)data.Prom);
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

        [HttpPost("ia")]
        public IActionResult GetAIMove(BoardData data)
        {
            BoardState currentState = engine.GetCurrentState(data.Board);

            StateEvaluation bestState = ai.PlayAIMove(currentState);

            BoardData newData = new BoardData();
            newData.Board = new SerializedBoardState(bestState.Board);
            newData.Move = bestState.Move;
            newData.Prom = '0';

            return new OkObjectResult(newData);
        }

    }
}
