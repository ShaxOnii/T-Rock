import {EditIcon, PageContainer} from "../components/Utils";
import {useState, useContext} from "react";
import SimpleTable, {field} from "../components/SimpleTable";
import {Button} from "reactstrap";
import styled from "styled-components";
import AdminToolbar from "../components/AdminToolbar";
import CreateEntityModal from "../components/CreateEntityModal";
import {CategoryContext} from "../providers/CategoryProvider";

const ControlButton = styled(Button)`margin-right: 0.5em`

const CategoryEditPage = () => {
    const {allCategories, fetchCategories} = useContext(CategoryContext);

    const [createCategory, setCreateCategory] = useState(false);

    const toggleCreateCategoryModal = () => setCreateCategory(!createCategory)

    const fieldsToShow = [
        field("caption", "Category",
            {
                fieldFormatter: (caption) => <span style={{padding: "1em"}}>
                {caption}
            </span>
            }),
        field("id", "", {
            type: "actions",
            fieldFormatter: (id) => {
                return <ControlButton color={"primary"}><EditIcon/></ControlButton>
            }
        })
    ]

    return (
        <PageContainer>
            <AdminToolbar>
                <Button onClick={toggleCreateCategoryModal} color={"success"}>
                    Create category
                </Button>
                <CreateEntityModal options={{
                    toggle: toggleCreateCategoryModal,
                    visible: createCategory,
                    title: "Create new category",
                    url: "Category/create",
                    invalidatePage: fetchCategories
                }}/>
            </AdminToolbar>
            <SimpleTable fields={fieldsToShow} items={allCategories()}/>
        </PageContainer>
    );
}

export default CategoryEditPage;