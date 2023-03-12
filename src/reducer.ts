import { Direction } from "./types";
import cloneDeep from 'lodash/cloneDeep';
import { Action, GameSettings, GameState, ScoreInfo } from "./state/types";
import { sameCoordinate } from "./helpers/boardHelper";
import { MAX_BOARD_SIZE, newGameState } from "./state/initializer";
import { augmentSnakeBody, eatApple, eatSelf, hitWall, nextSnakeHead, snakeBeforeHead, spawnApples } from "./helpers/snakeHelpers";

const syncScoreInfo = (scoreInfo: ScoreInfo): ScoreInfo => {
    let { currentScore, bestScore } = scoreInfo;
    if (!bestScore || bestScore < currentScore) {
        bestScore = currentScore;
    }
    return { currentScore, bestScore }
}

const nextGameSettings = (settings: GameSettings): GameSettings => {
    let { rowCount, columnCount } = settings;
    if (rowCount < MAX_BOARD_SIZE || columnCount < MAX_BOARD_SIZE) {
        if (rowCount < columnCount) {
            rowCount++;
        }
        else {
            columnCount++;
        }
    }
    return { ...settings, rowCount, columnCount }
}

const tick = (gameState: GameState): GameState => {
    const { snake, rowCount, columnCount, tickDuration, scoreInfo, status } = gameState;
    if (["FINISHED", "PAUSED"].includes(status)) {
        return gameState;
    }

    if (hitWall(snake, rowCount, columnCount) || eatSelf(snake)) {
        return {
            ...gameState,
            status: "FINISHED",
            scoreInfo: syncScoreInfo(scoreInfo),
        }
    }

    let { apples } = gameState;
    let gameSettings: GameSettings = { rowCount, columnCount, tickDuration };
    const nextHead = nextSnakeHead(snake);
    if (eatApple(snake, apples)) {
        apples = apples.filter((coordinate) => !sameCoordinate(nextHead, coordinate))
        if (apples.length === 0) {
            apples = spawnApples(snake, rowCount, columnCount);
        }
        scoreInfo.currentScore++;
        if (scoreInfo.currentScore % 2 === 0) {
            gameSettings = nextGameSettings(gameSettings);
        }
    } else {
        snake.body = snake.body.slice(1);
    }
    snake.body.push({
        coordinate: nextHead,
    });

    augmentSnakeBody(snake.body);

    return {
        ...gameState,
        ...gameSettings,
        snake,
        apples,
        scoreInfo,
    };
}

const changeDirection = (gameState: GameState, payload: { direction: Direction }): GameState => {
    const { snake, status } = gameState;
    if (["FINISHED", "PAUSED"].includes(status)) {
        return gameState;
    }

    const nextHead = nextSnakeHead(snake, payload.direction);
    const beforeHead = snakeBeforeHead(snake);
    const direction = sameCoordinate(nextHead, beforeHead.coordinate) ? snake.direction : payload.direction
    return {
        ...gameState,
        snake: {
            ...snake,
            direction,
        },
        status: status === "NEW" ? "ONGOING" : status,
    };
}

const newGame = (gameState: GameState): GameState => {
    const state = newGameState();
    return {
        ...state,
        scoreInfo: {
            ...gameState.scoreInfo,
            currentScore: 0,
        },
    };
}

const togglePausePlayGame = (gameState: GameState): GameState => {
    const status = gameState.status;
    return {
        ...gameState,
        status: (status === "PAUSED" ? "ONGOING" : (status === "ONGOING" ? "PAUSED" : status)),
    };
}

export const reducer = (gameState: GameState, action: Action): GameState => {
    const state = cloneDeep(gameState);
    switch (action.type) {
        case "tick":
            return tick(state);
        case "changeDirection":
            return changeDirection(state, action.payload);
        case "newGame":
            return newGame(state);
        case "togglePausePlayGame":
            return togglePausePlayGame(state);
        default:
            break;
    }
    return gameState;
}