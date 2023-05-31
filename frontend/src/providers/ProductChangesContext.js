import {createContext, useContext, useState} from "react";
import {userContext} from "./UserContextProvider";


export const ProductChangesContext = createContext();

export const ProductChangesContextProvider = ({productId, children, updateProduct}) => {
    const {Api} = useContext(userContext);
    const [productChanges, setProductChanges] = useState({});


    const handleProductChange = (field) => (e) => {
        const updatedChanges = {
            ...productChanges,
            [field]: e.target.value
        }

        setProductChanges(updatedChanges)
    }

    const discardChangesFor = (...fields) => {
        const fieldsToStore = Object.keys(productChanges).filter(key => !fields.includes(key))

        let storedChanges = {};
        for (const field of fieldsToStore) {
            storedChanges[field] = productChanges[field];
        }

        setProductChanges(storedChanges)
    }

    const isAnythingToChange = (fields) => {
        const keysIntersection = Object.keys(productChanges).filter(key => fields.includes(key))
        return keysIntersection.length > 0
    }

    const applyChanges = (fields, {onSuccess, onFailure}) => {
        if (!isAnythingToChange(fields)) {
            return
        }

        let body = {};

        if (fields.length > 0) {
            for (const field of fields) {
                body[field] = productChanges[field]
            }
        } else {
            body = productChanges
        }

        Api(`Product/${productId}`, {
            method: "POST",
            body
        }).then(([response, ok]) => {
            if (ok) {
                if (onSuccess) {
                    onSuccess(response)
                }

                if (updateProduct) {
                    updateProduct(response)
                }

                discardChangesFor(...fields)
            } else {
                if (onFailure) onFailure(response)
            }
        })
    }

    const getValueFor = (field) => {
        return productChanges[field]
    }

    const linkImageWithProduct = (imageId) => {
        Api(`Product/${productId}`, {
            method: "POST",
            body: {
                productImages: [imageId]
            }
        }).then(([response, ok]) => {
            if (ok) {
                if (updateProduct) {
                    updateProduct(response)
                }
            }
        })
    }

    const deleteImage = (imageId) => {
        Api(`Image/${imageId}`, {
            method: "DELETE"
        }).then(([, ok]) => {
            if (ok) {
                Api(`Product/${productId}`).then(([result,isOk]) => {
                    if((isOk)){
                        updateProduct(result)
                    }
                })
            }
        })
    }

    return (
        <ProductChangesContext.Provider value={{
            handleProductChange, discardChangesFor, applyChanges, getValueFor, linkImageWithProduct, deleteImage
        }}>
            {children}
        </ProductChangesContext.Provider>
    )
}


