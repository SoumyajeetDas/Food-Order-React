import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import FoodItems from './FoodItems/FoodItems';
import Spinner from '../Spinner/Spiner'
import Footer from '../Home/Footer/Footer';
import './Food.css';
import { motion } from 'framer-motion';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function Foods() {

  const [query, setQuery] = useState([]);
  const [apiStatus, setApiStatus] = useState(200);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  let [isFirst, setIsFirst] = useState(true);

  const navigate = useNavigate();

  const { user } = useSelector(state => state.authReducer);



  const fetchData = async () => {
    // setLoading(true);
    try {

      if (user === null) {
        setApiStatus(401);
      }
      else {
        let data = await fetch('http://localhost:6001/api/v1/bengalifood', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + user.token
          }
        });

        if (data.status === 200) {
          let dataJson = await data.json();
          setQuery(dataJson.data)
          setLoading(false);
        }
        else {
          setApiStatus(data.status)
          setLoading(false);
        }
      }
    }
    catch (err) {
      setLoading(false);
      setApiStatus(500);
      alert(err.message)
    }
  }

  const handleFoodType = async (type) => {
    setLoading(true);
    try {

      if (user === null) {
        setApiStatus(401);
      }

      else {

        let data = await fetch(`http://localhost:6001/api/v1/bengalifood/${type}`, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + user.token
          }
        });

        if (data.status === 200) {
          let dataJson = await data.json();
          setQuery(dataJson.data)
          setLoading(false);
        }
        else {
          setApiStatus(data.status)
          setLoading(false);
        }
      }

    }

    catch (err) {
      setLoading(false);
      alert(err.message)
    }
  }

  const fetchSearchData = async (key) => {
    setLoading(true);
    try {

      if (user === null) {
        setApiStatus(401);
      }

      else {
        let data = await fetch(`http://localhost:6001/api/v1/bengalifood/search/${key}`, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + user.token
          }
        });

        if (data.status === 200) {
          let dataJson = await data.json();
          setQuery(dataJson.data)
          setLoading(false);
        }
        else {
          setApiStatus(data.status)
          setLoading(false);
        }

      }

    }
    catch (err) {
      setLoading(false);
      alert(err.message)
    }
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
      if (search === '') fetchData();

      else fetchSearchData(search);

    }, 1000);

    return () => {
      // console.log("Out Time", interval)
      clearTimeout(interval);
    }

    // eslint-disable-next-line
  }, [search]);



  useEffect(() => {

    fetchData()

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

                id="food-btn" className="btn m-3" onClick={() => fetchData()}>All</motion.button>
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
          {loading && <Spinner />}
        </Row>
      </Container>

      {query.length === 0 && apiStatus !== 401 && apiStatus !== 500 ?
        <Container>
          <Row>

            <div className="text-center text-white my-5" role="alert">
              <h3><i>No data found !!</i></h3>
            </div>

          </Row>
        </Container>

        :

        apiStatus !== 200 && apiStatus !== 401 ?

          <Container>
            <Row>

              <div className="alert alert-danger text-center" role="alert">
                <strong>Some problem from the backend !!</strong>
              </div>

            </Row>
          </Container>


          :

          apiStatus === 401 ? navigate('/login')


            :


            query.map(item =>
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
