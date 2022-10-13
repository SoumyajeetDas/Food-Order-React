import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { motion } from "framer-motion"
import './Register.css'

export default function Register() {
    return (
        <Container >
            <Row>
                <Col md={6} className="m-auto p-5" style={{ borderRadius: "20px" }}>
                    <h2 id="register" class="text-center text-warning mb-3">Register</h2>
                    <Form>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                        >
                            <Form.Group className="mb-5 form-group">
                                <span class="material-symbols-outlined b-0 p-2 text-warning" >
                                    person
                                </span>
                                <input type="text" placeholder="Enter the name" class="text-warning" />
                            </Form.Group>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.1 }}
                        >
                            <Form.Group className="mb-5 form-group">
                                <span class="material-symbols-outlined b-0 p-2 text-warning" >
                                    email
                                </span>
                                <input type="email" placeholder="Enter the email" class="text-warning" />
                            </Form.Group>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.1 }}
                        >
                            <Form.Group className="mb-5 form-group">
                                <span class="material-symbols-rounded b-0 p-2 text-warning">
                                    lock
                                </span>
                                <input type="password" placeholder="Enter the password" class="text-warning" />
                            </Form.Group>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.1 }}
                        >
                            <Form.Group className="mb-5 form-group">
                                <span class="material-symbols-rounded b-0 p-2 text-warning">
                                    <span class="material-symbols-outlined">
                                        lock_open
                                    </span>
                                </span>
                                <input type="cnfpwd" placeholder="Confirm password" class="text-warning" />
                            </Form.Group>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            id="btn">
                            <Button class="m-auto" style={{ backgroundColor: '#D2078B', border: "none" }} type="submit">
                                Create Account
                            </Button>
                        </motion.div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
