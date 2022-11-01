import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { motion } from "framer-motion"
import './Login.css';
import { login } from '../../../store/auth-slice'
import { authActions } from '../../../store/index';
import Spinner from '../Spinner/Spiner';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Home/Footer/Footer';


let validRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;

const isEmpty = value => value.trim() === ''
const isEmail = value => validRegex.test(value.trim());


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


export default function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, isSuccess, isLoading, message } = useSelector((state) => state.authReducer);

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });


    const [loginFormValidity, setLoginFormValidity] = useState({
        email: true,
        password: true,
    });

    const handleLoginData = (e) => {
        setLoginData((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();


        const isEmailValid = !isEmpty(loginData.email) && isEmail(loginData.email)
        const isPasswordValid = !isEmpty(loginData.password);

        // console.log(isEmpty(registerData.name))

        setLoginFormValidity({
            email: isEmailValid,
            password: isPasswordValid,
        });

        const isFormValid = isEmailValid && isPasswordValid;

        if (!isFormValid) {
            return;
        }

        dispatch(login(loginData));
    }

    useEffect(() => {
        if (isSuccess) {
            navigate("/foods");
        }
        dispatch(authActions.reset());
    }, [isSuccess, navigate, dispatch])


    return (

        <>
            {isLoading && <div id="backdropRegister">
                <Spinner />
            </div>}

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <Container >
                    {isError && <Row>
                        <Col md={6} className="m-auto mb-3">
                            <div className="alert alert-danger text-center" role="alert">
                                <b>{message}</b>
                            </div>
                        </Col>
                    </Row>}
                    <Row>
                        <Col md={6} className="m-auto p-3" style={{ borderRadius: "20px" }}>
                            <h2 id="register" className="text-center mb-3">Login</h2>
                            <Form onSubmit={handleSubmit}>

                                <motion.div
                                    whileHover={{ scale: 1.1 }}

                                    className="mb-5"
                                >
                                    <Form.Group className="form-group">
                                        <span className="material-symbols-outlined b-0 p-2 colouring" >
                                            email
                                        </span>
                                        <input id="email" type="email" autoComplete="on" placeholder="Enter the email" className="colouring" onChange={handleLoginData} />
                                    </Form.Group>
                                    <div>
                                        {!loginFormValidity.email && <p className="text-danger text-end">**Please enter the email correctly</p>}
                                    </div>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.1 }}

                                    className="mb-4"
                                >
                                    <Form.Group className="mb-2 form-group">
                                        <span className="material-symbols-rounded b-0 p-2 colouring">
                                            lock
                                        </span>
                                        <input id="password" type="password" autoComplete="on" placeholder="Enter the password" className="colouring" onChange={handleLoginData} />
                                    </Form.Group>
                                    <div>
                                        {!loginFormValidity.password && <p className="text-danger text-end">**Please enter the password correctly</p>}
                                    </div>

                                </motion.div>

                                <div className="mb-5 ms-auto d-flex justify-content-end">
                                    <Link to="/forgotPassword" className="text-white">Forgot Password?</Link>
                                </div>

                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    id="btn">
                                    <Button className="m-auto" style={{ backgroundColor: '#D2078B', border: "none" }} type="submit">
                                        Login
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
