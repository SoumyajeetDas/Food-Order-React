import React, { useState } from 'react';
import OrderItem from './OrderItems/OrderItem';
import './Order.css';
import { useSelector, useDispatch } from 'react-redux';
import { cartItemShowActions } from '../../../store/index'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { motion } from 'framer-motion';
import Form from 'react-bootstrap/Form';
import Checkout from '../Checkout/Checkout';


const isEmpty = value => value.length === 0;

export default function Order() {

    const { items, totalPrice } = useSelector(state => state.cartReducer);

    const [showCheckOut, setShowCheckOut] = useState(false);


    const show = useSelector(state => state.cartItemShowReducer.willShow);

    const dispatch = useDispatch();


    const handleShow = () => setShowCheckOut(true);

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



        const isAddressValid = !isEmpty(addressData.address)


        setAddressValidity({
            address: isAddressValid
        });

        const isFormValid = isAddressValid;

        if (!isFormValid) {
            return;
        }

        dispatch(cartItemShowActions.dontShow());
        handleShow();

    }


    const cartItemdontShowHandler = () => {
        dispatch(cartItemShowActions.dontShow());
    }

    return (
        <>
            {show && <div id="backdrop" onClick={cartItemdontShowHandler}>

            </div>}


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
