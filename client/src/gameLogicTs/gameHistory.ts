import { GameState } from "../interfaces/boardData";

export default class GameHistory {
    states: GameState[];

    constructor() {
        this.states = [];
    }

    add(state: GameState): void {
        this.states.push(state);
    }

}