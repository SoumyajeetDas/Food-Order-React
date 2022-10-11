import './App.css';
import React, { useState } from 'react';
import Content from './components/UI/Home/Content/Content';
import Footer from './components/UI/Home/Footer/Footer';
import Header from './components/UI/Home/Header/Header';
import Menu from './components/UI/MenuBar/Menu';


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
      {status && <div id="backdrop" onClick={show}>

      </div>}
      <Header show={show} />
      <Menu show={show} classname={classname} variant={variant} />
      <Content />
      <Footer />
    </>
  );
}

export default App;
