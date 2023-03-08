import Paper from '@mui/material/Paper';
import { Stack } from '@mui/system';
import times from 'lodash/times';
import { useGameStateContext } from '../context/GameStateContext';
import { Snake } from '../types';

export interface GameBoardProps {
    rowCount: number;
    columnCount: number;
}

interface RowProps {
    rowIndex: number;
    values: number[];
}

const isDarkCell = (rowIndex: number, columnIndex: number) => (rowIndex + columnIndex) % 2 === 0;

const inSnakeBody = (snake: Snake, rowIndex: number, columnIndex: number) =>
    snake.body.some((coordinate) => coordinate.rowIndex === rowIndex && coordinate.columnIndex === columnIndex);

const Row = ({ values, rowIndex }: RowProps) => {
    const { gameState } = useGameStateContext();

    const { snake } = gameState;

    const bgcolor = (snake: Snake, rowIndex: number, columnIndex: number) => {
        if (inSnakeBody(snake, rowIndex, columnIndex)) {
            return "cyan";
        }
        if (isDarkCell(rowIndex, columnIndex)) {
            return "yellow";
        }
        return "blue";
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
                                bgcolor: bgcolor(snake, rowIndex, columnIndex),
                                borderRadius: 0,
                                width: "2rem",
                            }}>
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
        <Stack direction="column">
        {
            cells.map((row, rowIndex) => {
                return <Row key={`row-${rowIndex}`} rowIndex={rowIndex} values={row} />;
            })
        }
        </Stack>
    );
}