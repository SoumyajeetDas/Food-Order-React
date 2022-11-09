import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import FoodItems from './FoodItems/FoodItems';
import Spinner from '../Spinner/Spiner'
import Footer from '../Home/Footer/Footer';
import './Food.css';
import { motion } from 'framer-motion';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFood, fetchFoodTypeFood, fetchSearchedFood } from '../../../store/food-slice';
import { updateCartData } from '../../../store/cart-slice'
import { logout } from '../../../store/auth-slice'
import { foodActions, cartActions } from '../../../store/index'
import RatingAddedModal from '../Ratings/RatingAddedModal';



export default function Foods() {

  const [search, setSearch] = useState('');
  const [isFirst, setIsFirst] = useState(true);
  const [item, setItem] = useState();
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);



  const { isError, isSuccess, isLoading, message, foodItems } = useSelector((state) => state.foodReducer);

  const { changed, items, totalPrice } = useSelector(state => state.cartReducer);

  const { token } = useSelector(state => state.authReducer.registerData);



  const dispatch = useDispatch();

  const navigate = useNavigate();


  // Fetching the food wrt type like Breakfast, Lunch, Dinner
  const handleFoodType = async (type) => {
    dispatch(fetchFoodTypeFood(type))
  }

  // Just updating the search usState()
  const handleSearch = (e) => {
    setSearch(e.target.value);

    // If we pass all the logic here then we will get the value of search which is not updated by the last letter as useState()
    // is a asnc function.
  }


  /****************Call the Serach API within 1sec of change of content in the Search bar******************/


  // To remeber the concept of return in useEffect plaese check the React Notes --> Type "useEffect Imp Concept"
  useEffect(() => {

    //Just when the component renders search becomes '' and hence useEffect starts running to prevent that we use useEffect().
    if (isFirst) {
      setIsFirst(false);
      return;
    }
    const interval = setTimeout(() => {
      // console.log("In Time", interval)
      if (search === '') dispatch(fetchFood());

      else dispatch(fetchSearchedFood(search));

    }, 1000);

    return () => {
      // console.log("Out Time", interval)
      clearTimeout(interval);
    }

    // eslint-disable-next-line
  }, [search]);





  /****************For handling all kind of error******************/
  useEffect(() => {

    // This is used if any error comes from the foodSlice 
    if (isError && message === '401 Unauthorized') {
      navigate('/login');
      dispatch(logout());
      dispatch(foodActions.reset());
    }

  }, [isError,  navigate, message, dispatch])



  /****************Updating the cart in DB whenever any item gets added or removed******************/

  // This useEffect() will execute whenever addItem() or removeItem() will be called. For the first time the items, totalPrice
  // will change but still updateCartData() will not be called as changed is still false.
  useEffect(() => {

    if (changed) {
      dispatch(updateCartData());
      dispatch(cartActions.reset());
    }


    // Whenever any item gets added or deleted the item and totalPrice also gets changed and the useEffect() wil also be called

  }, [items, totalPrice, dispatch, changed])


  // Following opeartiosn just when the component gets loaded.
  useEffect(() => {


    // Load the food list
    dispatch(fetchFood());


    // eslint-disable-next-line 
  }, []);

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



  return (


    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >


      {modalShow && <RatingAddedModal modalShow={modalShow} setModalShow={setModalShow} />}


      {/* When food is added in cart the pop up comes up */}
      {show && <motion.div
        initial={{ y: -400, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}

        id="toast" className="text-center text-white border-0" >

        <div
          className="text-white">
          {item} added in cart
        </div>
      </motion.div>}


      <Container>
        <Row>
          <Col sm={6} className="mx-auto">

            <motion.div
              whileHover={{ scale: 1.1 }}>


              {/* Search Bar Functionality */}
              <Form.Group className="mb-5 form-group">
                <input id="search" type="text" placeholder="Search" className="colouring" onChange={handleSearch} />
                <span className="material-symbols-outlined b-0 p-2 colouring" >
                  search
                </span>
              </Form.Group>
            </motion.div>

          </Col>
        </Row>
      </Container>



      <Container>
        <Row>
          <Col>
            <div id="food-btn-wrapper">

              {/* All Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}

                id="food-btn" className="btn m-3" onClick={() => handleFoodType('all')}>All
              </motion.button>



              {/* Breakfast Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}

                id="food-btn" className="btn m-3" onClick={() => handleFoodType('Breakfast')}>Breakfast
              </motion.button>



              {/* Lunch Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}

                id="food-btn" className="btn m-3" onClick={() => handleFoodType('Lunch')}>Lunch
              </motion.button>



              {/* Dinner Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}

                id="food-btn" className="btn m-3" onClick={() => handleFoodType('Dinner')}>Dinner
              </motion.button>



              {/* Desserts Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}

                id="food-btn" className="btn m-3" onClick={() => handleFoodType('Desserts')}>Desserts</motion.button>
            </div>
          </Col>
        </Row>
      </Container>



      {/* Spinner while loading food items */}
      <Container>
        <Row>
          {isLoading && <Spinner />}
        </Row>
      </Container>


      {/* Message if food item not got loaded for any reason */}
      {isError &&
        <Container>
          <Row>

            <div className="text-center text-white my-5" role="alert">
              <h3><i>{message}</i></h3>
            </div>

          </Row>
        </Container>}



      {/* Loading Food Items */}
      {isSuccess && foodItems.map(item =>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}

          key={item._id}
        >
          <FoodItems token={token} item={item} setItem={setItem} setShow={setShow} setModalShow={setModalShow} />
        </motion.div>

      )}


      <Footer />
    </motion.div>

  )
}
