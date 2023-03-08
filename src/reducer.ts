import { Action, Coordinate, Direction, GameState } from "./types";


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
    return 0 <= rowIndex && rowIndex < rowCount && 0 <= columnIndex && columnIndex <= columnCount;
}

export const reducer = (gameState: GameState, action: Action): GameState => {
    const { snake, rowCount, columnCount } = gameState;
    switch (action.type) {
        case "move":
            const [dr, dc] = directionToOffset(snake.direction);
            const head = snake.body[snake.body.length-1];
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
            return {
                ...gameState,
                snake: {
                    ...snake,
                    body,
                }
            }
        default:
            break;
    }
    return gameState;
}