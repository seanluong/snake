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

const spawnApples = (apples: Coordinate[], snakeBody: Coordinate[], rowCount: number, columnCount: number): Coordinate[] => {
    if (apples.length > 0) {
        return [...apples];
    }
    
    let rowIndex: number;
    let columnIndex: number;
    while (true) {
        rowIndex = Math.floor(Math.random() * rowCount);
        columnIndex = Math.floor(Math.random() * columnCount);
        if (snakeBody.some((coordinate) => sameCoordinate(coordinate, { rowIndex, columnIndex }))) {
            continue;
        } else {
            break;
        }
    }
    const apple = { rowIndex, columnIndex } as Coordinate;
    return [apple];
}

const sameCoordinate = (lhs: Coordinate, rhs: Coordinate) =>
    lhs.columnIndex === rhs.columnIndex && lhs.rowIndex === rhs.rowIndex;

const tick = (gameState: GameState): GameState => {
    const { snake, rowCount, columnCount } = gameState;
    const head = snakeHead(snake);
    const [dr, dc] = directionToOffset(snake.direction);
    const coor = {
        rowIndex: head.rowIndex + dr,
        columnIndex: head.columnIndex + dc,
    }
    let body = [];
    let apples = [] as Coordinate[];
    if (isCoordinateInBoard(coor, rowCount, columnCount)) {
        let consumedApple = false;
        for (let apple of gameState.apples) {
            if (sameCoordinate(coor, apple)) {
                consumedApple = true;
            } else {
                apples.push(apple);
            }
        }
        body = consumedApple ? [...snake.body] : snake.body.slice(1);
        body.push(coor);
    } else {
        body = [...snake.body];
        apples = [...gameState.apples];
    }

    return {
        ...gameState,
        snake: {
            ...snake,
            body,
        },
        apples: spawnApples(apples, body, rowCount, columnCount),
    };
}

const changeDirection = (gameState: GameState, payload: { direction: Direction }): GameState => {
    const { snake } = gameState;
    const head = snakeHead(snake)
    const beforeHead = snakeBeforeHead(snake);
    let { direction } = payload;
    const [dr, dc] = directionToOffset(direction);
    const nextCoor = {
        rowIndex: head.rowIndex + dr,
        columnIndex: head.columnIndex + dc,
    }
    if (nextCoor.rowIndex === beforeHead.rowIndex && nextCoor.columnIndex === beforeHead.columnIndex) {
        direction = snake.direction;
    }
    return {
        ...gameState,
        snake: {
            ...snake,
            direction,
        }
    };
}

export const reducer = (gameState: GameState, action: Action): GameState => {
    const { snake } = gameState;
    switch (action.type) {
        case "tick":
            return tick(gameState);
        case "changeDirection":
            return changeDirection(gameState, action.payload);
        default:
            break;
    }
    return gameState;
}