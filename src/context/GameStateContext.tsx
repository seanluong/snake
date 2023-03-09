import { createContext, PropsWithChildren, useContext, useReducer, useState } from "react";
import { reducer } from "../reducer";
import { Action, Coordinate, GameState, Snake, SnakePart } from "../types";

interface GameStateContextType {
    gameState: GameState;
    dispatch: (action: Action) => void;
}

const SNAKE = {
    body: [
        {
            coordinate: { rowIndex: 0, columnIndex: 0 },
            type: "HORIZONTAL"
        } as SnakePart,
        {
            coordinate: { rowIndex: 0, columnIndex: 1},
            type: "HORIZONTAL" 
        } as SnakePart
    ],
    direction: "RIGHT",
} as Snake;

const GAME_STATE = {
    snake: SNAKE,
    rowCount: 20,
    columnCount: 20,
    tickDuraction: 150,
    apples: [] as Coordinate[],
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