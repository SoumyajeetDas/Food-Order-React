import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useSelector } from 'react-redux'

export default function Checkout(props) {

    const [paidFor, setPaidFor] = useState(false);
    const [cannotpaidFor, setCannotPaidFor] = useState(false);
    const [errMsg, setErrMsg] = useState("")
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [dollarToINR, setDollarTOINR] = useState(0);

    const handleErrorClose = () => setShowError(false);
    const handleErrorShow = () => setShowError(true);

    const handleSuccessClose = () => setShowSuccess(false);
    const handleSuccessShow = () => setShowSuccess(true);


    const handleClosePayment = () => props.setShowCheckOut(false);


    const { items, totalPrice } = useSelector(state => state.cartReducer);

    const { token } = useSelector(state => state.authReducer.registerData);


    /*************************Converting INR TO USD on Checkout Component Mounting******************************/
    const fetchDollarToINR = async () => {

        try {
            var myHeaders = new Headers();
            myHeaders.append("apikey", "GJssLafVkwVyQ1seiH6DOBLcp4ZOyKG9");

            const data = await fetch('https://api.apilayer.com/exchangerates_data/convert?to=INR&from=USD&amount=1', {
                method: 'GET',
                redirect: 'follow',
                headers: myHeaders
            });

            if (data.status === 200) {
                const dataJson = await data.json();
                setDollarTOINR(dataJson.result.toFixed(2))
            }

            else {
                alert("Not able to change INR to USD as status is not 200")
            }
        }

        catch (err) {
            alert("Not able to change INR to USD")
        }

    }

    useEffect(() => {
        fetchDollarToINR();
    }, []);

    /************************************************************************************/






    /*************************Handling The Successfull Status******************************/


    const handleApprove = async (orderId) => {

        //Saving the Order to DB
        let data = await fetch(`http://localhost:6001/api/v1/order/`, {
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                address: props.addressData.address,
                orders: items,
                totalPrice,
                paymentStatus: 'Success',
                orderId
            })
        });

        if (data.status !== 201) {
            alert("Your payment is successful but order is not saved in DB");
        }

        console.log(await data.json())
        setPaidFor(true);
    }


    useEffect(() => {
        if (paidFor) {
            handleClosePayment();
            handleErrorClose();
            handleSuccessShow();
            setPaidFor(false);
            // alert("Paid")
        }
        // eslint-disable-next-line
    }, [paidFor]);

    /************************************************************************************/







    /*************************Handling The Error Status******************************/
    const handleError = async(err) => {
        //Saving the Order to DB
        await fetch(`http://localhost:6001/api/v1/order/`, {
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                address: props.addressData.address,
                orders: items,
                totalPrice,
                paymentStatus: 'Failed',
                // orderId --> Since the order failed with error so orderId is also not present
            })
        });

        setErrMsg(err);
        setCannotPaidFor(true);

    }



    useEffect(() => {

        if (cannotpaidFor) {
            handleClosePayment();
            handleSuccessClose();
            handleErrorShow();
            setCannotPaidFor(false);
            // alert("Not able to Pay")
        }
        // eslint-disable-next-line
    }, [cannotpaidFor])


    /************************************************************************************/


    return (

        <>

            {/* Error Modal */}
            <Modal show={showError} onHide={() => handleErrorShow()}>
                <Modal.Body>
                    <b class="text-danger">{errMsg}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleErrorShow()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>



            {/* Success Modal */}
            <Modal show={showSuccess} onHide={() => handleSuccessClose()}>
                <Modal.Body>

                    <b class="text-success">Order is Successfull !! Thanks for Choosing us :)</b>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleSuccessClose()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>




            {/* CheckOut Modal */}
            <Modal show={props.showCheckOut} onClick={() => handleClosePayment()}>
                <Modal.Header closeButton>
                    <Modal.Title>Please select the payment method</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PayPalScriptProvider>
                        <PayPalButtons
                            style={{
                                shape: 'pill',
                                color: 'gold',
                                layout: 'vertical',
                                label: 'buynow',

                            }}

                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                // currency_code: 'INR',
                                                value: (totalPrice * 1 / dollarToINR * 1).toFixed(2)
                                            }
                                        }
                                    ]
                                })
                            }}

                            onApprove={async (data, actions) => {

                                // Without capturing the order no money will be deducted from the buyer's account.
                                // You will see the order info when we click on the Paypal Button on the CheckOut Page.
                                // Those info only gets captured.
                                await actions.order.capture();

                                handleApprove(data.orderID)
                            }}


                            // User will be automatically redirected to the Checkout Page on Cancel of the payment
                            onCancel={() => { }}

                            onError={(err) => {
                                handleError(err);
                            }}
                        >

                        </PayPalButtons>
                    </PayPalScriptProvider>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClosePayment()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
}
