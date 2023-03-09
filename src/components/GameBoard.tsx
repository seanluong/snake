import Paper from '@mui/material/Paper';
import { Stack } from '@mui/system';
import times from 'lodash/times';
import { useGameStateContext } from '../context/GameStateContext';
import { Coordinate, Snake } from '../types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { SnakeCell } from './SnakeCell';

interface RowProps {
    rowIndex: number;
    values: number[];
}

const cellSize = "2rem";

const isDarkCell = (rowIndex: number, columnIndex: number) => (rowIndex + columnIndex) % 2 === 0;

const snakePartAt = (rowIndex: number, columnIndex: number, snake: Snake) =>
    snake.body.find((cell) => cell.coordinate.rowIndex === rowIndex && cell.coordinate.columnIndex === columnIndex);

const isApple = (rowIndex: number, columnIndex: number, apples: Coordinate[]) =>
    apples.some((coordinate) => coordinate.rowIndex === rowIndex && coordinate.columnIndex === columnIndex);

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
            flex: `1 1 ${cellSize}`
        }}>
        {
            values.map((_, columnIndex) => {
                const snakePart = snakePartAt(rowIndex, columnIndex, snake);
                return <Paper key={`column-${columnIndex}`}
                            elevation={2}
                            sx={{
                                flex: `1 1 ${cellSize}`,
                                bgcolor: bgcolor(rowIndex, columnIndex),
                                borderRadius: 0,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                    { 
                        snakePart &&
                        <SnakeCell snakePart={snakePart} />
                    }
                    {
                        isApple(rowIndex, columnIndex, apples) &&
                        <FavoriteIcon sx={{
                            color: "red",
                            width: "60%",
                            height: "60%",
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
            width: `calc(${cellSize} * ${columnCount})`
        }}>
        {
            cells.map((row, rowIndex) => {
                return <Row key={`row-${rowIndex}`} rowIndex={rowIndex} values={row} />;
            })
        }
        </Stack>
    );
}