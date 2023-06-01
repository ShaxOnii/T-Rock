import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {Container, Input, ModalBody, TabContent, ModalFooter, ModalHeader} from "reactstrap";
import {
    faPenToSquare,
    faClose,
    faCheck,
    faShoppingCart,
    faShirt,
    faBagShopping,
    faCartFlatbedSuitcase,
    faFolder,
    faPlus,
    faMinus, faTrash, faImage
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const isDevelopment = true;

export const ApplyIcon = () => <FontAwesomeIcon icon={faCheck}/>
export const CloseIcon = () => <FontAwesomeIcon icon={faClose}/>
export const DeleteIcon = () => <FontAwesomeIcon icon={faClose}/>
export const EditIcon = () => <FontAwesomeIcon icon={faPenToSquare}/>
export const CartIcon = () => <FontAwesomeIcon icon={faShoppingCart}/>
export const CategoryIcon = () => <FontAwesomeIcon icon={faFolder}/>
export const ProductIcon = () => <FontAwesomeIcon icon={faShirt}/>
export const ProductOrderIcon = () => <FontAwesomeIcon icon={faBagShopping}/>
export const CasesIcon = () => <FontAwesomeIcon icon={faCartFlatbedSuitcase}/>
export const PlusIcon = () => <FontAwesomeIcon icon={faPlus}/>
export const MinusIcon = () => <FontAwesomeIcon icon={faMinus}/>
export const ImageEditIcon = () => <FontAwesomeIcon icon={faImage}/>
export const TrashIcon = () => <FontAwesomeIcon icon={faTrash}/>


const SimpleLink = styled(NavLink)`
  color: ${props => props.theme.textLight};

  font-size: 1.2em;
  letter-spacing: 0.5px;
  text-decoration: none;
  user-select: none;
  
  &:hover {
    color: ${props => props.theme.textLight};
    text-decoration: underline;
    cursor: pointer;
  }
`

export const ImageContainer = styled.div`
  padding: 16px;
  height: 300px;
  
  cursor: pointer;
  position: relative;
  
  
  img {
    object-fit: cover;
    height: 100%;
    vertical-align: middle;
  }
`

const PageContainer = styled(Container)`
  padding-top: 10em;
  padding-bottom: 10em;
`

export const StyledInput = styled(Input)`
  background-color: ${props => props.theme.secondaryDark};
  color: ${props => props.theme.textLight};
  border-color: ${props => props.theme.primaryDark};

  &:focus {
    background-color: ${props => props.theme.secondaryDark};
    color: ${props => props.theme.textLight};
    border-color: ${props => props.theme.primaryDark};

    box-shadow: none;
  }
`
export const StyledTabContainer = styled(TabContent)`
    background-color: ${props=>props.theme.secondary};
    color: ${props=>props.theme.textLight};

`

export const StyledNavLink = styled(NavLink)`
    background-color: ${props=>props.active? props.theme.primary : props.theme.secondary};
    color: ${props=>props.theme.textLight};
    border-color: ${props=>props.theme.primary};
    
    &:hover{
        border: none;
    }
`

export const StyledModalBody= styled(ModalBody)`
    background-color: ${props=>props.theme.secondary};
    color: ${props=>props.theme.textLight};

`
export const StyledModalHeader= styled(ModalHeader)`
    background-color: ${props=>props.theme.secondary};
    color: ${props=>props.theme.textLight};

`
export const StyledModalFooter= styled(ModalFooter)`
    background-color: ${props=>props.theme.secondary};
    color: ${props=>props.theme.textLight};

`

export {SimpleLink, PageContainer}
