import React from 'react'
import './Header.css'
import { motion } from "framer-motion"
import { Link, useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function Header(props) {

  const navigate = useNavigate();
  const items = useSelector(state => state.cartReducer.items)

  return (

    <motion.header
      initial={{ y: -250 }}
      animate={{ y: 0 }} // Keep in mind 0 does not mean 0px. It means the object where it is in DOM
      transition={{ type: 'spring', stifness: 500 }}

      className="mb-1"
    >
      <nav>
        <span className="material-symbols-outlined text-white" id="menu-icon" onClick={() => props.show()}>
          menu
        </span>
        <ul className="nav__links">
          <motion.li
            whileHover={{ scale: 1.5 }}
          ><Link to="/">Home</Link></motion.li>
          <motion.li
            whileHover={{ scale: 1.5 }}
          ><Link to="/foods">Foods</Link></motion.li>
          <motion.li
            whileHover={{ scale: 1.5 }}
          ><a href="/">Orders</a></motion.li>
        </ul>
      </nav>
      <div className="right_part">
        <ul className="nav__links">
          <motion.li
            whileHover={{ scale: 1.5 }}
          ><Link className="login" to="/login">Login</Link></motion.li>
        </ul>

        <ul className="nav__links">
          <motion.li
            whileHover={{ scale: 1.5 }}
          >

            <span className="material-symbols-rounded text-white">
              shopping_cart
            </span>
            <span className="text-warning" id="cart-number">
              <b>{items.length}</b>
            </span>
          </motion.li>
        </ul>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="button" onClick={() => navigate("/register")}>Sign Up</motion.button>

      </div>

    </motion.header>
  )
}
