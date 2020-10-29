// small declaration for GameLogic and ClientHandler.

import GameLogic from "./gameLogic/gameLogic";
import ClientHandler from "./client/clientHandler";

const client = new ClientHandler();
const game = new GameLogic(client);

export default game;
