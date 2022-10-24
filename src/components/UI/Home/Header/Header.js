import React from 'react'
import './Header.css'
import { motion } from "framer-motion"
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { cartItemShowActions } from '../../../../store/index';
import { authActions } from '../../../../store/index';
import { logout } from '../../../../store/auth-slice'

export default function Header(props) {

  const navigate = useNavigate();
  const { items } = useSelector(state => state.cartReducer);


  const { registerData } = useSelector(state => state.authReducer);


  const dispatch = useDispatch();

  const cartItemShowHandler = () => {
    dispatch(cartItemShowActions.show());
  }

  const handleLogout = () => {
    dispatch(logout());

    dispatch(authActions.reset());

    navigate("/")
  }

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
          <li>
            <img src="icon.png" alt="...Loading"></img>
          </li>
          <motion.li
            whileHover={{ scale: 1.5 }}
          ><Link to="/">Home</Link></motion.li>
          <motion.li
            whileHover={{ scale: 1.5 }}
          ><Link to="/foods">Menus</Link></motion.li>
          <motion.li
            whileHover={{ scale: 1.5 }}
          ><a href="/">Orders</a></motion.li>
        </ul>
      </nav>


      {!registerData ?
        <div className="right_part">
          <ul className="nav__links">
            <motion.li
              whileHover={{ scale: 1.5 }}
            ><Link className="login" to="/login">Login</Link></motion.li>
          </ul>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="button" onClick={() => navigate("/register")}>Sign Up

          </motion.button>

        </div>

        :

        <>
          <div id="right-part-loggedin">
            <motion.div
              whileHover={{ scale: 1.2 }}
              style={{ cursor: "pointer" }}
              onClick={cartItemShowHandler}
              class="me-5"
              id="cart-icon"
            >

              <span className="material-symbols-rounded text-white">
                shopping_cart
              </span>
              <span id="cart-number">
                <b>{items.length}</b>
              </span>
            </motion.div>

            <div class="me-md-4" id="user-login">

              <small><i>Hello {registerData.user.name} !!</i></small>

              <div class="ms-2">
                <span class="material-symbols-outlined text-white" id="login-icon">
                  account_circle
                </span>
              </div>

            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="button"
              id="logout"
              onClick={() => handleLogout()}>
              LogOut
            </motion.button>
          </div>
        </>
      }

    </motion.header>
  )
}
