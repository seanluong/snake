import { Button, SvgIconTypeMap } from "@mui/material";
import { Stack } from "@mui/system";
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useGameStateContext } from "../context/GameStateContext";
import { Direction } from "../types";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type ControlButtonProps = {
    disabled: boolean;
    Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    clickHandler: () => void;
}

const ControlButton = (props: ControlButtonProps) => {
    const { Icon, clickHandler, disabled } = props;
    return <Button variant="contained"
                color="secondary"
                disabled={disabled}
                onClick={clickHandler} >
        { Icon && <Icon /> }
    </Button>
}

export const ControlButtons = () => {
    const { gameState, dispatch } = useGameStateContext();
    const { status } = gameState;

    const handleDirectionClicked = (direction: Direction) => {
        if (direction) {
            dispatch({
                type: "changeDirection",
                payload: {
                  direction
                }
            });
        }
    }
    const handlePausePlayClicked = () => {
        dispatch({
            type: "togglePausePlayGame",
        });
    }

    const directionDisabled = ["PAUSED", "FINISHED"].includes(status);
    const pausePlayDisabled = ["NEW", "FINISHED"].includes(status);
    return (
        <Stack spacing={2} sx={{
            alignItems: "center",
        }}>
            <Stack direction="row">
                <ControlButton Icon={ArrowCircleUpOutlinedIcon}
                            disabled={directionDisabled}
                            clickHandler={() => handleDirectionClicked("UP")} />
            </Stack>
            <Stack direction="row" spacing={2}>
                <ControlButton Icon={ArrowCircleLeftOutlinedIcon}
                            disabled={directionDisabled}
                            clickHandler={() => handleDirectionClicked("LEFT")} />
                <ControlButton Icon={status === "PAUSED" ? PlayArrowIcon : PauseIcon}
                            disabled={pausePlayDisabled}
                            clickHandler={() => handlePausePlayClicked()} />
                <ControlButton Icon={ArrowCircleRightOutlinedIcon}
                            disabled={directionDisabled}
                            clickHandler={() => handleDirectionClicked("RIGHT")} />
            </Stack>
            <Stack direction="row">
                <ControlButton Icon={ArrowCircleDownOutlinedIcon}
                            disabled={directionDisabled}
                            clickHandler={() => handleDirectionClicked("DOWN")} />
            </Stack>
        </Stack>
    );
}