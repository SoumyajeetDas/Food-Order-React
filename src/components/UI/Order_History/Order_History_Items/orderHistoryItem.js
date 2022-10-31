import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './OrderHistoryItem.css';


export default function orderHistoryItem(props) {

    console.log(props)
    return (
        <Row>
            <Col id="orderitem-bar" sm={6} className="m-auto p-4 my-4">
                <h3 class="text-center text-white">Order Id : {props.item.orderId}</h3>


                <div className="my-5 text-center" id="middle-order-items">
                    {props.item.orders.map(x => <p>{x.amount} X {x.name}</p>)}
                </div>

                <div class="mt-5 mb-2 d-flex justify-content-start align-items-center location-date">
                    <span class="material-symbols-rounded me-2">
                        calendar_month
                    </span>
                    <small>{new Date(props.item.dateOfOrder).toDateString()}</small>
                </div>

                <div class="mb-5 d-flex justify-content-start align-items-center location-date">
                    <span class="material-symbols-rounded me-2">
                        pin_drop
                    </span>
                    <small>{props.item.address}</small>
                </div>


                <div className="d-flex justify-content-between align-items-center text-white">

                    {props.item.paymentStatus === 'Success' ?
                        <div className="d-flex justify-content-start align-items-center text-success">
                            <span class="material-symbols-rounded me-1">
                                check
                            </span>
                            <b><i>Successfull Payment</i></b>
                        </div>

                        :

                        <div className="d-flex justify-content-start align-items-center text-danger">


                            <span class="material-symbols-rounded me-1">
                                report
                            </span>
                            <b><i>Failed Payment</i></b>
                        </div>
                    }

                    <b>₹{props.item.totalPrice}</b>
                </div>


            </Col>


        </Row>
    )
}
