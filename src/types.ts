export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export type MovementType = "VERTICAL" | "HORIZONTAL" | "TOP_LEFT_BOTTOM_RIGHT" | "BOTTOM_LEFT_TOP_RIGHT";

export interface SnakePart {
    coordinate: Coordinate;
    type?: MovementType;
    position?: "HEAD" | "TAIL" | "MIDDLE";
}

export interface Coordinate {
    rowIndex: number;
    columnIndex: number;
}
  
export interface Snake {
    body: SnakePart[];
    direction: Direction;
}
