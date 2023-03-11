import { Coordinate, Direction } from "../types";


const sameCoordinate = (lhs: Coordinate, rhs: Coordinate) =>
    lhs.columnIndex === rhs.columnIndex && lhs.rowIndex === rhs.rowIndex;

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

const nextPosition = (coordinate: Coordinate, direction: Direction): Coordinate => {
    const [dr, dc] = directionToOffset(direction);
    return {
        rowIndex: coordinate.rowIndex + dr,
        columnIndex: coordinate.columnIndex + dc,
    }
}

const isInBoard = (coordinate: Coordinate, rowCount: number, columnCount: number) => {
    const { rowIndex, columnIndex } = coordinate;
    return 0 <= rowIndex && rowIndex < rowCount && 0 <= columnIndex && columnIndex < columnCount;
}

const isInCollection = (coordinate: Coordinate, collection: Coordinate[]) => 
    collection.some((element) => sameCoordinate(coordinate, element))

export {
    isInBoard,
    isInCollection,
    nextPosition,
    sameCoordinate,
}