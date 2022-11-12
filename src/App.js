import './App.css';
import React, { useState, useEffect } from 'react';
import Menu from './components/UI/MenuBar/Menu';
import Header from './components/UI/Home/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/UI/Home/Home';
import Register from './components/UI/Credential/Register';
import Login from './components/UI/Credential/Login';
import Foods from './components/UI/FoodData/Foods';
import Order from './components/UI/Order/Order';
import OrderHistory from './components/UI/OrderHistory/OrderHistory'
import ForgotPassword from './components/UI/Credential/ForgotPassword';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useSelector, useDispatch } from 'react-redux';
import { getCartData } from './store/cart-slice'
import { cartActions } from './store/index'



const App = () => {

  const { isCartError, cartMessage } = useSelector(state => state.cartReducer);

  const dispatch = useDispatch();

  const [status, setStatus] = useState(false);

  // Initially the menubar wil be kept as display: none so that it is not visible
  const [classname, seClassName] = useState('menu-bar-initial');


  const [variant, setVariant] = useState({});


  // This show part will be used for the Menu Bar
  const show = () => {
    if (status === false) {
      setVariant({
        variantName: "MenuVaraints1",
        initial: "hidden",
        animate: "visible"
      })
      setStatus(true);
      seClassName("menubar")
    }
    else {
      setVariant({
        variantName: "MenuVaraints2",
        initial: "visible",
        animate: "hidden"
      })
      setStatus(false);
    }
  }



  // This is used if any error comes from cartSlice while calling the cartData
  useEffect(() => {

    if (isCartError) {
      // Alert creating problem so added console.log()
      console.log(cartMessage);
      dispatch(cartActions.reset());
    }

  }, [isCartError, cartMessage, dispatch])



  // Just when the application gets loaded the cart System tries gets loaded. If user is not looged in then it will not get loaded 
  // If the user is looged in the cart gets loaded and whichever component the data needs to be shown is showed.
  useEffect(() => {

    //Load the cart data
    dispatch(getCartData());

    // eslint-disable-next-line
  }, [])



  return (
    <>
      {/* Backdrop */}

      {/* onClick is given so that on clicking the backdrop the Menubar gets removed */}
      {status && <div id="backdrop" onClick={show}>

      </div>}



      {/* PayPalScriptProvider is added here so that all the Components within it passed can access the client-id */}

      <PayPalScriptProvider
        options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
      >
        <BrowserRouter>
          <Header show={show} />
          <Menu show={show} classname={classname} variant={variant} />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/forgotPassword" element={<ForgotPassword />} />
            <Route exact path="/foods" element={<Foods />} />
            <Route exact path="/orderHistory" element={<OrderHistory />} />
          </Routes>
        </BrowserRouter>
      </PayPalScriptProvider>



      <Order />

    </>
  );
}

export default App;
