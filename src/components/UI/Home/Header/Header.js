import React from 'react'
import './Header.css'
import { motion } from "framer-motion"
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { orderVisibilityActions } from '../../../../store/index';
import { authActions, cartActions } from '../../../../store/index';
import { logout } from '../../../../store/auth-slice'

export default function Header(props) {


  const { items } = useSelector(state => state.cartReducer);

  const { registerData } = useSelector(state => state.authReducer);


  const dispatch = useDispatch();

  const navigate = useNavigate();


  // This part is used to show thw Order Bar from the right side
  const cartItemShowHandler = () => {
    dispatch(orderVisibilityActions.show());
  }



  // Handling the logout function
  const handleLogout = () => {
    dispatch(logout());

    dispatch(authActions.reset());
    dispatch(cartActions.reset());

    navigate("/")
  }



  return (

    <header className="mb-1">
      <nav>
        <span className="material-symbols-outlined text-white" id="menu-icon" onClick={() => props.show()}>
          menu
        </span>


        {/* This is the left side part of the Navbar */}
        <ul className="nav__links">


          <li>
            <img src="icon.png" height="100" width="100" alt="...Loading"></img>
          </li>


          {/* Home will be shown when not logged in */}
          {!registerData && <motion.li
            whileHover={{ scale: 1.5 }}
          >
            <Link to="/">Home</Link>

          </motion.li>}


          {/* Menus */}
          <motion.li
            whileHover={{ scale: 1.5 }}
          >
            <Link to="/foods">Menus</Link>

          </motion.li>


          {/* Your Orders */}
          <motion.li
            whileHover={{ scale: 1.5 }}
          >
            <Link to="/orderHistory">Your Orders</Link>

          </motion.li>

        </ul>
      </nav>


      {!registerData ?
        <div className="right_part">

          {/* Login */}
          <ul className="nav__links">
            <motion.li
              whileHover={{ scale: 1.5 }}
            >
              <Link className="login" to="/login">Login</Link>

            </motion.li>

          </ul>


          {/* Sign Up */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="button" onClick={() => navigate("/register")}>

            Sign Up

          </motion.button>

        </div>

        :

        <>

          {/* Cart with no of items in cart */}
          <div id="right-part-loggedin">
            <motion.div
              whileHover={{ scale: 1.2 }}
              style={{ cursor: "pointer" }}
              onClick={cartItemShowHandler}
              className="me-5"
              id="cart-icon"
            >

              <span className="material-symbols-rounded text-white">
                lunch_dining
              </span>
              <span id="cart-number">
                <b>{items.length}</b>
              </span>
            </motion.div>


            {/* Logged In User Name */}
            <div className="me-md-4" id="user-login">

              <small><i>Hello {registerData.user.name} !!</i></small>

              <div className="ms-2">
                <span className="material-symbols-outlined text-white" id="login-icon">
                  account_circle
                </span>
              </div>

            </div>


            {/* Logout */}
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

    </header>
  )
}
