import React from 'react';
import './Menu.css';
import { motion } from 'framer-motion';

export default function Menu(props) {
    console.log(props)

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

                <span className="material-symbols-rounded" onClick={()=>props.show()}>
                    close
                </span>
            </div>
            <div
                className="menuitems">
                <span className="material-symbols-rounded">
                    home
                </span>
                Home
            </div>
            <div className="menuitems">
                <span className="material-symbols-rounded">
                    list_alt
                </span>
                Orders
            </div>
            <div className="menuitems">
                <span className="material-symbols-rounded">
                    history
                </span>
                Previous Order
            </div>
        </motion.div>
    )
}
