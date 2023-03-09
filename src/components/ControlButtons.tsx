import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useGameStateContext } from "../context/GameStateContext";
import { Direction } from "../types";

const ControlButton = (props: { direction: Direction }) => {
    const { direction } = props;
    const { gameState, dispatch } = useGameStateContext();

    const handleButtonClicked = (direction: Direction) => {
        dispatch({
            type: "changeDirection",
            payload: {
              direction
            }
        });
    }

    let icon;
    if (direction === "UP") {
        icon = <ArrowCircleUpOutlinedIcon />;
    } else if (direction === "DOWN") {
        icon = <ArrowCircleDownOutlinedIcon />;
    } else if (direction === "LEFT") {
        icon = <ArrowCircleLeftOutlinedIcon />;
    } else {
        // RIGHT
        icon = <ArrowCircleRightOutlinedIcon />;
    }
    const disabled = gameState.status === "FINISHED";
    return <Button variant="contained"
                color="secondary"
                disabled={disabled}
                onClick={() => handleButtonClicked(direction)} >
        {icon}
    </Button>
}

export const ControlButtons = () => {
    return (
        <Stack spacing={2} sx={{
            alignItems: "center",
        }}>
            <Stack direction="row">
                <ControlButton direction={"UP"} />
            </Stack>
            <Stack direction="row" spacing={9}>
                <ControlButton direction={"LEFT"} />
                <ControlButton direction={"RIGHT"} />
            </Stack>
            <Stack direction="row">
                <ControlButton direction={"DOWN"} />
            </Stack>
        </Stack>
    );
}