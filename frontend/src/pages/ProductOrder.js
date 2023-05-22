import {useCallback, useContext, useEffect, useState} from "react";
import {userContext} from "../providers/UserContextProvider";
import {useParams} from "react-router-dom";
import {PageContainer} from "../components/Utils";
import ProductOrderItemList from "../components/ProductOrderListItem";
import {Badge, Button, Col, Row} from "reactstrap";
import DeliveryAddressDetails from "../components/DeliveryAddressDetails";

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
                <Col md={8}>
                    <DeliveryAddressDetails editable={true}/>
                    <ProductOrderItemList title={"Your Order"} items={productOrder.items}/>
                </Col>
                <Col>
                    <ProductOrderControlPanel onProductOrderChange={getProductOrder} productOrder={productOrder}/>
                </Col>
            </Row>
        </PageContainer>
    )
}

const ProductOrderStates = {
    WaitingForPayment: "WaitingForPayment",
    DuringFulfillment: "DuringFulfillment",
    Sent: "Sent",
    Done: "Done"
}

const ProductOrderStateControlButton = ({productOrderId, state, onOrderChange}) => {
    const {Api} = useContext(userContext)

    const isVisibleToUser = () => {
        return true;
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
            if(onOrderChange) onOrderChange()
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


const ProductOrderControlPanel = ({productOrder, onProductOrderChange}) => {

    const createStateBadge = (state) => {
        switch (state) {
            case ProductOrderStates.WaitingForPayment:
                return <Badge color={"primary"}>Waiting for payment</Badge>
            case ProductOrderStates.DuringFulfillment:
                return <Badge color={"primary"}>During fulfillment</Badge>
            case ProductOrderStates.Sent:
                return <Badge color={"primary"}>Sent</Badge>
            case ProductOrderStates.Done:
                return <Badge color={"success"}>Done</Badge>
            default:
                return ""
        }
    }

    return (
        <Row style={{
            backgroundColor: "#eee",
            padding: "1em",
            marginLeft: "1em",
            borderRadius: "0.5em"
        }}>
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
                        {createStateBadge(productOrder.state)}
                    </Col>
                </Row>
                <ProductOrderStateControlButton
                    productOrderId={productOrder.id}
                    state={productOrder.state}
                    onOrderChange={onProductOrderChange}
                />
            </Col>
        </Row>

    );
}

export default ProductOrderDetailsPage