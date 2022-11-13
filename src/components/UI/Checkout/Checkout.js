import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../store/auth-slice';


export default function Checkout(props) {

    const [paidFor, setPaidFor] = useState(false);
    const [cannotpaidFor, setCannotPaidFor] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [dollarToINR, setDollarTOINR] = useState(0);

    const handleErrorClose = () => setShowError(false);
    const handleErrorShow = () => setShowError(true);

    const handleSuccessClose = () => setShowSuccess(false);
    const handleSuccessShow = () => setShowSuccess(true);


    const handleClosePayment = () => props.setShowCheckOut(false);


    const { items, totalPrice } = useSelector(state => state.cartReducer);

    const registerData = useSelector(state => state.authReducer.registerData);


    const dispatch = useDispatch();






    /*************************Converting INR TO USD on Checkout When the CheckOut Component Will Mount******************************/
    const fetchDollarToINR = async () => {

        try {
            var myHeaders = new Headers();

            myHeaders.append("apikey", process.env.REACT_APP_SOUMYAJEET1998_DOLLAR_TO_INR);

            // Website : https://apilayer.com/marketplace/fixer-api
            // GoogleAccount : soumyajeetdas1998@gmail.com, 1705937@kiit.ac.in --> Google Auth 
            // Normal Account : username : soumyajeetdas@outlook.com password : as ususal I give @123
            const data = await fetch('https://api.apilayer.com/fixer/convert?to=INR&from=USD&amount=1', {
                method: 'GET',
                redirect: 'follow',
                headers: myHeaders
            });

            // console.log(data.status)
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

        // Only when the checkout modal comes up then only the Dollar to INR api will be called.
        // Website : https://apilayer.com/marketplace/fixer-api
        // Website : https://apilayer.com/marketplace/fixer-api
        // GoogleAccount : soumyajeetdas1998@gmail.com, 1705937@kiit.ac.in --> Google Auth 
        // Normal Account : username : soumyajeetdas@outlook.com password : as ususal I give @123

        fetchDollarToINR();

        // eslint-disable-next-line
    }, []);

    /************************************************************************************/






    /*************************Handling The Successfull Status******************************/


    const handleApprove = async (orderId) => {


        //Saving the Order to DB
        let data = await fetch(`${process.env.REACT_APP_Working_URL}/api/v1/order/`, {
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + registerData.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },


            // To send the credential(cookies) with the request to the backend side of another domain or same domain. 
            // Due to the CORS policy we have to add the credentials:true so that the server in a particular doamin
            // can borrow credential from another domain
            'credentials': 'include',


            body: JSON.stringify({
                address: props.addressData.address,
                orders: items,
                totalPrice,
                paymentStatus: 'Success',
                orderId
            })
        });


        // Authentication Issue
        if (data.status === 401) {
            alert("Your payment is successfull but order is not saved in DB as you are logged out!!");
            dispatch(logout());
        }



        else if (data.status !== 201 && data.status !== 401) {
            alert("Your payment is successful but order is not saved in DB");
        }

        setPaidFor(true);
    }

    // Used 'if' as useEffect() is resulting in 2 times rendering when paidForr is changed, once during first time paidFor
    // changed from false to true in handleApprove() on and then with setPaidFor() resulting in paidFor changing from 
    // true to false.
    if (paidFor) {
        handleClosePayment();
        handleErrorClose();
        handleSuccessShow();
        setPaidFor(false);
        // alert("Paid")
    }


    /************************************************************************************/







    /*************************Handling The Error Status******************************/
    const handleError = async (err) => {

        // The if part will be executed only whne payment will be throwing error.
        // When cancelled the if part will be not executed
        if (err !== 'Payment has been cancelled') {
            let data = await fetch(`${process.env.REACT_APP_Working_URL}/api/v1/order/`, {
                method: "POST",
                headers: {
                    Authorization: 'Bearer ' + registerData.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },



                // To send the credential(cookies) with the request to the backend side of another domain or same domain. 
                // Due to the CORS policy we have to add the credentials:true so that the server in a particular doamin
                // can borrow credential from another domain
                'credentials': 'include',


                body: JSON.stringify({
                    address: props.addressData.address,
                    orders: items,
                    totalPrice,
                    paymentStatus: 'Failed',
                    // orderId --> Since the order failed with error so orderId is also not present
                })
            });

            // Authentication Issue
            if (data.status === 401) {
                alert("Your payment is not successful and order is not saved in DB as you are logged out!!");
                dispatch(logout());
            }

            else if (data.status !== 201 && data.status !== 401) {
                alert("Your payment is not successfull and order is not saved in DB");
            }

        }


        setErrMsg(err);
        setCannotPaidFor(true);
    }

    // Used 'if' as useEffect is resulting in 2 times rendering when cannotPaidFor is changed, once during first time cannotPaidFor
    // changed from false to true in handleError() and then with setCannotPaidFor() resulting in cannotPaid changing from 
    // true to false.
    if (cannotpaidFor) {
        handleClosePayment();
        handleSuccessClose();
        handleErrorShow();
        setCannotPaidFor(false);
        // alert("Not able to Pay")
    }




    /************************************************************************************/



    return (

        <>

            {/* Error Modal */}
            <Modal show={showError} onHide={() => handleErrorShow()}>
                <Modal.Body>
                    <b className="text-danger">{errMsg}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleErrorClose()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>



            {/* Success Modal */}
            <Modal show={showSuccess} onHide={() => handleSuccessClose()}>
                <Modal.Body>

                    <b className="text-success">Order is Successfull !! Thanks for Choosing us :)</b>

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
                            onCancel={() => {
                                handleError("Payment has been cancelled");
                            }}

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
