import { Coordinate, Direction, MovementType, Snake, SnakePart } from "../types";
import { isInBoard, isInCollection, nextPosition, sameCoordinate } from "./boardHelper";


const snakeHead = ({ body }: Snake) => body[body.length-1];

const nextSnakeHead = (snake: Snake, direction?: Direction) => {
    const head = snakeHead(snake);
    return nextPosition(head.coordinate, direction || snake.direction);
}

const snakeBeforeHead = ({ body }: Snake) => body[body.length-2];

const isInSnake = (coordinate: Coordinate, snake: Snake) =>
    isInCollection(coordinate, snake.body.map((part) => part.coordinate));

const hitWall = (snake: Snake, rowCount: number, columnCount: number) => {
    const nextHead = nextSnakeHead(snake);
    return !isInBoard(nextHead, rowCount, columnCount);
}

const eatSelf = (snake: Snake) => {
    const nextHead = nextSnakeHead(snake);
    return isInSnake(nextHead, snake);
}

const eatApple = (snake: Snake, apples: Coordinate[]) => {
    const nextHead = nextSnakeHead(snake);
    return isInCollection(nextHead, apples);
}

const snakeForward = (snake: Snake) => {
    snake.body = snake.body.slice(1);
    const nextHead = nextSnakeHead(snake);
    snake.body.push({
        coordinate: nextHead,
    });
    augmentSnakeBody(snake.body);
}

const snakeGrow = (snake: Snake, apples: Coordinate[]): Coordinate[] => {
    const nextHead = nextSnakeHead(snake);
    snake.body.push({
        coordinate: nextHead,
    });
    augmentSnakeBody(snake.body);
    return apples.filter((coordinate) => !sameCoordinate(nextHead, coordinate));
}

const spawnApples = (snake: Snake, rowCount: number, columnCount: number): Coordinate[] => {
    let rowIndex: number;
    let columnIndex: number;
    let apple: Coordinate;
    while (true) {
        rowIndex = Math.floor(Math.random() * rowCount);
        columnIndex = Math.floor(Math.random() * columnCount);
        apple = { rowIndex, columnIndex } as Coordinate;
        if (!isInSnake(apple, snake)) {
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

export {
    eatApple,
    eatSelf,
    hitWall,
    nextSnakeHead,
    snakeBeforeHead,
    snakeForward,
    snakeGrow,
    spawnApples
}