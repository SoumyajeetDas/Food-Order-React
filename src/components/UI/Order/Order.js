import React from 'react';
import OrderItem from './OrderItems/OrderItem';
import './Order.css';
import { useSelector, useDispatch } from 'react-redux';
import { cartItemShowActions } from '../../../store/index'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { motion } from 'framer-motion'



export default function Order() {

    const items = useSelector(state => state.cartReducer.items);
    const totalPrice = useSelector(state => state.cartReducer.totalPrice);


    const show = useSelector(state => state.cartItemShowReducer.willShow);

    const dispatch = useDispatch();


    const cartItemdontShowHandler = () => {
        dispatch(cartItemShowActions.dontShow());
    }

    return (
        <>
            {show && <div id="backdrop" onClick={cartItemdontShowHandler}>

            </div>}
            {show && <motion.div
                initial={{ x: 250 }}
                animate={{ x: 0 }}

                class="bg-white" id="order-bar" >
                <h4 class="mb-3">We will deliver in 24mins to the address!!</h4>


                <div id="menu-items">
                    {items.length === 0 ?
                        <div class="d-flex justify-content-center align-items-center">
                            <img src="noitem.gif" alt="Loading..." header="200" width="200"></img>
                        </div>

                        :

                        items.map(item => <OrderItem key={item.id} item={item} />)}
                </div>


                <div class={`text-dark my-4 d-flex justify-content-between`} id="total-price">
                    <p>Total</p>
                    <b class="text-success">₹{totalPrice}</b>
                </div>
                <Container >
                    <Row>
                        <button class={`btn btn-sm btn-danger mb-2 ${items.length === 0 ? 'disabled' : ''}`}>Order</button>
                    </Row>
                </Container>
            </motion.div>}
        </>

    )
}
