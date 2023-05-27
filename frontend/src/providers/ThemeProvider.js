import {ThemeProvider} from "styled-components";


const AppTheme = ({children}) => {
    const theme = {
        primary: "#fa4a4f",
        primaryDark: "#e9393e",

        secondary: "#383838",
        secondaryDark: "#272727",

        light: "#f5f5f5",
        lightDarker: "#e4e4e4",

        textLight: "#f6f6f6",
        textDark: "#f6f6f6",
    }


    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}
export default AppTheme