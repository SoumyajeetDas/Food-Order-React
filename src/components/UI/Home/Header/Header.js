import React from 'react'
import './Header.css'
import { motion } from "framer-motion"

export default function Header(props) {


  return (

    <motion.header
      initial={{ y: -250 }}
      animate={{ y: 0 }} // Keep in mind 0 does not mean 0px. It means the object where it is in DOM
      transition={{ type: 'spring', stifness: 500 }}

      class="mb-5"
    >
      <nav>
        <span class="material-symbols-outlined text-white" id="menu-icon" onClick={()=>props.show()}>
          menu
        </span>
        <ul class="nav__links">
          <motion.li
            whileHover={{ scale: 1.5 }}
          ><a href="/">Home</a></motion.li>
          <motion.li
            whileHover={{ scale: 1.5 }}
          ><a href="/">Order</a></motion.li>
          <motion.li
            whileHover={{ scale: 1.5 }}
          ><a href="/">Previuos Orders</a></motion.li>
        </ul>
      </nav>
      <div class="right_part">
        <ul class="nav__links">
          <motion.li
            whileHover={{ scale: 1.5 }}
          ><a class="login" href="/">Register</a></motion.li>
          <motion.li
            whileHover={{ scale: 1.5 }}
          ><a class="login" href="/">Login</a></motion.li>
        </ul>


        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          class="button" href="/">Sign Up</motion.button>

      </div>

    </motion.header>
  )
}
