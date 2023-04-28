import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faEarthEurope, faEnvelope, faPhone, faPrint } from "@fortawesome/free-solid-svg-icons";
import { Col } from "reactstrap";
import styled from 'styled-components';


const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 
  minmax(185px, 1fr));
  grid-gap: 20px;
   
  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, 
    minmax(200px, 1fr));
  }
`;

const Box = styled.div`
  margin: 5em 0 0 0;
  padding: 20px 60px;
  background: #f1f1f1;
  bottom: 0;
  width: 100%;

  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
`;

const Footer = () => {
  return (
    <Box>
      <div className='text-center' style={{ backgroundColor: 'f1f1f1' }}>
        2023 T-Rock:{" "}
        <a className='text-reset fw-bold' href='http://localhost:3000/'>
          T-Rock.com
        </a>
        <h6 className='text-uppercase fw-bold mb-4'>
          <FontAwesomeIcon icon={faHouse} style={{ color: "#000000", }} />
          {" "}Contact
        </h6>
      </div>
      <Row className='text-center' style={{
        display: "flex",
        justifyContent: "center",
        padding:"1em"
      }} xs="2">
        <Col>
          <FontAwesomeIcon icon={faEarthEurope} style={{ color: "#000000", }} />
          {" "}Krosno, 38-400, PL
        </Col>
        <Col>
          <FontAwesomeIcon icon={faEnvelope} style={{ color: "#000000", }} />
          {" "}T-Rock@gmail.com
        </Col>
        <Col>
          <FontAwesomeIcon icon={faPhone} style={{ color: "#000000", }} />
          {" "}+ 01 234 567 89
        </Col>
        <Col>
          <FontAwesomeIcon icon={faPrint} style={{ color: "#000000", }} />
          {" "}+ 01 234 567 89
        </Col>
      </Row>
    </Box>
  );
}

export default Footer;