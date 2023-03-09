import { Direction, MovementType, SnakePart } from "../types";
import CircleIcon from '@mui/icons-material/Circle';
import RectangleIcon from '@mui/icons-material/Rectangle';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { useGameStateContext } from "../context/GameStateContext";

const SNAKE_COLOR = "black";
const SX = {
    color: SNAKE_COLOR,
    width: "60%",
    height: "60%",
};

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
    return <ModeNightIcon sx={{
        ...SX,
        transform: `rotate(${degree}deg)`,
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
    return <CircleIcon sx={{
        ...SX,
        transform: `rotate(${degree}deg)`,
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
    return <RectangleIcon sx={{
        ...SX,
        transform: `rotate(${degree}deg)`,
    }} />
}



export const SnakeCell = ({ snakePart }: { snakePart: SnakePart }) => {
    const { gameState } = useGameStateContext();
    const { direction } = gameState.snake;
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

    return <CircleIcon sx={SX}/>;
}