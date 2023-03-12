import { Coordinate, Direction, Snake } from "../types";

type Action =
 | { type: 'tick' }
 | { type: 'changeDirection', payload: { direction: Direction } }
 | { type: 'newGame' }
 | { type: 'togglePausePlayGame' };

type GameStatus = "NEW" | "ONGOING" | "PAUSED" | "FINISHED";

interface ScoreInfo {
    currentScore: number;
    bestScore?: number;
}

interface GameSettings {
    rowCount: number;
    columnCount: number;
    tickDuration: number;
}

interface GameState {
    snake: Snake;
    rowCount: number;
    columnCount: number;
    tickDuration: number;
    apples: Coordinate[];
    scoreInfo: ScoreInfo;
    status: GameStatus;
}

 export type { Action, GameState, GameSettings, ScoreInfo }