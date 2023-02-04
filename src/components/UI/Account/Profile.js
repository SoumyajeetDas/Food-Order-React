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
import { useState } from 'react';


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

    const [isLoad, setIsLoad] = useState(false); // For spinner Loading

    const { name, phone, address, email, profilePic, isUserError, userMessage, orderNumber, isLoading } = useSelector(state => state.userReducer);

    const registerData = useSelector(state => state.authReducer.registerData);

    const dispatch = useDispatch();

    const navigate = useNavigate();


    const uploadImage = async (image) => {

        setIsLoad(true)
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", process.env.REACT_APP_Upload_Preset);
        data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);

        // Adding the image in the cloudinary
        let res = await fetch('https://api.cloudinary.com/v1_1/dc7dg2r7m/image/upload', {
            method: "POST",
            body: data
        });


        // After adding if the status from the cloudinary API is 200 then then update the url, public_id of the image 
        // in MongoDB.
        if (res.status === 200) {
            let dataJson = await res.json();

            const bodyData = {
                profilePic: dataJson.secure_url,
                profilePicId: dataJson.public_id
            }

            let response = await fetch(`${process.env.REACT_APP_Working_URL}/api/v1/user/profilepic`, {
                method: "PUT",
                headers: {
                    Authorization: 'Bearer ' + registerData.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            });

            if (response.status === 200) {
                setIsLoad(false);
                dispatch(getUserData());
            }

            setIsLoad(false);

        }

    }

    const handleDelete = async () => {

        setIsLoad(true);

        // For Deleting the main logic is written in Backend.
        let response = await fetch(`${process.env.REACT_APP_Working_URL}/api/v1/user/deleteprofilepic`, {
            method: "GET",
            headers: {
                Authorization: 'Bearer ' + registerData.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {

            dispatch(getUserData());
        }

        setIsLoad(false);
    }

    useEffect(() => {

        // If not authenticated
        if (isUserError && userMessage === '401 Unauthorized') {
            navigate('/login');
        }

        else if(isUserError && userMessage) {
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

            {/* During loading spinner over the backdrop */}
            {isLoad && <div id="backdrop-profile">
                <Spiner />
            </div>}


            <Container className='my-5' style={{ maxWidth: "90%" }}>
                <Row>

                    {isLoading ? <Spiner /> :

                        <Col xl={6} lg={8} md={8} sm={12} className="m-auto" id="profile-wrapper">
                            <div id="profile-wrapper-header">

                                <div id="profile-photo">

                                    {profilePic ?

                                        <img src={profilePic} height="100%" width="100%" alt="😒"></img>

                                        :
                                        
                                        <b>{name.charAt(0) ? name.charAt(0) : '😑'}</b>
                                    }

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
                                    <Form.Control type="text" value={name ? name : "Couldn't fetch data"} readOnly disabled />
                                </Form.Group>

                                <Form.Group className="mb-4 input-wrapper" controlId="formBasicEmail">
                                    <span className="material-symbols-outlined b-0 p-2 colouring-icon" >
                                        email
                                    </span>
                                    <Form.Control type="email" value={email ? email : "Couldn't fetch data"} readOnly disabled />
                                </Form.Group>

                                <Form.Group className="mb-4 input-wrapper" controlId="formBasicEmail">
                                    <span className="material-symbols-outlined b-0 p-2 colouring-icon" >
                                        call
                                    </span>
                                    <Form.Control type="tel" value={phone ? '+91 ' + phone : "Couldn't fetch data"} readOnly disabled />
                                </Form.Group>

                                <div id="address-wrapper">
                                    <span className="material-symbols-outlined b-0 p-2 colouring-icon" >
                                        home
                                    </span>

                                    <p>{address ? address : "Couldn't fetch data"}</p>

                                </div>

                            </Form>

                            <div className="mt-5" id="profile-buttons">
                                
                                {/* If the profilePic is availaible delete profile button will be shown and if profilePic not
                                availaible then Add profile button will be shown */}

                                {profilePic ?
                                    <>

                                        {/* Delete Profile Pic Button */}
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="btn" onClick={() => handleDelete()}>
                                            <span className="material-symbols-rounded">
                                                delete
                                            </span>
                                            Delete Profile Photo
                                        </motion.button>
                                    </>

                                    :

                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="btn" id="add-profilepic">

                                        <input id="file-input" type="file" style={{ display: "none" }} onChange={(e) => uploadImage(e.target.files[0])} />

                                        <label htmlFor="file-input">
                                            <span className="material-symbols-rounded">
                                                add_circle
                                            </span>

                                            Add Profile Photo

                                        </label>

                                    </motion.div>
                                }


                            </div>
                        </Col>}
                </Row>
            </Container>

            <Footer />
        </motion.div>

    )
}

export default Profile
