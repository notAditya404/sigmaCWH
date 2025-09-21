import React from 'react'

const Navbar = () => {
  return (
    <header className='bg-slate-700 p-3'>
        <nav>
            <ul className='flex gap-4 justify-end text-white text-lg'>
                <li className='hover:cursor-pointer'>Home</li>
                <li className='hover:cursor-pointer'>About</li>
            </ul>
        </nav>
    </header>
  )
}

export default Navbar
