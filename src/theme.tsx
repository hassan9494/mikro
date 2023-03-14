import { createTheme  } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createTheme ({
    typography: {
        "fontFamily": `"Cairo", sans-serif`,
        "fontSize": 14,
        "fontWeightLight": 400,
        "fontWeightRegular": 500,
        "fontWeightMedium": 600
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