import {useContext, useEffect, useState} from "react";
import {PageContainer, SimpleLink} from "../components/Utils";
import SimpleTable, {field} from "../components/SimpleTable";
import {userContext} from "../providers/UserContextProvider";
import ProductOrderStateBadge from "../components/ProductOrderStateBadge";
import {format} from "date-fns";


const ProductOrderListPage = () => {
    const {Api} = useContext(userContext);
    const [allProductsOrders, setAllProductsOrders] = useState([])

    useEffect(() => {
        Api("ProductOrder").then(([response, isOk]) => {
            if (isOk) {
                setAllProductsOrders(response)
            }
        })
    }, [Api])

    const fieldsToShow = [
        field("id", "Product order", {
            fieldFormatter: (id) => <SimpleLink to={`/productOrder/${id}`}>Order#{id}</SimpleLink>
        }),
        field("state", "State", {
            fieldFormatter: (state) => <ProductOrderStateBadge state={state}/>
        }),
        field("creationDate", "Created", {
            fieldFormatter: (date) => format(new Date(date), "ii.MM.yyyy HH:mm"),
        })
    ];

    return (
        <PageContainer>
            <SimpleTable items={allProductsOrders} fields={fieldsToShow}/>
        </PageContainer>
    )
}

export default ProductOrderListPage;





