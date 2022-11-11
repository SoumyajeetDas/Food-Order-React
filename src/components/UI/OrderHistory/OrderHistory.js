import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import OrderHistoryItem from './OrderHistoryItems/OrderHistoryItem';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Spinner from '../Spinner/Spiner';
import { useSelector } from 'react-redux'
import Footer from '../Home/Footer/Footer';
import { logout } from '../../../store/auth-slice'
import { useDispatch } from 'react-redux';


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




export default function OrderHistory() {



    const [orderItems, setOrderItems] = useState([]);
    const [apiStatus, setApiStatus] = useState(200);
    const [isLoading, setLoading] = useState(false);


    const { token } = useSelector(state => state.authReducer.registerData);

    const dispatch = useDispatch();



    const navigate = useNavigate();


    /*****************************Get the orders for the specefic User****************************************/
    const getOrder = async () => {

        try {
            setLoading(true);

            let data = await fetch(`${process.env.REACT_APP_Working_URL}/api/v1/order/`, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + token
                },

                // To send the credential(cookies) with the request to the backend side of another domain or same domain. 
                // Due to the CORS policy we have to add the credentials:true so that the server in a particular doamin
                // can borrow credential from another domain
                'credentials': 'include'
            });

            if (data.status === 401) {
                setApiStatus(data.status);
                navigate("/login");
                dispatch(logout());
            }

            else if (data.status === 200) {
                let dataJson = await data.json();

                setOrderItems(dataJson.orderData);
            }

            else {
                setApiStatus(data.status)
            }

            setLoading(false);
        }

        catch (err) {
            setLoading(false);
            setApiStatus(500)
        }


    }


    useEffect(() => {
        getOrder();

        // eslint-disable-next-line
    }, [])


    return (
        <Container>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >

                {isLoading && <Spinner />}

                {apiStatus === 400 ?
                    <div className="text-center text-white my-5" role="alert">
                        <h3><i>No past orders for you!!</i></h3>
                    </div> :

                    apiStatus !== 200 ?
                        <div className="text-center text-white my-5" role="alert">
                            <h3><i>Some problem from backend!!</i></h3>
                        </div> :

                        orderItems.map(item => <OrderHistoryItem key={item._id} item={item} />)
                }

                <Footer />
            </motion.div>

        </Container>
    )
}
