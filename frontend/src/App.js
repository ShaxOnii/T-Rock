import './App.css';
import AppTopBar from "./components/AppTopBar";
import Footer from "./components/Footer";
import ProductCatalogPage from "./pages/ProductCatalogPage";
import UserProvider from "./providers/UserContextProvider";
import ErrorPage from "./pages/ErrorPage";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import styled from "styled-components";
import {Container} from "reactstrap";

const PageContainer = styled(Container)`
  overflow: hidden;

`


function App() {
    return (
        <UserProvider>
            <Router>
                <AppTopBar/>
                <PageContainer>
                    <Routes>
                        <Route exact path="/" element={<ProductCatalogPage/>}/>
                        <Route path="*" element={<ErrorPage message={"404 not found"}/>}/>
                    </Routes>
                </PageContainer>
                <Footer/>
            </Router>
        </UserProvider>
    );
}

export default App;
