import {useContext, useEffect, useState} from "react";
import ProductListItem from "../components/products/ProductListItem";
import {
    Button,
    FormGroup,
    Label,
} from "reactstrap";
import {userContext} from "../providers/UserContextProvider";
import {useParams} from "react-router-dom";
import {PageContainer, StyledInput} from "../components/Utils";
import {CategoryContext} from "../providers/CategoryProvider";
import CreateEntityModal from "../components/CreateEntityModal";
import AdminToolbar from "../components/AdminToolbar";


const ProductCatalogTopBar = ({invalidatePage}) => {
    const {allCategories} = useContext(CategoryContext);

    const [createProduct, setCreateProduct] = useState(false);

    const [category, setCategory] = useState("");

    const handleCategoryChange = (e) => setCategory(e.target.value)

    const toggleCreateProductModal = () => setCreateProduct(!createProduct)

    return (
        <AdminToolbar>
            <Button onClick={toggleCreateProductModal} color={"success"}>Create product</Button>
            <CreateEntityModal options={{
                toggle: toggleCreateProductModal,
                visible: createProduct,
                title: "Create new product offer",
                url: "Product/create",
                invalidatePage: invalidatePage,
                onEntityCreate: () => {
                    return {category}
                }
            }}>
                <FormGroup>
                    <Label for={"selectCategory"}>Select Category</Label>
                    <StyledInput
                        className="mb-3"
                        type="select"
                        name={"selectCategory"}
                        id={"selectCategory"}
                        onChange={handleCategoryChange}
                        value={category}
                    >
                        <option disabled={true} value="">Select category</option>
                        {allCategories().map((category, key) =>
                            <option key={key} value={category.name}>{category.caption}</option>
                        )}
                    </StyledInput>
                </FormGroup>
            </CreateEntityModal>
        </AdminToolbar>
    )
}

const ProductCatalogPage = () => {
    const {Api} = useContext(userContext)

    const [products, setProducts] = useState([]);

    const {productCategory} = useParams();

    const [refreshComponent, refresh] = useState(false);

    const invalidate = () => {
        refresh(!refreshComponent)
    }

    useEffect(() => {
        const fetchProducts = () => {
            Api(`Product`, {
                queryParams: {
                    category: productCategory
                }
            }).then(([result, ok]) => {
                if (ok) {
                    setProducts(result);
                }
            })
        }

        fetchProducts();
    }, [refreshComponent, productCategory]);


    return (
        <PageContainer>
            <ProductCatalogTopBar invalidatePage={invalidate}/>
            {/*<ProductFilteringTopBar/>*/}
            {
                products.length > 0 ?
                    products.map((product, key) => <ProductListItem key={key} product={product}/>)
                    :
                    <p>There is nothing to show</p>
            }
        </PageContainer>
    );
}

export default ProductCatalogPage;