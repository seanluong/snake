import { createContext, PropsWithChildren, useContext, useReducer, useState } from "react";
import { reducer } from "../reducer";
import { Action, Coordinate, GameState, Snake, SnakePart } from "../types";

interface GameStateContextType {
    gameState: GameState;
    dispatch: (action: Action) => void;
}

export const SNAKE = {
    body: [
        {
            coordinate: { rowIndex: 0, columnIndex: 0 },
            type: "HORIZONTAL",
            position: "TAIL",
        } as SnakePart,
        {
            coordinate: { rowIndex: 0, columnIndex: 1 },
            type: "HORIZONTAL",
            position: "HEAD", 
        } as SnakePart
    ],
    direction: "RIGHT",
} as Snake;

export const GAME_STATE = {
    snake: SNAKE,
    rowCount: 8,
    columnCount: 8,
    tickDuraction: 150,
    apples: [{
        rowIndex: 4,
        columnIndex: 4,
    }] as Coordinate[],
    scoreInfo: {
        currentScore: 0,
    },
    status: "NEW",
} as GameState;

const GameStateContext = createContext<GameStateContextType>({
    gameState: GAME_STATE,
    dispatch: () => {},
})


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