import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { motion } from "framer-motion";
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../Spinner/Spiner'
import Footer from '../Home/Footer/Footer';
import { forgotPassword } from '../../../store/auth-slice'


let validRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;

const isEmpty = value => value.trim() === ''
const isEmail = value => validRegex.test(value.trim())
const isPwdAndCnfSame = (pwd, cnf) => pwd === cnf

export default function ForgotPassword() {

    const dispatch = useDispatch();

    const { isError, isSuccess, isLoading, message } = useSelector((state) => state.authReducer);

    const [forgotPasswordData, setForgotPasswordData] = useState({
        email: '',
        password: '',
        confirmpassword: ''
    });


    const [forgotPasswordFormValidity, setForgotPasswordFormValidity] = useState({
        email: true,
        password: true,
        confirmpassword: true
    });


    const handleRegisterData = (e) => {
        setForgotPasswordData((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value
            }
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const isEmailValid = !isEmpty(forgotPasswordData.email) && isEmail(forgotPasswordData.email)
        const isPasswordValid = !isEmpty(forgotPasswordData.password);
        const isConfirmPasswordValid = isPwdAndCnfSame(forgotPasswordData.password, forgotPasswordData.confirmpassword);

        // console.log(isEmpty(registerData.name))

        setForgotPasswordFormValidity({
            email: isEmailValid,
            password: isPasswordValid,
            confirmpassword: isConfirmPasswordValid
        });

        const isFormValid = isEmailValid && isPasswordValid && isConfirmPasswordValid;

        if (!isFormValid) {
            return;
        }

        dispatch(forgotPassword(forgotPasswordData));
    }

    return (
        <>

            {isLoading && <div id="backdropRegister">
                <Spinner />
            </div>}


            <Container >

                {isSuccess && <Row>
                    <Col md={6} className="m-auto mb-3">
                        <div class="alert alert-success text-center" role="alert">
                            <b>{message}</b>
                        </div>
                    </Col>
                </Row>}
                {isError && <Row>
                    <Col md={6} className="m-auto mb-3">
                        <div class="alert alert-danger text-center" role="alert">
                            <b>{message}</b>
                        </div>
                    </Col>
                </Row>}

                <Row>
                    <Col md={6} className="m-auto p-3" style={{ borderRadius: "20px" }}>
                        <h2 id="register" class="text-center mb-3">Forgot Your Password?</h2>
                        <Form onSubmit={handleSubmit}>

                            <motion.div
                                whileHover={{ scale: 1.1 }}

                                className="mb-5"
                            >
                                <Form.Group className="form-group">
                                    <span class="material-symbols-outlined b-0 p-2 colouring" >
                                        email
                                    </span>
                                    <input id="email" type="email" placeholder="Enter the email" class="colouring" onChange={handleRegisterData} />
                                </Form.Group>
                                <div>
                                    {!forgotPasswordFormValidity.email && <p className="text-danger text-end">**Please enter the email correctly</p>}
                                </div>

                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.1 }}

                                className="mb-5"
                            >
                                <Form.Group className="form-group">
                                    <span class="material-symbols-rounded b-0 p-2 colouring">
                                        lock
                                    </span>
                                    <input id="password" type="password" placeholder="Enter the password" class="colouring" onChange={handleRegisterData} />
                                </Form.Group>
                                <div>
                                    {!forgotPasswordFormValidity.password && <p className="text-danger text-end">**Please enter the password correctly</p>}
                                </div>

                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.1 }}

                                className="mb-5"
                            >
                                <Form.Group className="form-group">
                                    <span class="material-symbols-rounded b-0 p-2 colouring">
                                        <span class="material-symbols-outlined">
                                            lock_open
                                        </span>
                                    </span>
                                    <input id="confirmpassword" type="password" placeholder="Confirm password" class="colouring" onChange={handleRegisterData} />
                                </Form.Group>

                                <div>
                                    {!forgotPasswordFormValidity.confirmpassword && <p className="text-danger text-end">**Confirm Password and Password should be same</p>}
                                </div>

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

            <Footer />
        </>

    )
}