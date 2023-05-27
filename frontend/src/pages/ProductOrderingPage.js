import {useCallback, useContext, useEffect, useState} from "react";
import {ADMIN_ROLE, CLIENT_ROLE, userContext} from "../providers/UserContextProvider";
import {useParams} from "react-router-dom";
import {PageContainer} from "../components/Utils";
import ProductOrderItemList from "../components/ProductOrderListItem";
import {Button, Col, Row} from "reactstrap";
import DeliveryAddressDetails from "../components/DeliveryAddressDetails";
import ProductOrderStateBadge, {ProductOrderStates} from "../components/ProductOrderStateBadge";
import styled from "styled-components";

const ProductOrderTitleContainer = styled(Col)`
  display: flex;
  align-items: center;
  text-align: center;
  
  background-color: ${props => props.theme.secondary};
  color: ${props => props.theme.textLight};
  
  padding: 1em;
  margin-bottom: 1.5em;
`

const Title = styled.h3`
  font-weight: bold;
  letter-spacing: 1px;
`


const ProductOrderDetailsPage = () => {
    const {Api} = useContext(userContext)

    const {productOrderId} = useParams();
    const [productOrder, setProductOrder] = useState({})

    const getProductOrder = useCallback(() => {
        Api(`ProductOrder/${productOrderId}`).then(([result, isOk]) => {
            if (isOk) {
                setProductOrder(result);
            }
        })
    }, [productOrderId, Api])

    useEffect(() => {
        getProductOrder()
    }, [getProductOrder])

    return (
        <PageContainer>
            <Row>
                <ProductOrderTitleContainer>
                    <Title> Order #{productOrder.id}</Title>
                </ProductOrderTitleContainer>
            </Row>
            <Row>
                <Col md={8}>
                    <DeliveryAddressDetails editable={true}/>
                    <ProductOrderItemList title={"Ordered items"} items={productOrder.items}/>
                </Col>
                <Col>
                    <ProductOrderControlPanel onProductOrderChange={getProductOrder} productOrder={productOrder}/>
                </Col>
            </Row>
        </PageContainer>
    )
}

const ProductOrderStateControlButton = ({productOrderId, state, onOrderChange}) => {
    const {Api, hasRole} = useContext(userContext)

    const isVisibleToUser = () => {
        switch (state) {
            case ProductOrderStates.WaitingForPayment:
                return hasRole(ADMIN_ROLE) || hasRole(CLIENT_ROLE)
            case ProductOrderStates.DuringFulfillment:
                return hasRole(ADMIN_ROLE)
            case ProductOrderStates.Sent:
                return hasRole(ADMIN_ROLE)
            default:
                return true
        }
    }

    const isAvailableInState = (state) => {
        const availableInStates = [
            ProductOrderStates.WaitingForPayment,
            ProductOrderStates.DuringFulfillment,
            ProductOrderStates.Sent,
        ]

        return availableInStates.includes(state)
    }

    const isVisible = () => isAvailableInState(state) && isVisibleToUser()

    const createButtonMessage = () => {
        switch (state) {
            case ProductOrderStates.WaitingForPayment:
                return "Submit & Pay"
            case ProductOrderStates.DuringFulfillment:
                return "Mark As Sent"
            case ProductOrderStates.Sent:
                return "Mark as Delivered"
            default:
                return ""
        }
    }

    const handleProductOrderStateChange = () => {
        changeProductOrderState()
    }

    const getNextStateFor = (state) => {
        switch (state) {
            case ProductOrderStates.WaitingForPayment:
                return ProductOrderStates.DuringFulfillment
            case ProductOrderStates.DuringFulfillment:
                return ProductOrderStates.Sent
            case ProductOrderStates.Sent:
                return ProductOrderStates.Done
            default:
                throw new Error(`State ${state} is last.`)
        }
    }

    const changeProductOrderState = () => {
        Api(`ProductOrder/${productOrderId}/changeState`, {
            method: "POST",
            body: {
                state: getNextStateFor(state)
            }
        }).then(() => {
            if (onOrderChange) onOrderChange()
        })
    }

    if (!isVisible()) {
        return
    }

    return (
        <Row style={{
            paddingTop: "2em"
        }}>
            <Col>
                <Button block onClick={handleProductOrderStateChange} color={"success"}>
                    {createButtonMessage()}
                </Button>
            </Col>
        </Row>
    )
}

const ProductOrderControlPanelContainer = styled(Row)`
  background-color: ${props => props.theme.secondary};
  color: ${props => props.theme.textLight};

  padding: 1em;
  margin-left: 1em;
`

const ProductOrderControlPanel = ({productOrder, onProductOrderChange}) => {

    return (
        <ProductOrderControlPanelContainer>
            <Col>
                <Row style={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    <Col style={{
                        fontSize: "1.5em",
                        justifyContent: "center",
                    }}>
                        Total Price:
                    </Col>
                    <Col md={"auto"} style={{
                        fontSize: "2em"
                    }}>
                        {productOrder.totalPrice} PLN
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ProductOrderStateBadge state={productOrder.state}/>
                    </Col>
                </Row>
                <ProductOrderStateControlButton
                    productOrderId={productOrder.id}
                    state={productOrder.state}
                    onOrderChange={onProductOrderChange}
                />
            </Col>
        </ProductOrderControlPanelContainer>

    );
}

export default ProductOrderDetailsPage