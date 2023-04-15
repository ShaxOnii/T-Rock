import {useContext, useEffect, useState} from "react";
import {userContext} from "../providers/UserContextProvider";
import {useParams} from "react-router-dom";


const ProductPage = ({message}) => {
    const {Api} = useContext(userContext);

    const {id} = useParams();

    const [product, setProduct] = useState(undefined);

    useEffect(() => {
        Api(`Products/${id}`).then(([result, ok]) => {
            if(ok){
                setProduct(result);
            }else{
                throw Error("An error occured", result);
            }
        })
    });

    return (
        <div>
            {message}
        </div>
    );
}

export default ProductPage;
