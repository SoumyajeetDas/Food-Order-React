import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Footer from '../Home/Footer/Footer';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserData } from '../../../store/user-slice'
import { useEffect } from 'react';
import { motion } from "framer-motion"
import Spiner from '../Spinner/Spiner';



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


const Profile = () => {

    const { name, phone, address, email, isUserError, userMessage, orderNumber, isLoading } = useSelector(state => state.userReducer);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {


        if (isUserError && userMessage === '401 Unauthorized') {
            navigate('/login');
        }

        else {
            console.log(userMessage);
        }

        // eslint-disable-next-line
    }, [isUserError, userMessage])

    useEffect(() => {

        dispatch(getUserData());

        // eslint-disable-next-line
    }, [])

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >

            
            <Container className='my-5' style={{ maxWidth: "90%" }}>
                <Row>

                {isLoading ? <Spiner /> :

                    <Col xl={6} lg={8} md={8} sm={12} className="m-auto" id="profile-wrapper">
                        <div id="profile-wrapper-header">

                            <div id="profile-photo">
                                <b>{name.charAt(0)?name.charAt(0):'😑'}</b>
                            </div>
                            <div>
                                <h1 id="profile-heading">My Profile</h1>
                                <b>You have {orderNumber} order(s) from the resturant</b>
                            </div>


                        </div>


                        <Form>

                            <Form.Group className="mb-4 input-wrapper" controlId="formBasicPassword">
                                <span className="material-symbols-outlined b-0 p-2 colouring-icon" >
                                    person
                                </span>
                                <Form.Control type="text" value={name?name:"Couldn't fetch data"} readOnly disabled />
                            </Form.Group>

                            <Form.Group className="mb-4 input-wrapper" controlId="formBasicEmail">
                                <span className="material-symbols-outlined b-0 p-2 colouring-icon" >
                                    email
                                </span>
                                <Form.Control type="email" value={email?email:"Couldn't fetch data"} readOnly disabled />
                            </Form.Group>

                            <Form.Group className="mb-4 input-wrapper" controlId="formBasicEmail">
                                <span className="material-symbols-outlined b-0 p-2 colouring-icon" >
                                    call
                                </span>
                                <Form.Control type="tel" value={phone?'+91 '+phone:"Couldn't fetch data"} readOnly disabled />
                            </Form.Group>

                            <div id="address-wrapper">
                                <span className="material-symbols-outlined b-0 p-2 colouring-icon" >
                                    home
                                </span>

                                <p>{address?address:"Couldn't fetch data"}</p>

                            </div>

                        </Form>
                    </Col> }
                </Row>
            </Container>

            <Footer />
        </motion.div>

    )
}

export default Profile
