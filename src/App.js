import './App.css';
import React, { useState } from 'react';
import Menu from './components/UI/MenuBar/Menu';
import Header from './components/UI/Home/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/UI/Home/Home';
import Register from './components/UI/Credential/Register';
import Login from './components/UI/Credential/Login';
import Foods from './components/UI/FoodData/Foods';
import Order from './components/UI/Order/Order';
import ForgotPassword from './components/UI/Credential/ForgotPassword';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'



const App = () => {

  const [status, setStatus] = useState(false)
  const [classname, seClassName] = useState('menu-bar-initial'); // Initially the menubar wil be kept as display: none so that it is not visible
  const [variant, setVariant] = useState({});

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
  return (
    <>
      {/* Backdrop */}
      {status && <div id="backdrop" onClick={show}>

      </div>}



      {/* PayPalScriptProvider is added here so that all the Components within it passed can access the client-id */}

      <PayPalScriptProvider
      options={{"client-id":process.env.REACT_APP_PAYPAL_CLIENT_ID}}
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
          </Routes>
        </BrowserRouter>
      </PayPalScriptProvider>



      <Order />

    </>
  );
}

export default App;
