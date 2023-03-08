import { Stack } from '@mui/system'
import { useEffect, useRef } from 'react';
import { GameBoard } from './components/GameBoard'
import { useGameStateContext } from './context/GameStateContext';
import { Direction } from './types';

function App() {
  const tickDuraction = 200;

  const { gameState, dispatch } = useGameStateContext();
  const { rowCount, columnCount } = gameState;
  const documentRef = useRef<Document>(document);

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({
        type: "move"
      });
    }, tickDuraction);

    return () => clearInterval(id)
  }, []);

  const handleKeyDowned = (event: KeyboardEvent) => {
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
    <Stack sx={{
      mt: "5rem"
    }}>
      <GameBoard rowCount={rowCount} columnCount={columnCount} />
    </Stack>
  )
}

export default App
