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
import OrderHistory from './components/UI/OrderHistory/OrderHistory';
import ForgotPassword from './components/UI/Credential/ForgotPassword';
import ResetPassword from './components/UI/Credential/ResetPassword';
import SendTokenAndUpdatePwdMedium from './components/UI/Credential/SendTokenAndUpdatePwdMedium'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useSelector, useDispatch } from 'react-redux';
import { getCartData } from './store/cart-slice';
import { getUserData } from './store/user-slice'
import { cartActions } from './store/index';
import Page404 from './components/UI/PageNotFound/Page404';
import Profile from './components/UI/Account/Profile';



const App = () => {

  const { isCartError, cartMessage } = useSelector(state => state.cartReducer);

  const { registerData } = useSelector(state => state.authReducer);

  const { isUserError, userMessage } = useSelector(state => state.userReducer);

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



  // This is used if any error comes from cartSlice, user-slice while calling the cartData
  useEffect(() => {

    if (isCartError) {
      // Alert creating problem so added console.log()
      console.log(cartMessage);
      dispatch(cartActions.reset());
    }

    if(isUserError){
      console.log(userMessage);
    }

  }, [isCartError, cartMessage, dispatch, isUserError, userMessage])


  // Everytime the registerData changes say when the user gets logged in or logged out the getUserData() needs to be called, so 
  // that the profilePic in the header gets updated.
  useEffect(() => {

    dispatch(getUserData());

    // eslint-disable-next-line
  }, [registerData])



  // Just when the application gets loaded the cart System and the user data tries gets loaded. If user is not logged in then 
  // both user and cart will not get loaded. If the user is logged in, the cart and the user gets loaded irrespective of 
  // whichever component gets loaded.

  useEffect(() => {

    //Load the cart data
    dispatch(getCartData());

    dispatch(getUserData());

    // eslint-disable-next-line
  }, []);



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
            <Route exact path="/resetPassword" element={<ResetPassword />} />
            <Route exact path="/foods" element={<Foods />} />
            <Route exact path="/orderHistory" element={<OrderHistory />} />
            <Route exact path="/medium" element={<SendTokenAndUpdatePwdMedium />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
      </PayPalScriptProvider>



      <Order />

    </>
  );
}

export default App;
