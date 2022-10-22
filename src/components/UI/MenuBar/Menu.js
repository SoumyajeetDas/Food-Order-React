import React from 'react';
import './Menu.css';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { cartItemShowActions, } from '../../../store/index'
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../../store/index';
import { logout } from '../../../store/auth-slice'

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

    const cartItemShowHandler = () => {
        dispatch(cartItemShowActions.show());
        props.show();
    }

    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());

        dispatch(authActions.reset());

        navigate("/")
    }

    return (
        <motion.div
            variants={props.variant.variantName === "MenuVaraints1" ? MenuVaraints1 : MenuVaraints2}
            initial={`${props.variant.initial}`}
            animate={`${props.variant.animate}`}
            transition={{ type: "spring" }}

            className={props.classname}>


            <div id="cross" >
                <div>
                    <img src="icon.png" alt="Loading..." height="30" width="30"></img>
                    <p>Bengali Food</p>
                </div>

                <span className="material-symbols-rounded" onClick={() => props.show()}>
                    close
                </span>
            </div>


            <div className="menuitems" onClick={() => navigate('/')}>
                <span className="material-symbols-rounded">
                    home
                </span>
                Home
            </div>


            <div className="menuitems" onClick={() => navigate('/foods')}>
                <span className="material-symbols-rounded">
                    list_alt
                </span>
                Menus
            </div>

            {registerData  && <div className="menuitems" onClick={cartItemShowHandler}>
                <span className="material-symbols-rounded">
                    <span class="material-symbols-rounded">
                        shopping_cart
                    </span>
                </span>
                Cart

                <p class="m-0 py-1 px-3 bg-danger rounded-pill">{items.length}</p>
            </div>}


            <div className="menuitems">
                <span className="material-symbols-rounded">
                    history
                </span>
                Orders
            </div>


            {!registerData  && <div className="menuitems" onClick={()=>navigate("/login")}>
                <span class="material-symbols-outlined">
                    login
                </span>
                Login
            </div>}


            {registerData  && <div className="menuitems" onClick={handleLogout}>
                <span class="material-symbols-rounded">
                    logout
                </span>
                Logout
            </div>}
        </motion.div>
    )
}
