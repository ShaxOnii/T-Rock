import {ThemeProvider} from "styled-components";


const AppTheme = ({children}) => {
    const theme = {
        primary: "#fa4a4f",
        primaryDark: "#e9393e",

        secondary: "#383838",
        secondaryDark: "#272727",

        light: "#f2ecff"
    }


    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}
export default AppTheme