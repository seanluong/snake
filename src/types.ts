export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export interface Coordinate {
    rowIndex: number;
    columnIndex: number;
}
  
export interface Snake {
    body: Coordinate[];
    direction: Direction;
}

export interface GameState {
    snake: Snake;
    rowCount: number;
    columnCount: number;
}

export type Action =
 | { type: 'move' };