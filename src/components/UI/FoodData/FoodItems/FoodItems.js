import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './FoodItems.css'
import { motion } from 'framer-motion'
import { cartActions } from '../../../../store/index';
import { useDispatch } from 'react-redux';
import Rating from '../../Ratings/Rating';

export default function FoodItems(props) {

  const dispatch = useDispatch();


  // Adding items in the Redux cart. After updating the cart useEffect will run on Food.js which will update the DB by Redux Thunk
  const addCartHandler = () => {

    dispatch(cartActions.addItem({
      id: props.item._id,
      name: props.item.name,
      price: props.item.price,
      imageUrl: props.item.imageUrl,
      amount: 1
    }));

    // The item name will be set in the toast when the data gets added in cart present in Food.js
    props.setItem(props.item.name);



    // The toast will be shown when the item gets added in cart present in Food.js

    props.setShow(true);


    setTimeout(() => {
      props.setShow(false);
    }, 2000)


  }

  return (
    <>


      <motion.div
        initial={{ y: 400, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ x: 10 }}

        className="my-5"

      >
        <Container style={{ maxWidth: "90%" }} className="p-0">

          <Row>
            <Col className="mx-auto p-0" sm={9} id="food-bar" style={{ position: "relative", zIndex:"2px" }}>

              {/* Avg Rating Badge */}
              <span className={`p-1 text-center text-white ${props.item.avgRating >= 3 ? 'bg-success' : 'bg-danger'}`} id="badge">{props.item.avgRating.toFixed(1)}*</span>

              {/* Add Cart */}
              <motion.span
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}

                onClick={addCartHandler}

                className="pt-1 px-2 text-center text-white" id="add-cart-button">

                <span className="material-symbols-rounded">
                  add_shopping_cart
                </span>

              </motion.span>



              <div id="wrapper">

                <img alt="Loading..." src={props.item.imageUrl}></img>

                <div className="p-4">
                  
                  <h3 id="food-name" className="text-white">{props.item.name}</h3>

                  <small className="text-white"><i>{props.item.description}</i></small>

                  <h4 id="price" className="mt-3"><b>₹{props.item.price}</b></h4>
                  

                  {/* Rating Component */}
                  <Rating token={props.token} foodId={props.item._id} setModalShow={props.setModalShow} />

                </div>

              </div>

            </Col>
          </Row>
        </Container>
      </motion.div>

    </>



  )
}
