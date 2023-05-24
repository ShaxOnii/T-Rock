import {Badge} from "reactstrap";

export const ProductOrderStates = {
    WaitingForPayment: "WaitingForPayment",
    DuringFulfillment: "DuringFulfillment",
    Sent: "Sent",
    Done: "Done"
}

export const formatStateCaption = (state) => {
    switch (state) {
        case ProductOrderStates.WaitingForPayment:
            return "Waiting for payment"
        case ProductOrderStates.DuringFulfillment:
            return "During fulfillment"
        case ProductOrderStates.Sent:
            return "Sent"
        case ProductOrderStates.Done:
            return "Done"
        default:
            return state
    }
}

const ProductOrderStateBadge = ({state}) => {

    const color = () => {
        if(state === ProductOrderStates.Done){
            return  "success"
        }

        return "primary"
    }


    return (
        <Badge color={color()}>{formatStateCaption(state)}</Badge>
    )

}

export default ProductOrderStateBadge




