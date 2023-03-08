import { createContext, PropsWithChildren, useContext, useReducer, useState } from "react";
import { reducer } from "../reducer";
import { Action, Coordinate, Direction, GameState, Snake } from "../types";

interface GameStateContextType {
    gameState: GameState;
    dispatch: (action: Action) => void;
}

const SNAKE = {
    body: [
        { rowIndex: 0, columnIndex: 0 } as Coordinate,
        { rowIndex: 0, columnIndex: 1 } as Coordinate
    ],
    direction: "RIGHT",
} as Snake;

const GAME_STATE = {
    snake: SNAKE,
    rowCount: 10,
    columnCount: 10,
    tickDuraction: 250,
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