import Paper from '@mui/material/Paper';
import { Stack } from '@mui/system';
import times from 'lodash/times';
import { useGameStateContext } from '../context/GameStateContext';
import { Coordinate, GameState, Snake } from '../types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircleIcon from '@mui/icons-material/Circle';
import Brightness2Icon from '@mui/icons-material/Brightness2';

export interface GameBoardProps {
    rowCount: number;
    columnCount: number;
}

interface RowProps {
    rowIndex: number;
    values: number[];
}

interface SnakeCellProps {
    // rowIndex: number;
    // columnIndex: number;
    // position: "HEAD" | "TAIL" | "BODY";
    // type: string;
}

const isDarkCell = (rowIndex: number, columnIndex: number) => (rowIndex + columnIndex) % 2 === 0;

const isSnakeBody = (rowIndex: number, columnIndex: number, snake: Snake) =>
    snake.body.some((coordinate) => coordinate.rowIndex === rowIndex && coordinate.columnIndex === columnIndex);

const isApple = (rowIndex: number, columnIndex: number, apples: Coordinate[]) =>
    apples.some((coordinate) => coordinate.rowIndex === rowIndex && coordinate.columnIndex === columnIndex);

const SnakeCell = (props: SnakeCellProps) => {

    return <CircleIcon sx={{
        color: "purple"
    }}/>
}

const Row = ({ values, rowIndex }: RowProps) => {
    const { gameState } = useGameStateContext();

    const { snake, apples } = gameState;

    const bgcolor = (gameState: GameState, rowIndex: number, columnIndex: number) => {
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
            values.map((value, columnIndex) => {
                const dark = isDarkCell(rowIndex, columnIndex);
                return <Paper key={`column-${columnIndex}`}
                            elevation={2}
                            sx={{
                                flex: "1 1 2rem",
                                bgcolor: bgcolor(gameState, rowIndex, columnIndex),
                                borderRadius: 0,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                    { 
                        isSnakeBody(rowIndex, columnIndex, snake) &&
                        <SnakeCell />
                    }
                    {
                        isApple(rowIndex, columnIndex, apples) &&
                        <FavoriteIcon sx={{
                            color: "purple"
                        }}/>
                    }
                </Paper>
            })
        }
        </Stack>
    );
}

export const GameBoard = (props: GameBoardProps) => {
    const { rowCount, columnCount } = props;
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