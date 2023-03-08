import { Action, Coordinate, Direction, GameState, Snake } from "./types";


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
    return 0 <= rowIndex && rowIndex < rowCount && 0 <= columnIndex && columnIndex < columnCount;
}

const snakeHead = ({ body }: Snake) => body[body.length-1];

const snakeBeforeHead = ({ body }: Snake) => body[body.length-2];

const nextBody = (gameState: GameState): Coordinate[] => {
    const { snake, rowCount, columnCount } = gameState;
    const head = snakeHead(snake);
    const [dr, dc] = directionToOffset(snake.direction);
    const coor = {
        rowIndex: head.rowIndex + dr,
        columnIndex: head.columnIndex + dc,
    }
    let body = [];
    if (isCoordinateInBoard(coor, rowCount, columnCount)) {
        body = snake.body.slice(1);
        body.push(coor);
    } else {
        body = [...snake.body]
    }
    return body;
}

const nextDirection = ({ snake }: GameState, payload: { direction: Direction }): Direction => {
    const head = snakeHead(snake)
    const beforeHead = snakeBeforeHead(snake);
    let { direction } = payload;
    const [dr, dc] = directionToOffset(direction);
    const nextCoor = {
        rowIndex: head.rowIndex + dr,
        columnIndex: head.columnIndex + dc,
    }
    if (nextCoor.rowIndex === beforeHead.rowIndex && nextCoor.columnIndex === beforeHead.columnIndex) {
        return snake.direction;
    }
    return direction;
}

const spawnApples = ({ apples, rowCount, columnCount }: GameState): Coordinate[] => {
    if (apples.length > 0) {
        return [...apples];
    }
    
    const rowIndex = Math.floor(Math.random() * rowCount);
    const columnIndex = Math.floor(Math.random() * columnCount);
    const apple = { rowIndex, columnIndex } as Coordinate;
    return [apple];
}

export const reducer = (gameState: GameState, action: Action): GameState => {
    const { snake } = gameState;
    switch (action.type) {
        case "tick":
            const apples = spawnApples(gameState);
            return {
                ...gameState,
                snake: {
                    ...snake,
                    body: nextBody(gameState),
                },
                apples,
            }
        case "changeDirection":
            return {
                ...gameState,
                snake: {
                    ...snake,
                    direction: nextDirection(gameState, action.payload)
                }
            }
        default:
            break;
    }
    return gameState;
}