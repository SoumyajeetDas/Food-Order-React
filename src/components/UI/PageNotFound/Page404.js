import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Footer from '../Home/Footer/Footer';
import './Page404.css'

const Page404 = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <div id="not-found">
                            <img src="/notfound.gif" alt="Loading...." height="300" width="300" />
                        </div>
                    </Col>
                </Row>
            </Container>

            <Footer/>
        </>


    )
}

export default Page404
