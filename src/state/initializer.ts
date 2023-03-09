import { Coordinate, Snake } from "../types";
import { GameSettings, GameState } from "./types";

const GAME_SETTINGS: GameSettings = {
    rowCount: 8,
    columnCount: 8,
    tickDuraction: 150,
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
    const { rowCount, columnCount, tickDuraction } = settings;
    const state: GameState = {
        snake: generateSnake(rowCount, columnCount),
        rowCount,
        columnCount,
        tickDuraction,
        apples: [{
            rowIndex: Math.floor(rowCount / 2),
            columnIndex: Math.floor(columnCount / 2),
        }],
        scoreInfo: {
            currentScore: 0,
        },
        status: "NEW",
    };
    return state;
}

export {
    generateSnake,
    newGameState
};