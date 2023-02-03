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



let validRegexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
let validRegexPhone = /^[\d]{10}$/

const isEmpty = value => value.trim() === ''
const isEmail = value => validRegexEmail.test(value.trim())
const isPhone = value => validRegexPhone.test(value.trim())
const isPwdAndCnfSame = (pwd, cnf) => pwd === cnf


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


export default function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { isError, isSuccess, isLoading, message } = useSelector((state) => state.authReducer);


    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmpassword: ''
    });


    const [registerFormValidity, setRegisterFormValidity] = useState({
        name: true,
        email: true,
        phone: true,
        address: true,
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


        // Checking the Validity
        const isUsernameValid = !isEmpty(registerData.name);
        const isEmailValid = !isEmpty(registerData.email) && isEmail(registerData.email);
        const isPhoneValid = !isEmpty(registerData.phone) && isPhone(registerData.phone);
        const isAddressValid = !isEmpty(registerData.address);
        const isPasswordValid = !isEmpty(registerData.password);
        const isConfirmPasswordValid = isPwdAndCnfSame(registerData.password, registerData.confirmpassword);


        // Setting the form Validity and accordingly validation error will be shown for the fields
        setRegisterFormValidity({
            name: isUsernameValid,
            email: isEmailValid,
            phone: isPhoneValid,
            address: isAddressValid,
            password: isPasswordValid,
            confirmpassword: isConfirmPasswordValid
        });


        const isFormValid = isUsernameValid && isEmailValid && isPhoneValid && isAddressValid && isPasswordValid && isConfirmPasswordValid;

        // If the form not valid the control will be removed from the flow
        if (!isFormValid) {
            return;
        }


        // If everything is valid then the API will be called with the registerData paramter
        dispatch(register(registerData));
    }


    // If the Api call is sucess then it will be redirected to the food page
    useEffect(() => {
        if (isSuccess) {
            navigate("/foods");
        }
        dispatch(authActions.reset());
    }, [isSuccess, navigate, dispatch])



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

                    {/* Error Messages coming from the api will be shown in Bootstrap 5 alert */}
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
                                        <span className="material-symbols-outlined b-0 p-2 colouring" >
                                            call
                                        </span>
                                        <input id="phone" type="text" autoComplete="on" placeholder="Enter the phone Number" className="colouring" onChange={handleRegisterData} />
                                    </Form.Group>
                                    <div>
                                        {!registerFormValidity.phone && <p className="text-danger text-end">**Please enter a valid phone no.</p>}
                                    </div>

                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.1 }}

                                    className="mb-5"
                                >
                                    <Form.Group className="form-group">
                                        <span className="material-symbols-outlined b-0 p-2 colouring" >
                                            home
                                        </span>
                                        <input id="address" type="text" autoComplete="on" placeholder="Enter the address" className="colouring" onChange={handleRegisterData} />
                                    </Form.Group>
                                    <div>
                                        {!registerFormValidity.address && <p className="text-danger text-end">**Please enter your address</p>}
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
                                    <Button className="m-auto" id="register-button" type="submit">
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
