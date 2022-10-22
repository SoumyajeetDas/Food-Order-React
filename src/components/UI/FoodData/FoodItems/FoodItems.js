import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './FoodItems.css'
import { motion } from 'framer-motion'
import { cartActions } from '../../../../store/index';
import { useDispatch } from 'react-redux';

export default function FoodItems(props) {

  const dispatch = useDispatch();
  const [item, setItem] = useState();
  const [show, setShow] = useState(false);


  const addCartHandler = () => {

    dispatch(cartActions.addItem({
      id: props.item._id,
      name: props.item.name,
      price: props.item.price,
      imageUrl: props.item.imageUrl,
      amount: 1
    }));

    setItem(props.item.name);
    setShow(true);


    setTimeout(() => {
      setShow(false);
    }, 2000)
  }

  return (
    <>
      {show && <motion.div
        initial={{ y: -250, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}

        id="toast" className="text-center text-white border-0" >

        <div
          className="text-white">
          {item} added in cart
        </div>
      </motion.div>}

      <motion.div
        initial={{ y: 250, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ x: 10 }}
        whileTap={{ scale: 0.9 }}
        className="my-5"

      >
        <Container style={{ maxWidth: "90%" }} className="p-0">

          <Row>
            <Col className="mx-auto p-0" sm={9} id="food-bar" style={{ position: "relative" }} onClick={addCartHandler}>

              <span className="p-1 text-center text-white" id="badge">{props.item.rating}</span>
              <div id="wrapper">
                <img alt="Loading..." src={props.item.imageUrl}></img>
                <div className="p-4">
                  <h3 id="food-name" className="text-white">{props.item.name}</h3>
                  <small className="text-white"><i>{props.item.description}</i></small>
                  <h4 id="price" className="mt-3"><b>₹{props.item.price}</b></h4>
                </div>
              </div>

            </Col>
          </Row>
        </Container>
      </motion.div>
    </>



  )
}
