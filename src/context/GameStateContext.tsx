import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Coordinate, Direction, GameState, Snake } from "../types";

interface GameStateContextType {
    gameState: GameState;
    updateDirection: (direction: Direction) => void;
}

const GAME_STATE = {
    snake: {
        body: [
            { rowIndex: 0, columnIndex: 0 } as Coordinate
        ],
        direction: "DOWN",
    } as Snake,
  } as GameState;

const GameStateContext = createContext<GameStateContextType>({
    gameState: GAME_STATE,
    updateDirection: () => {},
})

export const GameStateProvider = ({ children }: PropsWithChildren) => {
    const [direction, setDirection] = useState<Direction>("DOWN");
    const updateDirection = (direction: Direction) => setDirection(direction);
    return (
        <GameStateContext.Provider value={{
            gameState: GAME_STATE,
            updateDirection,
        }}>
            {children}
        </GameStateContext.Provider>
    );
}

export const useGameStateContext = () => useContext(GameStateContext);