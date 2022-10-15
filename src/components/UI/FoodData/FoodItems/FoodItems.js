import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './FoodItems.css'
import { motion } from 'framer-motion'

export default function FoodItems(props) {

  return (
    <motion.div
      whileHover={{ x : 30 }}
      whileTap={{ scale: 0.9 }}
      class="my-5">
      <Container style={{ maxWidth: "90%" }} class="p-0">

        <Row>
          <Col className="mx-auto p-0" sm={9} id="food-bar" style={{ position: "relative" }}>

            <span class="p-1 text-center text-white" id="badge">{props.item.rating}</span>
            <div id="wrapper">
              <img alt="Loading..." src={props.item.imageUrl}></img>
              <div class="p-4">
                <h3 id="food-name" class="text-white">{props.item.name}</h3>
                <small class="text-white"><i>{props.item.description}</i></small>
                <h4 class="text-warning mt-3"><b>₹{props.item.price}</b></h4>
              </div>
            </div>

          </Col>
        </Row>
      </Container>
    </motion.div>

  )
}
