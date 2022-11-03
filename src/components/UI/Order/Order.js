import React, { useState } from 'react';
import OrderItem from './OrderItems/OrderItem';
import './Order.css';
import { useSelector, useDispatch } from 'react-redux';
import { orderVisibilityActions } from '../../../store/index'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { motion } from 'framer-motion';
import Form from 'react-bootstrap/Form';
import Checkout from '../Checkout/Checkout';


const isEmpty = value => value.length === 0;

export default function Order() {

    const { items, totalPrice } = useSelector(state => state.cartReducer);


    // This checkout will be used to get the modal of the Payment for checkout
    const [showCheckOut, setShowCheckOut] = useState(false);

    // This show is a Redux item which tells whether the Order component will be mounted or not
    const show = useSelector(state => state.orderVisibilityReducer.willShow);

    const dispatch = useDispatch();


    const handleCheckoutShow = () => setShowCheckOut(true);



    // Function will be used on clicking the backdrop to remove the Order Component
    const orderVisibilityHandler = () => {
        dispatch(orderVisibilityActions.dontShow());
    }





    /******************************Validation for the addreess and handling it during Order Submit*******************************/

    const [addressData, setAddressData] = useState({
        address: ''
    });


    const [addressValidity, setAddressValidity] = useState({
        address: true
    });

    const handleAddressData = (e) => {
        setAddressData((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value
            }
        })
    }


    const onOrderSubmit = (e) => {
        e.preventDefault();


        // Validating Address
        const isAddressValid = !isEmpty(addressData.address)


        setAddressValidity({
            address: isAddressValid
        });

        const isFormValid = isAddressValid;


        // If Address not valid make it out of flow by return;
        if (!isFormValid) {
            return;
        }

        // After clicking the order button the Order Componenet will be unmounted
        dispatch(orderVisibilityActions.dontShow());

        // And the checkout modal will be shown
        handleCheckoutShow();

    }
    /************************************************************************************************/





    return (
        <>

            {/* Backdrop */}
            {show && <div id="backdrop" onClick={orderVisibilityHandler}>

            </div>}


            {/* Checkout Modal */}
            <Checkout showCheckOut={showCheckOut} setShowCheckOut={setShowCheckOut} addressData={addressData}/>

            
            {show && <motion.div
                initial={{ x: 250 }}
                animate={{ x: 0 }}

                className="bg-white" id="order-bar" >
                <h4 className="mb-3">We will deliver in 24mins to the address!!</h4>


                <div id="menu-items">
                    {items.length === 0 ?
                        <div className="d-flex justify-content-center align-items-center">
                            <img src="noitem.gif" alt="Loading..." header="200" width="200"></img>
                        </div>

                        :

                        items.map(item => <OrderItem key={item.id} item={item} />)}
                </div>

                
                {/* Total Amount */}
                <div className={`text-dark my-2 d-flex justify-content-between`} id="total-price">
                    <p>Total</p>
                    <b className="text-success">₹{totalPrice}</b>
                </div>


                <Container >
                    <Row>
                        <Form onSubmit={onOrderSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Control value={addressData.address} id="address" type="text" placeholder="Enter your address" onChange={handleAddressData} />
                                {!addressValidity.address && <b className="text-danger">Please provide an address</b>}
                            </Form.Group>

                            <button type='submit' className={`w-100 btn btn-sm btn-danger mb-2 ${items.length === 0 ? 'disabled' : ''}`}>Order</button>
                        </Form>

                    </Row>
                </Container>


            </motion.div>}
        </>

    )
}
