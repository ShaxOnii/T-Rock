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
import {Container} from "reactstrap";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";


function App() {
    return (
        <UserProvider>
            <Router>
                <AppTopBar/>
                <Container>
                    <Routes>
                        <Route exact path="/" element={<ProductCatalogPage/>}/>
                        <Route exact path="/products" element={<ProductCatalogPage/>}/>
                        <Route exact path="/products/:productCategory" element={<ProductCatalogPage/>}/>
                        <Route exact path="/product/:id" element={<ProductPage/>}/>
                        <Route exact path="/cart" element={<CartPage/>}/>
                        <Route path="*" element={<ErrorPage message={"404 not found"}/>}/>
                    </Routes>
                </Container>
                <Footer/>
            </Router>
        </UserProvider>
    );
}

export default App;
