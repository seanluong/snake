import Paper from '@mui/material/Paper';
import { Stack } from '@mui/system';
import times from 'lodash/times';
import { useGameStateContext } from '../context/GameStateContext';
import { Coordinate, Direction, MovementType, Snake, SnakePart } from '../types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircleIcon from '@mui/icons-material/Circle';
import RectangleIcon from '@mui/icons-material/Rectangle';
import ModeNightIcon from '@mui/icons-material/ModeNight';

interface RowProps {
    rowIndex: number;
    values: number[];
}

interface SnakeCellProps {
    snakePart: SnakePart;
    direction: Direction;
}

const SNAKE_COLOR = "black";

const isDarkCell = (rowIndex: number, columnIndex: number) => (rowIndex + columnIndex) % 2 === 0;

const snakePartAt = (rowIndex: number, columnIndex: number, snake: Snake) =>
    snake.body.find((cell) => cell.coordinate.rowIndex === rowIndex && cell.coordinate.columnIndex === columnIndex);

const isApple = (rowIndex: number, columnIndex: number, apples: Coordinate[]) =>
    apples.some((coordinate) => coordinate.rowIndex === rowIndex && coordinate.columnIndex === columnIndex);

const SnakeHead = ({ direction }: { direction: Direction }) => {
    let degree = 0;
    if (direction === "UP") {
        degree = 90;
    } else if (direction === "DOWN") {
        degree = -90;
    } else if (direction === "LEFT") {
        degree = 0;
    } else if (direction === "RIGHT") {
        degree = 180;
    }
    const sx = {
        color: SNAKE_COLOR,
        transform: `rotate(${degree}deg)`
    };
    return <ModeNightIcon sx={{
        ...sx
    }} />
}

const SnakeTail = ({ direction }: { direction: Direction }) => {
    let degree = 0;
    if (direction === "UP") {
        degree = 180;
    } else if (direction === "DOWN") {
        degree = 0;
    } else if (direction === "LEFT") {
        degree = 90;
    } else if (direction === "RIGHT") {
        degree = -90;
    }
    const sx = {
        color: SNAKE_COLOR,
        transform: `rotate(${degree}deg)`
    };
    return <CircleIcon sx={{
        ...sx
    }} />
}

const SnakeMiddle = ({ type }: { type: MovementType }) => {
    let degree = 0;
    if (type === "VERTICAL") {
        degree = 90;
    } else if (type === "HORIZONTAL") {
        degree = 0;
    } else if (type === "BOTTOM_LEFT_TOP_RIGHT") {
        degree = -45;
    } else if (type === "TOP_LEFT_BOTTOM_RIGHT") {
        degree = 45;
    }
    const sx = {
        color: SNAKE_COLOR,
        transform: `rotate(${degree}deg)`
    };
    return <RectangleIcon sx={{
        ...sx
    }} />
}

const SnakeCell = ({ snakePart, direction }: SnakeCellProps) => {
    const  { type, position } = snakePart;

    if (position === "HEAD") {
        return <SnakeHead direction={direction} />
    } 
    
    if (position === "TAIL") {
        return <SnakeTail direction={direction} />
    }
    
    if (type) {
        return <SnakeMiddle type={type} />
    }

    const sx = {
        color: SNAKE_COLOR
    };
    return <CircleIcon sx={sx} />
}

const Row = ({ values, rowIndex }: RowProps) => {
    const { gameState } = useGameStateContext();

    const { snake, apples } = gameState;

    const bgcolor = (rowIndex: number, columnIndex: number) => {
        if (isDarkCell(rowIndex, columnIndex)) {
            return "lightblue";
        }
        return "rgba(0, 0, 0, 0.15)";
    }

    return (
        <Stack direction="row" sx={{
            flex: "1 1 2rem"
        }}>
        {
            values.map((_, columnIndex) => {
                const snakePart = snakePartAt(rowIndex, columnIndex, snake);
                return <Paper key={`column-${columnIndex}`}
                            elevation={2}
                            sx={{
                                flex: "1 1 2rem",
                                bgcolor: bgcolor(rowIndex, columnIndex),
                                borderRadius: 0,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                    { 
                        snakePart &&
                        <SnakeCell snakePart={snakePart} direction={snake.direction} />
                    }
                    {
                        isApple(rowIndex, columnIndex, apples) &&
                        <FavoriteIcon sx={{
                            color: "red"
                        }}/>
                    }
                </Paper>
            })
        }
        </Stack>
    );
}

export const GameBoard = () => {
    const { gameState } = useGameStateContext();
    const { rowCount, columnCount } = gameState;
    
    const cells = times(rowCount, () => {
        return times(columnCount, () => 0);
    });
    return (
        <Stack direction="column" sx={{
            border: "1px solid white",
            width: `calc(2rem * ${columnCount})`
        }}>
        {
            cells.map((row, rowIndex) => {
                return <Row key={`row-${rowIndex}`} rowIndex={rowIndex} values={row} />;
            })
        }
        </Stack>
    );
}