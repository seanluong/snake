import { Fab } from '@mui/material';
import { Stack } from '@mui/system'
import { useEffect, useRef } from 'react';
import { Board } from './components/Board'
import { ScoreCard } from './components/ScoreCard';
import { useGameStateContext } from './context/GameStateContext';
import AddIcon from '@mui/icons-material/Add';
import { Direction } from './types';
import { ControlButtons } from './components/ControlButtons';
import { HelpCard } from './components/HelpCard';
import { isBrowser, isMobile } from 'react-device-detect';

function App() {
  const { gameState, dispatch } = useGameStateContext();
  const { tickDuraction, status } = gameState;
  const documentRef = useRef<Document>(document);

  let interval: string | number | NodeJS.Timeout | undefined;
  useEffect(() => {
    if (status === "ONGOING" && !interval) {
      interval = setInterval(() => {
        dispatch({
          type: "tick"
        });
      }, tickDuraction);
    }

    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (documentRef.current) {
      const document = documentRef.current;
      document.addEventListener('keydown', handleKeyDowned);
      return () => {
        document.removeEventListener('keydown', handleKeyDowned)
      }
    }
  }, [documentRef, status]);

  const handleKeyDowned = (event: KeyboardEvent) => {
    switch (event.code) {
      case "ArrowUp":
      case "ArrowDown":
      case "ArrowLeft":
      case "ArrowRight":
        const direction = event.key.slice("Arrow".length).toUpperCase() as Direction;
        dispatch({
          type: "changeDirection",
          payload: {
            direction
          }
        })
        return;
      case "KeyN":
        dispatch({
          type: "newGame"
        });
      case "KeyP":
        dispatch({
          type: "togglePausePlayGame"
        });
      default:
        break;
    }
  }
  const handleNewGameClicked = (event: React.MouseEvent) => {
    dispatch({
      type: "newGame",
    });
  }

  return (
    <Stack spacing={2} sx={{
      mt: "5rem",
    }}>
      <ScoreCard />
      <Board />
      <Fab aria-label="add"
          size="medium"
          onClick={handleNewGameClicked}
          color="primary"
          sx={{
              position: "absolute",
              bottom: "2rem",
              right: "2rem",
          }}>
          <AddIcon />
      </Fab>
      { isMobile && <ControlButtons /> }
      { isBrowser && <HelpCard /> }
    </Stack>
  )
}

export default App
