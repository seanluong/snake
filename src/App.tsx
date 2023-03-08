import { Stack } from '@mui/system'
import { useEffect } from 'react';
import { GameBoard } from './components/GameBoard'
import { useGameStateContext } from './context/GameStateContext';

function App() {
  const tickDuraction = 500;

  const { gameState, dispatch } = useGameStateContext();
  const { rowCount, columnCount } = gameState;

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({
        type: "move"
      });
    }, tickDuraction);

    return () => clearInterval(id)
  }, []);

  return (
    <Stack sx={{
      mt: "5rem"
    }}>
      <GameBoard rowCount={rowCount} columnCount={columnCount} />
    </Stack>
  )
}

export default App
