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

const snakePartAt = (rowIndex: number, columnIndex: number, snake: Snake) =>
    snake.body.find((cell) => cell.coordinate.rowIndex === rowIndex && cell.coordinate.columnIndex === columnIndex);

const isApple = (rowIndex: number, columnIndex: number, apples: Coordinate[]) =>
    apples.some((coordinate) => coordinate.rowIndex === rowIndex && coordinate.columnIndex === columnIndex);

export const Cell = ({ rowIndex, columnIndex }: CellProps) => {
    const { gameState } = useGameStateContext();
    const { snake, apples } = gameState;

    const snakePart = snakePartAt(rowIndex, columnIndex, snake);
    const apple = isApple(rowIndex, columnIndex, apples);
    return (
        <Paper key={`column-${columnIndex}`}
            elevation={2}
            sx={{
                flex: `1 1 ${cellSize}`,
                bgcolor: "lightblue",
                border: "1px solid purple",
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
                apple &&
                <FavoriteIcon sx={{
                    color: "blue",
                    width: "60%",
                    height: "60%",
                }}/>
            }
        </Paper>
    )
}