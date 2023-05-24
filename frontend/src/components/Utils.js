import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {Container} from "reactstrap";
import {
    faPenToSquare, faClose, faCheck
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const isDevelopment = true;

export const ApplyIcon = () => <FontAwesomeIcon icon={faCheck}/>
export const CloseIcon = () => <FontAwesomeIcon icon={faClose}/>
export const DeleteIcon = () => <FontAwesomeIcon icon={faClose}/>
export const EditIcon = () => <FontAwesomeIcon icon={faPenToSquare}/>

const SimpleLink = styled(NavLink)`
  color: #000;

  font-size: 1.2em;
  letter-spacing: 0.5px;
  text-decoration: none;

  &:first-child {
    padding-left: 0
  }

  &:hover {
    color: #000;
    text-decoration: underline;

  }
`
const ItemImage = styled.div`
  background-image: url(${(p) => p.imageSrc});
  background-size: cover;

  width: 200px;
  height: 200px;
`

const PageContainer = styled(Container)`
  padding-top: 5em;
`

export {SimpleLink, PageContainer, ItemImage}
