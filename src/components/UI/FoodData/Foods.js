import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap';
import FoodItems from './FoodItems/FoodItems';
import Spinner from '../Spinner/Spiner'
import Footer from '../Home/Footer/Footer';
import Order from '../Order/Order';


export default function Foods() {

  const [query, setQuery] = useState([]);
  const [apiStatus, setApiStatus] = useState(200);
  const [loading, setLoading] = useState(true);


  const fetchData = async () => {
    try {

      let data = await fetch('http://localhost:6001/api/v1/bengalifood');

      if (data.status === 200) {
        let dataJson = await data.json();
        setQuery(dataJson.data)
      }
      else {
        setApiStatus(data.status)
      }

      setLoading(false);
    }
    catch (err) {
      setLoading(false);
      alert(err.message)
    }
  }



  useEffect(() => {

    fetchData()

  }, [])



  return (
    <div style={{display:"flex", justifyContent: "center"}}>
      <div>


        <Container>
          <Row>
            {loading && <Spinner />}
          </Row>
        </Container>

        {apiStatus !== 200 ?

          <Container>
            <Row>

              <div className="alert alert-danger text-center" role="alert">
                <strong>Some problem from the backend !!</strong>
              </div>

            </Row>
          </Container>


          :

          query.map(item =>


            <FoodItems key={item._id} item={item} />)}


        <Footer />
      </div>

      <Order/>
    </div>

  )
}
