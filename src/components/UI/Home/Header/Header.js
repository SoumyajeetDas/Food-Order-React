import React from 'react'
import './Header.css'
import { motion } from "framer-motion"

export default function Header() {
  return (

    <motion.header
      initial={{ y: -250 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stifness: 500 }}
    >
      <nav>
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
