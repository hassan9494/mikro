import { createTheme, adaptV4Theme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance. (adaptV4Theme deprecated — supply theme object directly)
const theme = createTheme({
    typography: {
        fontFamily: `"Cairo", sans-serif`,
        fontSize: 14,
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
    },
    palette: {
        primary: {
            main: '#fe5e00',
        },
        secondary: {
            main: '#133595',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#fff',
        },
    },
});

export default theme;