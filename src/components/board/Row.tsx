import { Stack } from "@mui/system";
import { Cell } from "./Cell";

interface RowProps {
    rowIndex: number;
    values: number[];
}

const cellSize = "2rem";

export const Row = ({ values, rowIndex }: RowProps) => {
    return (
        <Stack direction="row" sx={{
            flex: `1 1 ${cellSize}`
        }}>
        {
            values.map((_, columnIndex) =>
                <Cell key={`cell-${rowIndex}-${columnIndex}`} rowIndex={rowIndex} columnIndex={columnIndex} />
            )
        }
        </Stack>
    );
}