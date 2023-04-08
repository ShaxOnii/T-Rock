import {useEffect, useState} from "react";
import ProductListItem from "../components/products/ProductListItem";
import {Container} from "reactstrap";

const ProductCatalogPage = () => {

    const [products, setProducts] = useState([]);

    const genFakeProducts = () => {
        let mocked = []

        for (let i = 0; i < 10; i++) {
            mocked.push({
                id: i,
                name: `MockedProduct${i}`,
                caption: `Mocked product ${i}`,
                price: i * 10,
                description: "An example product"
            })
        }

        return mocked;
    }

    const fetchProducts = () => {
        return genFakeProducts();

    }

    useEffect(() => {
        setProducts(fetchProducts());
    }, []);


    return (
        <Container>
            {
                products.length > 0 ?
                    products.map(product => <ProductListItem product={product}/>)
                    :
                    <p>There is nothing to show</p>
            }
        </Container>
    );
}

export default ProductCatalogPage;