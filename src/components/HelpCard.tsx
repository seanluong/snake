import { List, ListItem, ListItemText, Paper } from "@mui/material";
import KeyboardIcon from '@mui/icons-material/Keyboard';

const HelpCard = () => {
    return (
        <Paper sx={{
                bgcolor: "rgb(100, 220, 250)"
            }}>
            <List dense={true}>
                <ListItem>
                    <ListItemText primary={<KeyboardIcon />}  sx={{ textAlign: "center" }} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Arrow Keys" />
                    <ListItemText primary="Move the Snake" sx={{ textAlign: "right" }}/>
                </ListItem>
                <ListItem>
                    <ListItemText primary="N"/>
                    <ListItemText primary="New Game" sx={{ textAlign: "right" }}/>
                </ListItem>
                <ListItem>
                    <ListItemText primary="P"/>
                    <ListItemText primary="Pause / Resume Game" sx={{ textAlign: "right" }}/>
                </ListItem>
            </List>
        </Paper>
    );
}

export { HelpCard };