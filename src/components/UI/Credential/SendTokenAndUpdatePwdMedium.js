import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import Footer from '../Home/Footer/Footer';
import { authActions } from '../../../store/index'
import { useDispatch } from 'react-redux'



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




export default function SendTokenAndUpdatePwdMedium() {


    const navigate = useNavigate();

    const dispatch = useDispatch();



    // Resetting the state in the auth-slice. If not done, the message token is sent is been shown which is coming from the 
    // ForgotPassword.js component.
    useEffect(() => {
        dispatch(authActions.reset());

        // eslint-disable-next-line
    }, [])


    return (

        <>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="d-flex justify-content-center align-items-center my-5"

            >


                <Container>
                    <Row>
                        <Col sm={12} className="text-center">
                            <h4><i className="text-white">
                                Token has been sent into your email. Please copy the token to update the password
                            </i>
                            </h4>


                        </Col>

                        <Col className="d-flex justify-content-center align-items-center">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="button my-5" onClick={() => navigate("/resetPassword")}>

                                Update Password

                            </motion.button>
                        </Col>
                    </Row>

                </Container>

            </motion.div >
            <Footer />
        </>


    )
}
