import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Footer.css'
import { motion } from "framer-motion"

export default function Footer() {
    return (
        <div>
            <Container className="my-5">
                <Row>
                    <Col sm={12} className="text-center mx-auto">
                        <p id="follow-us">Follow Us On</p>
                    </Col>
                    <div style={{width:"150px"}} className="text-center mx-auto">
                        <div id="footer">
                            <motion.i
                                whileHover={{ scale: 2.1 }}
                                whileTap={{ scale: 1.5 }}
                                className="fab fa-facebook text-white"></motion.i>
                            <motion.i
                                whileHover={{ scale: 2.1 }}
                                whileTap={{ scale: 1.5 }}
                                className="fab fa-instagram text-white"></motion.i>
                            <motion.i
                                whileHover={{ scale: 2.1 }}
                                whileTap={{ scale: 1.5 }}
                                className="fab fa-twitter text-white"></motion.i>
                            <motion.i
                                whileHover={{ scale: 2.1 }}
                                whileTap={{ scale: 1.5 }}
                                className="fab fa-linkedin text-white"></motion.i>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>

    )
}
