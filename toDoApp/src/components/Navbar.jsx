import React from 'react'

const Navbar = () => {
  return (
    <nav className='navbar flex bg-blue-800 justify-around text-white p-2 items-center h-[50px]'>
        <div className="logo font-bold text-lg">iTask</div>
        <ul className='links flex gap-4 text-sm'>
            <li>Home</li>
            <li>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
