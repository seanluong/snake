import { createContext, PropsWithChildren, useContext, useReducer } from "react";
import { reducer } from "../reducer";
import { newGameState } from "../state/initializer";
import { Action,  GameState } from "../state/types";

interface GameStateContextType {
    gameState: GameState;
    dispatch: (action: Action) => void;
}

const GameStateContext = createContext<GameStateContextType>({
    gameState: newGameState(),
    dispatch: () => {},
})

const GameStateProvider = ({ children }: PropsWithChildren) => {
    const [gameState, dispatch] = useReducer(reducer, newGameState());
    return (
        <GameStateContext.Provider value={{
            gameState,
            dispatch,
        }}>
            {children}
        </GameStateContext.Provider>
    );
}

const useGameStateContext = () => useContext(GameStateContext);

export { useGameStateContext, GameStateProvider };