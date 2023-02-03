import React from 'react'
import './Header.css'
import { motion } from "framer-motion"
import { Link, useNavigate, useResolvedPath, useMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { orderVisibilityActions } from '../../../../store/index';
import { authActions, cartActions } from '../../../../store/index';
import { logout } from '../../../../store/auth-slice';

export default function Header(props) {


  const { items } = useSelector(state => state.cartReducer);

  const { registerData } = useSelector(state => state.authReducer);


  const dispatch = useDispatch();

  const navigate = useNavigate();


  // This part is used to show thw Order Bar from the right side
  const cartItemShowHandler = () => {
    dispatch(orderVisibilityActions.show());
  }

  // When any nav link will be selected that particular component will be rendered and rendered link will be added the className active 
  // so that the colour gets changed from white to yellow
  const CustomLink = (props) => {
    // The resolvedPath resolves a given To value into an actual Path object with an absolute pathname. This is useful whenever 
    // you need to know the exact path for a relative To value. For example, the <Link> component uses this function to know the
    //  actual URL it points to.
    const resolvedPath = useResolvedPath(props.to);

    // Matches a path to the location. It means actually the path passed and the location(current page address) in the browser
    // is same or not. 
    // end is like exact path in the Route section of the BrowserRouter.
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
      <motion.li
        whileHover={{ scale: 1.5 }}

      >
        <Link className={isActive ? "active" : 'normal'} to={props.to}>{props.name}</Link>

      </motion.li>
    )
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
            <img src="/icon.png" height="100" width="100" alt="...Loading"></img>
          </li>


          {/* Home will be shown when not logged in */}
          {!registerData && <CustomLink to="/" name="Home"></CustomLink>}


          {/* Menus */}

          <CustomLink to="/foods" name="Menus"></CustomLink>



          {/* Your Orders */}

          <CustomLink to="/orderHistory" name="Order History"></CustomLink>


        </ul>
      </nav>


      {!registerData ?
        <div className="right_part">

          {/* Login */}
          <ul className="nav__links">

            <CustomLink to="/login" name="Login"></CustomLink>


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

              <span className="material-symbols-rounded text-white mt-auto">
                lunch_dining
              </span>
              <div id="cart-number" className="text-white m-0 d-flex justify-content-center align-items-center bg-danger">
                <b>{items.length}</b>
              </div>
            </motion.div>


            {/* Logged In User Name */}
            <div className="me-md-4" id="user-login" onClick={()=>navigate('/profile')}>

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
