import { Coordinate, Snake, SnakePart } from "../types"
import { eatApple, eatSelf, hitWall } from "./snakeHelpers";


describe('snake helper function', () => {
    const head: Coordinate = {
        rowIndex: 0,
        columnIndex: 1,
    };
    const tail: Coordinate = {
        rowIndex: 0,
        columnIndex: 0,
    }
    const direction = "RIGHT";

    let snake: Snake;

    beforeEach(() => {
        snake = {
            body: [
                { coordinate: tail, position: "TAIL" },
                { coordinate: head, position: "HEAD" }
            ],
            direction,
        };
    })
    
    test("eatApple works", () => {
        const apples: Coordinate[] = [
            { rowIndex: 1, columnIndex: 1}
        ];

        expect(eatApple(snake, apples)).toBe(false);

        snake.direction = "DOWN";
        expect(eatApple(snake, apples)).toBe(true);
    })

    test("hitWall works", () => {
        expect(hitWall(snake, 4, 4)).toBe(false);

        snake.body[1].coordinate = {
            rowIndex: 0,
            columnIndex: 3
        }
        expect(hitWall(snake, 4, 4)).toBe(true);

        snake.direction = "UP";
        expect(hitWall(snake, 4, 4)).toBe(true);

        snake.direction = "LEFT";
        snake.body[1].coordinate = {
            rowIndex: 1,
            columnIndex: 0
        }
        expect(hitWall(snake, 4, 4)).toBe(true);

        snake.direction = "DOWN";
        snake.body[1].coordinate = {
            rowIndex: 3,
            columnIndex: 0
        }
        expect(hitWall(snake, 4, 4)).toBe(true);
    })

    test("eatSelf works", () => {
        expect(eatSelf(snake)).toBe(false);

        snake.direction = "LEFT";
        expect(eatSelf(snake)).toBe(true);
    })
})

export {}