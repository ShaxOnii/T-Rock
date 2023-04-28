import { useEffect } from "react"
import { PageContainer } from "../components/Utils";
import { Col, Row } from "reactstrap";
import { useState, useContext  } from "react";
import { userContext } from "../providers/UserContextProvider";
import { EditButton } from "./ProductPage";

const CategoryEditPage = () => {

    const { Api } = useContext(userContext);
    const [categories, setCategories] = useState([]);



    useEffect(() => {
        Api('Category').then(([result,ok]) => {
            if (ok) {
                setCategories(result);
            } else {
                throw Error("An error occured", result);
            }
        })
    },[]);



    return (
        <PageContainer>
                <Row>
                    <Col>
                        {
                            categories.map((category, idx) => 
                                <Row>
                                    <Col>
                                        {
                                            category.caption 
                                        }
                                        <EditButton onClick/>
                                    </Col>
                                    
                                </Row>
                            )
                        }
                    </Col>
                </Row>
        </PageContainer>
    );
}

export default CategoryEditPage;