import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './Content.css'
import { motion } from "framer-motion"

export default function Content() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}

        >
            <Container>
                <Row>
                    <div id="data" class="my-5">

                        <div>
                            <p id="intro1" class="text-white mb-4">The Health you want is here :)</p>
                            <p id="intro2"><b>Bengali Food</b></p>
                            <p class="text-white text-center">Bring the quality living experience to today's urban customers</p>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                id="accountbtn">Open your account</motion.button>

                        </div>
                        <img src="BengaliFood.jpg" height="500" width="500" alt="Loading......." id="image"></img>
                    </div>
                </Row>
            </Container>

        </motion.div>

    )
}
