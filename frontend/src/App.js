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
import UserDashboard from "./pages/UserDashboard";
import styled from "styled-components";
import AppTheme from "./providers/ThemeProvider";
import {CategoryProvider} from "./providers/CategoryProvider";

const AppContainer = styled.div`
  background-color: ${props => props.theme.light};

  display: flex;
  flex-flow: column;
  min-height: 100%;
`

function App() {
    return (
        <AppTheme>
            <Router>
                <UserProvider>
                    <CategoryProvider>
                        <CartContextProvider>
                            <AppContainer>
                                <AppTopBar/>
                                <Container style={{
                                    flex: "1 1 auto"
                                }}>
                                    <Routes>
                                        <Route exact path="/" element={<ProductCatalogPage/>}/>
                                        <Route exact path="/dashboard" element={<UserDashboard/>}/>
                                        <Route exact path="/category" element={<CategoryEditPage/>}/>
                                        <Route exact path="/products" element={<ProductCatalogPage/>}/>
                                        <Route exact path="/products/:productCategory" element={<ProductCatalogPage/>}/>
                                        <Route exact path="/product/:id" element={<ProductPage/>}/>
                                        <Route exact path="/cart" element={<CartPage/>}/>
                                        <Route exact path="/productOrder" element={<ProductOrderListPage/>}/>
                                        <Route exact path="/productOrder/:productOrderId"
                                               element={<ProductOrderDetailsPage/>}/>
                                        <Route path="*" element={<ErrorPage message={"404 not found"}/>}/>
                                    </Routes>
                                </Container>
                                <Footer/>
                            </AppContainer>
                        </CartContextProvider>
                    </CategoryProvider>
                </UserProvider>
            </Router>
        </AppTheme>

    );
}

export default App;
