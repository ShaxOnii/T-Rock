import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {Container, Input} from "reactstrap";
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
    faMinus
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
const ItemImage = styled.div`
  background-image: url(${(p) => p.imageSrc});
  background-size: cover;

  width: 200px;
  height: 200px;
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


export {SimpleLink, PageContainer, ItemImage}
