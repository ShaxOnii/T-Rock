import styled from "styled-components";
import {Col, Row} from "reactstrap";
import {ADMIN_ROLE, VisibleToRoles} from "../providers/UserContextProvider";


const AdminToolbarContainer = styled(Row)`
  background-color: ${props => props.theme.secondary};
  color: ${props => props.theme.textLight};

  margin-bottom: 1em;
  
  padding: 1em;
`

const AdminToolbar = ({children}) => {

    return (
        <VisibleToRoles roles={[ADMIN_ROLE]}>
            <AdminToolbarContainer>
                <Col>
                    {children}
                </Col>
            </AdminToolbarContainer>
        </VisibleToRoles>
    )
}

export default AdminToolbar;