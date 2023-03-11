import {render} from '@testing-library/react'
import { ScoreCard } from './ScoreCard';
import { newGameState } from '../state/initializer';
import * as GameStateContext from '../context/GameStateContext';


describe("ScoreCard", () => {

    test("handles initial game state correctly for new game", () => {
        jest.spyOn(GameStateContext, 'useGameStateContext').mockReturnValue({
            gameState: newGameState(),
            dispatch: () => {}
        });

        render(
            <ScoreCard />
        );

        const scoreInfo = document.querySelectorAll("h6");
        expect(scoreInfo.length).toBe(1);
        expect(scoreInfo[0].textContent).toEqual("Score: 0");
    })

    test("renders score info correctly", () => {
        jest.spyOn(GameStateContext, 'useGameStateContext').mockReturnValue({
            gameState: {
                ...newGameState(),
                scoreInfo: {
                    currentScore: 10,
                    bestScore: 50,
                }
            },
            dispatch: () => {}
        });

        render(
            <ScoreCard />
        );
        
        const scoreInfo = document.querySelectorAll("h6");
        expect(scoreInfo.length).toBe(2);
        expect(scoreInfo[0].textContent).toEqual("Score: 10");
        expect(scoreInfo[1].textContent).toEqual("Best: 50");
    })
})

export {}