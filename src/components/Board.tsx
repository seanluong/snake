import { Stack } from '@mui/system';
import times from 'lodash/times';
import { useGameStateContext } from '../context/GameStateContext';
import { Row } from './board/Row';

const cellSize = "2rem";

export const Board = () => {
    const { gameState } = useGameStateContext();
    const { rowCount, columnCount } = gameState;
    
    const cells = times(rowCount, () => {
        return times(columnCount, () => 0);
    });
    return (
        <Stack direction="column" sx={{
            width: `calc(${cellSize} * ${columnCount})`
        }}>
        {
            cells.map((row, rowIndex) => {
                return <Row key={`row-${rowIndex}`} rowIndex={rowIndex} values={row} />;
            })
        }
        </Stack>
    );
}