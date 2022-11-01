import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { motion } from "framer-motion"
import './Register.css';
import { authActions } from '../../../store/index';
import { register } from '../../../store/auth-slice'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spiner'
import Footer from '../Home/Footer/Footer';



let validRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;

const isEmpty = value => value.trim() === ''
const isEmail = value => validRegex.test(value.trim())
const isPwdAndCnfSame = (pwd, cnf) => pwd === cnf


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


export default function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isError, isSuccess, isLoading, message } = useSelector((state) => state.authReducer);

    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
        confirmpassword: ''
    });


    const [registerFormValidity, setRegisterFormValidity] = useState({
        name: true,
        email: true,
        password: true,
        confirmpassword: true
    });


    const handleRegisterData = (e) => {
        setRegisterData((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value
            }
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const isUsernameValid = !isEmpty(registerData.name);
        const isEmailValid = !isEmpty(registerData.email) && isEmail(registerData.email)
        const isPasswordValid = !isEmpty(registerData.password);
        const isConfirmPasswordValid = isPwdAndCnfSame(registerData.password, registerData.confirmpassword);

        // console.log(isEmpty(registerData.name))

        setRegisterFormValidity({
            name: isUsernameValid,
            email: isEmailValid,
            password: isPasswordValid,
            confirmpassword: isConfirmPasswordValid
        });

        const isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;

        if (!isFormValid) {
            return;
        }

        dispatch(register(registerData));
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
                            <h2 id="register" className="text-center mb-3">Register</h2>
                            <Form onSubmit={handleSubmit}>
                                <motion.div className="mb-5"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <Form.Group className="form-group ">
                                        <span className="material-symbols-outlined b-0 p-2 colouring"  >
                                            person
                                        </span>
                                        <input id="name" type="text" autoComplete="on" placeholder="Enter the name" className="colouring" onChange={handleRegisterData} />
                                    </Form.Group>
                                    <div>
                                        {!registerFormValidity.name && <p className="text-danger text-end">**Please enter the username correctly</p>}
                                    </div>


                                </motion.div>

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
                                        {!registerFormValidity.email && <p className="text-danger text-end">**Please enter the email correctly</p>}
                                    </div>

                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.1 }}

                                    className="mb-5"
                                >
                                    <Form.Group className="form-group">
                                        <span className="material-symbols-rounded b-0 p-2 colouring">
                                            lock
                                        </span>
                                        <input id="password" type="password" autoComplete="on" placeholder="Enter the password" className="colouring" onChange={handleRegisterData} />
                                    </Form.Group>
                                    <div>
                                        {!registerFormValidity.password && <p className="text-danger text-end">**Please enter the password correctly</p>}
                                    </div>

                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.1 }}

                                    className="mb-5"
                                >
                                    <Form.Group className="form-group">
                                        <span className="material-symbols-rounded b-0 p-2 colouring">
                                            <span className="material-symbols-outlined">
                                                lock_open
                                            </span>
                                        </span>
                                        <input id="confirmpassword" type="password" autoComplete="on" placeholder="Confirm password" className="colouring" onChange={handleRegisterData} />
                                    </Form.Group>

                                    <div>
                                        {!registerFormValidity.confirmpassword && <p className="text-danger text-end">**Confirm Password and Password should be same</p>}
                                    </div>

                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    id="btn">
                                    <Button className="m-auto" style={{ backgroundColor: '#D2078B', border: "none" }} type="submit">
                                        Create Account
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
