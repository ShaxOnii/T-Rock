import {useEffect, useState} from "react";
import ProductListItem from "../components/products/ProductListItem";
import {Container} from "reactstrap";

const ProductCatalogTopBar = () => {

    return (
        <>Top bar for admin actions</>
    )
}


const ProductCatalogPage = () => {

    const [products, setProducts] = useState([]);

    const genFakeProducts = () => {
        let mocked = []

        for (let i = 0; i < 10; i++) {
            mocked.push({
                id: i,
                name: `MockedProduct${i}`,
                caption: `Lorem ipsum dolor sit amet, consectetur adipiscing elit ${i}`,
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
        <Container style={{
            paddingTop: "2em"
        }}>
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