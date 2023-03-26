import './App.css';
import {Container, styled} from "@mui/material";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import UserProvider from "./providers/UserContextProvider";
import ErrorPage from "./pages/ErrorPage";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

const PageContainer = styled(Container)`


`


function App() {
    return (
        <UserProvider>
            <Menu/>
            <PageContainer>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<HomePage/>}/>
                        <Route path="*" element={<ErrorPage message={"404 not found"}/>}/>
                    </Routes>
                </Router>
            </PageContainer>
            <Footer/>
        </UserProvider>
    );
}

export default App;
