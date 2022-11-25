import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { motion } from "framer-motion";
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../Spinner/Spiner'
import Footer from '../Home/Footer/Footer';
import { forgotPassword } from '../../../store/auth-slice';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
import { authActions } from '../../../store/index'


let validRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;

const isEmpty = value => value.trim() === ''
const isEmail = value => validRegex.test(value.trim())



// Animation for moving the component from left to right
const containerVariants = {
    hidden: {
        x: 400,
        opacity: 0
    },
    visible: {
        x: 0,
        opacity: 1,
    }
}



export default function ForgotPassword() {

    const dispatch = useDispatch();

    const { isError, isSuccess, isLoading, message } = useSelector((state) => state.authReducer);

    const navigate = useNavigate();



    const [forgotPasswordData, setForgotPasswordData] = useState({
        email: '',
    });


    const [forgotPasswordFormValidity, setForgotPasswordFormValidity] = useState({
        email: true
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


        // Checking the Validity
        const isEmailValid = !isEmpty(forgotPasswordData.email) && isEmail(forgotPasswordData.email)


        // Setting the form Validity and accordingly validation error will be shown for the fields
        setForgotPasswordFormValidity({
            email: isEmailValid
        });


        const isFormValid = isEmailValid;


        // If the form not valid the control will be removed from the flow
        if (!isFormValid) {
            return;
        }


        // If everything is valid then the API will be called with the registerData paramter
        dispatch(forgotPassword(forgotPasswordData));
    }


    useEffect(() => {

        if (isSuccess)
            navigate('/medium')

        // eslint-disable-next-line
    }, [isSuccess]);


    // Resetting the state in the auth-slice. If not done, suppose if there is any error thrown during login time it is showing
    // on loading the reset Password as well
    useEffect(() => {
        dispatch(authActions.reset());

        // eslint-disable-next-line
    }, [])

    return (
        <>

            {/* During loading spinner over the backdrop */}
            {isLoading && <div id="backdropRegister">
                <Spinner />
            </div>}

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <Container >



                    {/* {isSuccess && <Row>
                        <Col md={6} className="m-auto mb-3">
                            <div className="alert alert-success text-center" role="alert">
                                <b>{message}</b>
                            </div>
                        </Col>
                    </Row>} */}


                    {/* Error Message coming from the api will be shown in Bootstrap 5 alert */}
                    {isError && <Row>
                        <Col md={6} className="m-auto mb-3">
                            <div className="alert alert-danger text-center" role="alert">
                                <b>{message}</b>
                            </div>
                        </Col>
                    </Row>}


                    <Row>
                        <Col md={6} className="m-auto p-3" style={{ borderRadius: "20px" }}>
                            <h2 id="register" className="text-center mb-4">Forgot Your Password?</h2>
                            <Form onSubmit={handleSubmit}>

                                <motion.div
                                    whileHover={{ scale: 1.1 }}

                                    className="mb-5"
                                >
                                    <Form.Group className="form-group">
                                        <span className="material-symbols-outlined b-0 p-2 colouring" >
                                            email
                                        </span>
                                        <input id="email" type="email" autoComplete="on" placeholder="Enter the email" className="colouring" onChange={handleRegisterData} />
                                    </Form.Group>
                                    <div>
                                        {!forgotPasswordFormValidity.email && <p className="text-danger text-end">**Please enter the email to get the token</p>}
                                    </div>
                                </motion.div>


                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    id="btn">
                                    <Button className="m-auto" id="forgot-password-button" type="submit">
                                        Send token
                                    </Button>
                                </motion.div>


                            </Form>
                        </Col>
                    </Row>
                </Container>
            </motion.div>


            <Footer />
        </>

    )
}
