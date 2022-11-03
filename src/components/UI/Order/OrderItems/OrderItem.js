import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './OrderItem.css';
import { motion } from 'framer-motion';
import { cartActions } from '../../../../store/index';
import { useDispatch } from 'react-redux';

export default function OrederItem(props) {

    const dispatch = useDispatch();

    // Adding items in the Redux cart. After updating the cart useEffect will run on Food.js which will update the DB by Redux Thunk
    const addCartHandler=()=>{
        dispatch(cartActions.addItem({
            id: props.item.id,
            name: props.item.name,
            price: props.item.price,
            imageUrl: props.item.imageUrl,
            amount:1
          }));
    }

    

    // Deleting items in the Redux cart. After updating the cart useEffect will run on Food.js which will update the DB by Redux Thunk
    const removeCartHandler=()=>{
        dispatch(cartActions.removeItem(props.item.id))
    }


    return (
        <div>
            <Container id="item-slice">
                <Row>


                    <Col sm={12}>
                        <div id="wrapper-order">
                            <img className="rounded-circle" src={props.item.imageUrl} alt="loading"></img>
                            <b className="text-center">{props.item.name}</b>
                            <b>₹{props.item.price}</b>
                        </div>
                    </Col>



                    <Col sm={6} className="mx-auto">
                        <div id="inner-wrapper" className="mt-2">


                            {/* + button */}
                            <motion.span
                                whileHover={{ scale: 1.3 }}
                                whileTap={{ scale: 0.9 }}

                                id="button" className="material-symbols-outlined" onClick={addCartHandler}>
                                add
                            </motion.span>



                            {/* Amount of single item */}
                            <p className="m-0"><b>{props.item.amount}</b></p>



                            {/* - button */}
                            <motion.span
                                whileHover={{ scale: 1.3 }}
                                whileTap={{ scale: 0.9 }}

                                id="button" className="material-symbols-rounded" onClick={removeCartHandler}>
                                remove
                            </motion.span>


                        </div>
                    </Col>
                </Row>
            </Container>

        </div>

    )
}
