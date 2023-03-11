import { Paper } from "@mui/material"
import { SnakeCell } from "../SnakeCell"
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Coordinate, Snake } from "../../types";
import { useGameStateContext } from "../../context/GameStateContext";

interface CellProps {
    rowIndex: number;
    columnIndex: number;
}

const cellSize = "2rem";

const isDarkCell = (rowIndex: number, columnIndex: number) => (rowIndex + columnIndex) % 2 === 0;

const snakePartAt = (rowIndex: number, columnIndex: number, snake: Snake) =>
    snake.body.find((cell) => cell.coordinate.rowIndex === rowIndex && cell.coordinate.columnIndex === columnIndex);

const isApple = (rowIndex: number, columnIndex: number, apples: Coordinate[]) =>
    apples.some((coordinate) => coordinate.rowIndex === rowIndex && coordinate.columnIndex === columnIndex);

export const Cell = ({ rowIndex, columnIndex }: CellProps) => {
    const { gameState } = useGameStateContext();
    const { snake, apples } = gameState;

    const bgcolor = (rowIndex: number, columnIndex: number) => {
        if (isDarkCell(rowIndex, columnIndex)) {
            return "lightblue";
        }
        return "rgba(0, 0, 0, 0.15)";
    }
    const snakePart = snakePartAt(rowIndex, columnIndex, snake);
    return (
        <Paper key={`column-${columnIndex}`}
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
    )
}