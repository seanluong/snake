import { spawnApples } from "../helpers/snakeHelpers";
import { Coordinate, Snake } from "../types";
import { GameSettings, GameState } from "./types";

const INITIAL_ROW_COUNT = 7;
const INITIAL_COLUMN_COUNT = 7;

const MAX_BOARD_SIZE = 10;

const GAME_SETTINGS: GameSettings = {
    rowCount: INITIAL_ROW_COUNT,
    columnCount: INITIAL_COLUMN_COUNT,
    tickDuration: 300,
}

const randomCoordinate = (rowStart: number, rowEnd: number, columnStart: number, columnEnd: number): Coordinate => {
    const rowIndex = Math.floor(Math.random() * (rowEnd - rowStart)) + rowStart;
    const columnIndex = Math.floor(Math.random() * (columnEnd - columnStart)) + columnStart;
    return { rowIndex, columnIndex }
}

const generateSnake = (rowCount: number, columnCount: number): Snake => {
    const head = randomCoordinate(1, rowCount-1, 1, columnCount-1);
    const tail = {
        rowIndex: head.rowIndex,
        columnIndex: head.columnIndex-1,
    }
    const snake: Snake = {
        body: [
            { coordinate: tail, position: "TAIL" },
            { coordinate: head, position: "HEAD" }
        ],
        direction: "RIGHT",
    };
    return snake;
}

const newGameState = (settings: GameSettings = GAME_SETTINGS): GameState => {
    const { rowCount, columnCount, tickDuration } = settings;
    const snake = generateSnake(rowCount, columnCount);
    const state: GameState = {
        snake,
        rowCount,
        columnCount,
        tickDuration,
        apples: spawnApples(snake, rowCount, columnCount),
        scoreInfo: {
            currentScore: 0,
        },
        status: "NEW",
    };
    return state;
}

export {
    generateSnake,
    newGameState,
    MAX_BOARD_SIZE
};