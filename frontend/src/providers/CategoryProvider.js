import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {userContext} from "./UserContextProvider";

export const CategoryContext = createContext();

export const CategoryProvider = ({children}) => {
    const {Api} = useContext(userContext)

    const [categories, setCategories] = useState();

    const fetchCategories = useCallback(() => {
        Api(`Category`).then(([result, ok]) => {
            if (ok) {
                setCategories(result);
            } else {
                throw Error("An error occured", result);
            }
        })
    }, [Api])

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const allCategories = () => {
        return categories ?? [];
    }

    const addCategory = (category) => {


        fetchCategories()
    }


    return (
        <CategoryContext.Provider value={{
            fetchCategories, allCategories, addCategory
        }}>
            {children}
        </CategoryContext.Provider>
    )
}

