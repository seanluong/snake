import { createContext, PropsWithChildren, useContext, useReducer, useState } from "react";
import { Action, Coordinate, Direction, GameState, Snake } from "../types";

interface GameStateContextType {
    gameState: GameState;
    dispatch: (action: Action) => void;
}

const SNAKE = {
    body: [
        { rowIndex: 0, columnIndex: 0 } as Coordinate
    ],
    direction: "DOWN",
} as Snake;

const GAME_STATE = {
    snake: SNAKE,
    rowCount: 10,
    columnCount: 10,
  } as GameState;

const GameStateContext = createContext<GameStateContextType>({
    gameState: GAME_STATE,
    dispatch: () => {},
})

const directionToOffset = (direction: Direction): number[] => {
    switch (direction) {
        case "UP":
            return [-1, 0];
        case "DOWN":
            return [1, 0];
        case "LEFT":
            return [0, -1];
        case "RIGHT":
            return [0, 1];
        default:
            return [0, 0];
    }
}

const isCoordinateInBoard = (coordinate: Coordinate, rowCount: number, columnCount: number) => {
    const { rowIndex, columnIndex } = coordinate;
    return 0 <= rowIndex && rowIndex < rowCount && 0 <= columnIndex && columnIndex <= columnCount;
}

const reducer = (gameState: GameState, action: Action): GameState => {
    const { snake, rowCount, columnCount } = gameState;
    const { body, direction } = snake;
    switch (action.type) {
        case "move":
            const [dr, dc] = directionToOffset(direction);

            return {
                ...gameState,
                snake: {
                    ...snake,
                    body: body.map(({ rowIndex, columnIndex }) => {
                        const nextRowIndex = rowIndex + dr;
                        const nextColumnIndex = columnIndex + dc;
                        const coor = {
                            rowIndex: nextRowIndex,
                            columnIndex: nextColumnIndex,
                        }
                        if (isCoordinateInBoard(coor, rowCount, columnCount)) {
                            return coor;
                        }
                        return {
                            rowIndex, columnIndex
                        }
                    })
                }
            }
        default:
            break;
    }
    return gameState;
}

export const GameStateProvider = ({ children }: PropsWithChildren) => {
    const [gameState, dispatch] = useReducer(reducer, GAME_STATE);
    return (
        <GameStateContext.Provider value={{
            gameState,
            dispatch,
        }}>
            {children}
        </GameStateContext.Provider>
    );
}

export const useGameStateContext = () => useContext(GameStateContext);