import { Fab } from '@mui/material';
import { Stack } from '@mui/system'
import { useEffect, useRef } from 'react';
import { GameBoard } from './components/GameBoard'
import { ScordCard } from './components/ScordCard';
import { useGameStateContext } from './context/GameStateContext';
import AddIcon from '@mui/icons-material/Add';
import { Direction } from './types';

function App() {
  const { gameState, dispatch } = useGameStateContext();
  const { tickDuraction, status } = gameState;
  const documentRef = useRef<Document>(document);

  let interval: number;
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
    if (status === "FINISHED") {
      return;
    }

    switch (event.key) {
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
      <ScordCard />
      <GameBoard />
      <Fab aria-label="add"
          size="medium"
          onClick={handleNewGameClicked}
          sx={{
              bgcolor: "pink",
              position: "absolute",
              bottom: "2rem",
              right: "2rem",
          }}>
          <AddIcon />
      </Fab>
    </Stack>
  )
}

export default App
