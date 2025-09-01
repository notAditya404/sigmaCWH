import React from 'react'
import { NavLink } from 'react-router'

const Navbar = () => {
  return (
    <nav className='bg-gray-700 px-4 py-2'>
        <ul className='flex gap-2 text-white justify-end [&>li]:hover:cursor-pointer'>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/user/aditya">User</NavLink></li>
        </ul>
    </nav>
  )
}

export default Navbar
