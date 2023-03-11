import { Coordinate } from "../types"
import { isInBoard, isInCollection, nextPosition, sameCoordinate } from "./boardHelper"


describe('board helper function', () => {

    test("nextPosition works", () => {
        const coordinate: Coordinate = { rowIndex: 1, columnIndex: 1};

        expect(nextPosition(coordinate, "UP")).toEqual({ rowIndex: 0, columnIndex: 1});
        expect(nextPosition(coordinate, "DOWN")).toEqual({ rowIndex: 2, columnIndex: 1});
        expect(nextPosition(coordinate, "LEFT")).toEqual({ rowIndex: 1, columnIndex: 0});
        expect(nextPosition(coordinate, "RIGHT")).toEqual({ rowIndex: 1, columnIndex: 2});
    })

    test('sameCoordinate works', () => {
        const one: Coordinate = { rowIndex: 0, columnIndex: 0 };
        const two: Coordinate = { rowIndex: 0, columnIndex: 0 };
        const three: Coordinate = { rowIndex: 1, columnIndex: 0 };

        expect(sameCoordinate(one, two)).toBe(true);
        expect(sameCoordinate(one, three)).toBe(false);
    })

    test("isInCollection works", () => {
        const coordinates: Coordinate[] = [
            { rowIndex: 0, columnIndex: 0},
            { rowIndex: 0, columnIndex: 1},
            { rowIndex: 1, columnIndex: 0},
            { rowIndex: 1, columnIndex: 1},
        ];

        expect(isInCollection({ rowIndex: 1, columnIndex: 0 }, coordinates)).toBe(true);
        expect(isInCollection({ rowIndex: 1, columnIndex: 3 }, coordinates)).toBe(false);
    })

    describe("isInBoard", () => {
        test("handles positions on the board", () => {
            expect(isInBoard({ rowIndex: 0, columnIndex: 0 }, 2, 2)).toBe(true);
            expect(isInBoard({ rowIndex: 0, columnIndex: 1 }, 2, 2)).toBe(true);
            expect(isInBoard({ rowIndex: 1, columnIndex: 0 }, 2, 2)).toBe(true);
            expect(isInBoard({ rowIndex: 1, columnIndex: 1 }, 2, 2)).toBe(true);
        })

        test("handles positions out of the board", () => {
            expect(isInBoard({ rowIndex: -1, columnIndex: 0 }, 2, 2)).toBe(false);
            expect(isInBoard({ rowIndex: 2, columnIndex: 1 }, 2, 2)).toBe(false);
            expect(isInBoard({ rowIndex: 1, columnIndex: -1 }, 2, 2)).toBe(false);
            expect(isInBoard({ rowIndex: 1, columnIndex: 2 }, 2, 2)).toBe(false);
        })
    })
})

export {}