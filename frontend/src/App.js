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
import CategoryEditPage from './pages/CategoryEditPage';
import CartPage from "./pages/CartPage";
import {CartContextProvider} from "./providers/CartContextProvider";
import ProductOrderDetailsPage from "./pages/ProductOrderingPage";
import ProductOrderListPage from "./pages/ProductOrderListPage";


function App() {
    return (
        <Router>
            <UserProvider>
                <CartContextProvider>
                    <AppTopBar/>
                    <Container>
                        <Routes>
                            <Route exact path="/category" element={<CategoryEditPage/>}/>
                            <Route exact path="/" element={<ProductCatalogPage/>}/>
                            <Route exact path="/products" element={<ProductCatalogPage/>}/>
                            <Route exact path="/products/:productCategory" element={<ProductCatalogPage/>}/>
                            <Route exact path="/product/:id" element={<ProductPage/>}/>
                            <Route exact path="/cart" element={<CartPage/>}/>
                            <Route exact path="/productOrder" element={<ProductOrderListPage/>}/>
                            <Route exact path="/productOrder/:productOrderId" element={<ProductOrderDetailsPage/>}/>
                            <Route path="*" element={<ErrorPage message={"404 not found"}/>}/>
                        </Routes>
                    </Container>
                    <Footer/>
                </CartContextProvider>
            </UserProvider>
        </Router>

    );
}

export default App;
