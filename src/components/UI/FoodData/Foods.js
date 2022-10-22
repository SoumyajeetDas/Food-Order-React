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
import { fetchFood, fetchFoodTypeFood, fetchSearchedFood } from '../../../store/foodSlice';
import { foodActions } from '../../../store/index'


export default function Foods() {

  const [search, setSearch] = useState('');
  let [isFirst, setIsFirst] = useState(true);


  const { isError, isSuccess, isLoading, message, foodItems } = useSelector((state) => state.foodReducer);

  const dispatch = useDispatch();

  const navigate = useNavigate();


  const handleFoodType = async (type) => {

    if (isError && message === '401 Unauthorized') {
      navigate('/login');
      dispatch(foodActions.reset());
    }

    dispatch(fetchFoodTypeFood(type))
  }


  const handleSearch = (e) => {
    setSearch(e.target.value);

    // If we pass all the logic here then we will get the value of search which is not updated by the last letter as useState()
    // is a asnc function.
  }

  

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


  useEffect(() => {
    if (isError && message === '401 Unauthorized') {
      navigate('/login');
      dispatch(foodActions.reset());
    }


  }, [isError, navigate, message, dispatch])


  useEffect(() => {
    dispatch(fetchFood());

    // dispatch(foodActions.reset())

    // eslint-disable-next-line 
  }, []);




  return (


    <div>
      <Container>
        <Row>
          <Col sm={6} className="mx-auto">

            <motion.div
              whileHover={{ scale: 1.1 }}>

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
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}

                id="food-btn" className="btn m-3" onClick={() => handleFoodType('all')}>All</motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}

                id="food-btn" className="btn m-3" onClick={() => handleFoodType('Breakfast')}>Breakfast</motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}

                id="food-btn" className="btn m-3" onClick={() => handleFoodType('Lunch')}>Lunch</motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}

                id="food-btn" className="btn m-3" onClick={() => handleFoodType('Dinner')}>Dinner</motion.button>
            </div>
          </Col>
        </Row>
      </Container>


      <Container>
        <Row>
          {isLoading && <Spinner />}
        </Row>
      </Container>

      {isError &&
        <Container>
          <Row>


            {/* If here loading was not given then during searching the spiner was coming along with the food Items down of it */}
            <div className="text-center text-white my-5" role="alert">
              <h3><i>{message}</i></h3>
            </div>

          </Row>
        </Container>}




      {isSuccess && foodItems.map(item =>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}

          key={item._id}
        >
          <FoodItems item={item} />
        </motion.div>

      )}


      <Footer />
    </div>

  )
}
