import { Stack } from '@mui/system'
import { useEffect, useRef } from 'react';
import { GameBoard } from './components/GameBoard'
import { ScordCard } from './components/ScordCard';
import { useGameStateContext } from './context/GameStateContext';
import { Direction } from './types';

function App() {
  const { gameState, dispatch } = useGameStateContext();
  const { tickDuraction, status } = gameState;
  const documentRef = useRef<Document>(document);

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({
        type: "tick"
      });
    }, tickDuraction);

    return () => clearInterval(id)
  }, []);

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

  useEffect(() => {
    if (documentRef.current) {
      const document = documentRef.current;
      document.addEventListener('keydown', handleKeyDowned);

      return () => {
        document.removeEventListener('keydown', handleKeyDowned)
      }
    }
  }, [documentRef])

  return (
    <Stack spacing={2} sx={{
      mt: "5rem",
    }}>
      <ScordCard />
      <GameBoard />
    </Stack>
  )
}

export default App
