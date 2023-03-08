import { Stack } from '@mui/system'
import { GameBoard } from './components/GameBoard'

function App() {
  const rowCount = 10;
  const columnCount = 10;

  return (
    <Stack sx={{
      mt: "5rem"
    }}>
      <GameBoard rowCount={rowCount} columnCount={columnCount} />
    </Stack>
  )
}

export default App
