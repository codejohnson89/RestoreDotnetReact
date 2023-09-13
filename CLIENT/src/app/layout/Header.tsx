import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
    themeChange: () => void;
    darkMode: boolean;
}

export default function Header({ themeChange, darkMode }: Props) {
    return (
        <>
            <AppBar position="static" sx={{ mb: 4}}>
                <Toolbar>
                    <Typography variant="h6">
                        Re-Store
                    </Typography>
                    <Switch checked={darkMode} onChange={themeChange}/>
                </Toolbar>
            </AppBar>
        </>
    )
}