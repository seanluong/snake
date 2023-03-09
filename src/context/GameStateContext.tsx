import { createContext, PropsWithChildren, useContext, useReducer } from "react";
import { reducer } from "../reducer";
import { Action, GameState, Snake } from "../types";

interface GameStateContextType {
    gameState: GameState;
    dispatch: (action: Action) => void;
}

const SNAKE: Snake = {
    body: [
        {
            coordinate: { rowIndex: 0, columnIndex: 0 },
            type: "HORIZONTAL",
            position: "TAIL",
        },
        {
            coordinate: { rowIndex: 0, columnIndex: 1 },
            type: "HORIZONTAL",
            position: "HEAD", 
        }
    ],
    direction: "RIGHT",
};

export const GAME_STATE: GameState = {
    snake: SNAKE,
    rowCount: 8,
    columnCount: 8,
    tickDuraction: 150,
    apples: [{
        rowIndex: 4,
        columnIndex: 4,
    }],
    scoreInfo: {
        currentScore: 0,
    },
    status: "NEW",
};

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