import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './Content.css'
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

export default function Content() {

    const navigate = useNavigate();

    // Animation for the Content to come from left to right
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

    return (
        <motion.div

            variants={containerVariants}
            initial="hidden"
            animate="visible"

        >
            <Container>
                <Row>
                    <div id="data" className="my-5">

                        <div>
                            <p id="intro1" className="text-white mb-4">The Health you want is here :)</p>

                            <p id="intro2"><b>The Bengalis</b></p>

                            <p className="text-white text-center">Bring the quality living experience to today's urban customers</p>


                            {/* Registration */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                id="accountbtn"
                                onClick={() => navigate("/register")}>

                                Open your account

                            </motion.button>

                        </div>

                        <img src="BengaliFood.jpg" height="500" width="500" alt="Loading......." id="image"></img>


                    </div>
                </Row>
            </Container>

        </motion.div>

    )
}
