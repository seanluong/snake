import { Coordinate, Direction, MovementType, Snake, SnakePart } from "./types";
import cloneDeep from 'lodash/cloneDeep';
import { Action, GameState } from "./state/types";
import { directionToOffset, isCoordinateInBoard, isCoordinateInCollection, sameCoordinate } from "./helpers/boardHelper";
import { newGameState } from "./state/initializer";


const snakeHead = ({ body }: Snake) => body[body.length-1];

const snakeBeforeHead = ({ body }: Snake) => body[body.length-2];

const spawnApples = (apples: Coordinate[], snakeBody: Coordinate[], rowCount: number, columnCount: number): Coordinate[] => {
    if (apples.length > 0) {
        return apples;
    }
    
    let rowIndex: number;
    let columnIndex: number;
    let apple: Coordinate;
    while (true) {
        rowIndex = Math.floor(Math.random() * rowCount);
        columnIndex = Math.floor(Math.random() * columnCount);
        apple = { rowIndex, columnIndex } as Coordinate;
        if (isCoordinateInCollection(apple, snakeBody) || isCoordinateInCollection(apple, apples)) {
            continue;
        } else {
            break;
        }
    }
    return [apple];
}

const partType = (before: SnakePart, after: SnakePart): MovementType => {
    const rowOffset = before.coordinate.rowIndex - after.coordinate.rowIndex;
    const columnOffset = before.coordinate.columnIndex - after.coordinate.columnIndex;
    if (rowOffset === 0) {
        return "HORIZONTAL";
    } else if (columnOffset === 0) {
        return "VERTICAL";
    } else if (rowOffset * columnOffset > 0) {
        return "TOP_LEFT_BOTTOM_RIGHT";
    } else {
        // rowOffset * columnOffset < 0
        return "BOTTOM_LEFT_TOP_RIGHT";
    }
}

const augmentSnakeBody = (parts: SnakePart[]) => {
    parts.forEach((part, index) => {
        let before: SnakePart;
        let after: SnakePart;
        if (index === 0) {
            // TAIL
            before = parts[index+1];
            part.type = partType(before, part);
            part.position = "TAIL";
        } else if (index === parts.length - 1) {
            // HEAD
            after = parts[index-1];
            part.type = partType(part, after);
            part.position = "HEAD";
        } else {
            before = parts[index+1];
            after = parts[index-1];
            part.type = partType(before, after);
            part.position = "MIDDLE";
        }
    });
}

const tick = (gameState: GameState): GameState => {
    const { snake, rowCount, columnCount, scoreInfo, status } = gameState;
    if (["FINISHED", "PAUSED"].includes(status)) {
        return gameState;
    }

    const head = snakeHead(snake);
    const [dr, dc] = directionToOffset(snake.direction);
    const coor = {
        rowIndex: head.coordinate.rowIndex + dr,
        columnIndex: head.coordinate.columnIndex + dc,
    }

    let { currentScore, bestScore } = scoreInfo;
    const snakeCoors = snake.body.map((cell) => cell.coordinate);
    if (!isCoordinateInBoard(coor, rowCount, columnCount) || isCoordinateInCollection(coor, snakeCoors)) {
        if (!bestScore || bestScore < currentScore) {
            bestScore = currentScore;
        }
        return {
            ...gameState,
            status: "FINISHED",
            scoreInfo: {
                ...scoreInfo,
                bestScore,
            }
        }
    }

    let body = [...snake.body];
    let apples = [...gameState.apples];
    
    if (isCoordinateInCollection(coor, apples)) {
        body.push({
            coordinate: coor,
        });
        apples = apples.filter((coordinate) => !sameCoordinate(coor, coordinate))
        currentScore++;
    } else {
        body = snake.body.slice(1);
        body.push({
            coordinate: coor,
        });
    }
    augmentSnakeBody(body);
    return {
        ...gameState,
        snake: {
            ...snake,
            body,
        },
        apples: spawnApples(apples, snakeCoors, rowCount, columnCount),
        scoreInfo: {
            ...scoreInfo,
            currentScore
        }
    };
}

const changeDirection = (gameState: GameState, payload: { direction: Direction }): GameState => {
    const { snake, status } = gameState;
    if (["FINISHED", "PAUSED"].includes(status)) {
        return gameState;
    }
    
    const head = snakeHead(snake)
    const beforeHead = snakeBeforeHead(snake);
    let { direction } = payload;
    const [dr, dc] = directionToOffset(direction);
    const nextCoor = {
        rowIndex: head.coordinate.rowIndex + dr,
        columnIndex: head.coordinate.columnIndex + dc,
    }
    if (nextCoor.rowIndex === beforeHead.coordinate.rowIndex && nextCoor.columnIndex === beforeHead.coordinate.columnIndex) {
        direction = snake.direction;
    }
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