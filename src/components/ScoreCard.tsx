import { Stack, Typography } from "@mui/material";
import { useGameStateContext } from "../context/GameStateContext";


export const ScoreCard = () => {
    const { gameState } = useGameStateContext();
    const { currentScore, bestScore } = gameState.scoreInfo;

    return (
        <Stack direction="row" sx={{
            alignItems: "center",
            justifyContent: "space-between",
        }}>
            <Typography variant="h6">
                Score: {currentScore}
            </Typography>
            {
                Number.isInteger(bestScore) &&
                <Typography variant="h6">
                    Best: {bestScore}
                </Typography>
            }
        </Stack>
    )
}