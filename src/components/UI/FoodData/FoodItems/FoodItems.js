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
  const [item,setItem] = useState();
  const [show, setShow] = useState(false);


  const addCartHandler = () => {
    console.log(props.item.name)



    console.log("Item ",item)
    dispatch(cartActions.addItem({
      id: props.item._id,
      name: props.item.name,
      price: props.item.price,
      imageUrl: props.item.imageUrl
    }));

    setItem(props.item.name);
    setShow(true);


    setTimeout(()=>{
      setShow(false);
    },2000)
  }

  return (
    <>
      {show && <div id="toast" className="text-center text-white bg-warning border-0" >

        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}} 
        
        className="text-white">
          {item} added in cart
        </motion.div>
      </div>}

      <motion.div
        whileHover={{ x: 10 }}
        whileTap={{ scale: 0.9 }}
        className="my-5"
        onClick={addCartHandler}

      >
        <Container style={{ maxWidth: "90%" }} className="p-0">

          <Row>
            <Col className="mx-auto p-0" sm={9} id="food-bar" style={{ position: "relative" }}>

              <span className="p-1 text-center text-white" id="badge">{props.item.rating}</span>
              <div id="wrapper">
                <img alt="Loading..." src={props.item.imageUrl}></img>
                <div className="p-4">
                  <h3 id="food-name" className="text-white">{props.item.name}</h3>
                  <small className="text-white"><i>{props.item.description}</i></small>
                  <h4 className="text-warning mt-3"><b>₹{props.item.price}</b></h4>
                </div>
              </div>

            </Col>
          </Row>
        </Container>
      </motion.div>
    </>



  )
}
