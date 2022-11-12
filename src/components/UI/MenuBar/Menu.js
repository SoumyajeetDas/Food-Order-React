import React from 'react';
import './Menu.css';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { orderVisibilityActions } from '../../../store/index'
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../../store/index';
import { logout } from '../../../store/auth-slice'


// Animation for showing the Menu Bar
const MenuVaraints1 = {
    hidden: {
        opacity: 0,
        x: -200
    },
    visible: {
        opacity: 1,
        x: 5
    }
}


// Animation for removing the Menu Bar
const MenuVaraints2 = {
    visible: {
        opacity: 1,
        x: 5
    },
    hidden: {
        opacity: 0,
        x: -200
    }
}


export default function Menu(props) {


    const items = useSelector(state => state.cartReducer.items);
    const { registerData } = useSelector(state => state.authReducer);


    const dispatch = useDispatch();

    const navigate = useNavigate();


    // This part is used to show thw Order Bar from the right side and remove the Menu Bar
    const cartItemShowHandler = () => {
        dispatch(orderVisibilityActions.show());
        props.show();
    }



    // Handlig the logout functionality
    const handleLogout = () => {
        dispatch(logout());

        dispatch(cartActions.reset());

        navigate("/")
    }



    return (
        <motion.div
            variants={props.variant.variantName === "MenuVaraints1" ? MenuVaraints1 : MenuVaraints2}
            initial={`${props.variant.initial}`}
            animate={`${props.variant.animate}`}
            transition={{ type: "spring" }}

            className={props.classname}>


            {/* Header of Menubar conatining Image and the cross button */}
            <div id="cross" >
                <div>
                    <img src="icon.png" alt="Loading..." height="50" width="50"></img>
                    <p className="mt-1">The Bengalis</p>
                </div>

                <span className="material-symbols-rounded" onClick={() => props.show()}>
                    close
                </span>
            </div>


            {/* Home */}
            {!registerData && <div className="menuitems" onClick={() => navigate('/')}>
                <span className="material-symbols-rounded">
                    home
                </span>
                Home
            </div>}


            {/* Menus */}
            <div className="menuitems" onClick={() => navigate('/foods')}>
                <span className="material-symbols-rounded">
                    list_alt
                </span>
                Menus
            </div>


            {/* Cart with no of items in cart */}
            {registerData && <div className="menuitems" onClick={cartItemShowHandler}>
                <span className="material-symbols-rounded">
                    <span className="material-symbols-rounded">
                        lunch_dining
                    </span>
                </span>
                Cart

                <p className="m-0 py-1 px-3 bg-danger rounded-pill">{items? items.length:0}</p>
            </div>}


            {/* Your Orders which contains the list of previously paid orders */}
            <div className="menuitems" onClick={() => navigate("/orderHistory")}>
                <span className="material-symbols-rounded">
                    history
                </span>
                Order History
            </div>



            {/* Login */}
            {!registerData && <div className="menuitems" onClick={() => navigate("/login")}>
                <span className="material-symbols-outlined">
                    login
                </span>
                Login
            </div>}


            {/* Logout */}
            {registerData && <div className="menuitems" onClick={handleLogout}>
                <span className="material-symbols-rounded">
                    logout
                </span>
                Logout
            </div>}
        </motion.div>
    )
}
