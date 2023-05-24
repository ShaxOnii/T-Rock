import {useEffect} from "react"
import {DeleteIcon, EditIcon, PageContainer} from "../components/Utils";
import {useState, useContext} from "react";
import {userContext} from "../providers/UserContextProvider";
import SimpleTable, {field} from "../components/SimpleTable";
import {Button} from "reactstrap";
import styled from "styled-components";

const ControlButton = styled(Button)`margin-right: 0.5em`

const CategoryEditPage = () => {

    const {Api} = useContext(userContext);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        Api('Category').then(([result, ok]) => {
            if (ok) {
                setCategories(result);
            } else {
                throw Error("An error occured", result);
            }
        })
    }, [Api]);

    const fieldsToShow = [
        field("caption", "Category"),
        field("id", "", {
            type: "actions",
            fieldFormatter: (id) => {
                return <>
                    <ControlButton color={"primary"}><EditIcon/></ControlButton>
                    <ControlButton color={"danger"}><DeleteIcon/></ControlButton>
                </>
            }
        })
    ]

    return (
        <PageContainer>
            <SimpleTable fields={fieldsToShow} items={categories}/>
        </PageContainer>
    );
}

export default CategoryEditPage;