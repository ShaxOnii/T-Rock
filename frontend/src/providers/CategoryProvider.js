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

    const categoryOrderingByCaption = (c1, c2) => {
        return c1.caption.localeCompare(c2.caption);
    }

    const allCategories = () => {
        if (categories) {
            return categories.toSorted(categoryOrderingByCaption);
        }

        return [];
    }

    return (
        <CategoryContext.Provider value={{
            fetchCategories, allCategories
        }}>
            {children}
        </CategoryContext.Provider>
    )
}

