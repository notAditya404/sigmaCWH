import React from 'react'
import { NavLink } from 'react-router'

const Navbar = () => {
  return (
    <header>
        <nav className='navbar bg-slate-700 py-2 px-8'>
            <ul className='flex gap-2 text-white text-lg [&>li:hover]:cursor-pointer [&>li:hover]:font-extrabold justify-end'>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/form">Form</NavLink></li>
            </ul>
        </nav>
    </header>
  )
}

export default Navbar
