import React from 'react'

const Navbar = () => {
  return (
    <header>
      <nav className='bg-blue-950 text-white'>
        <ul className='flex justify-around p-1 items-center'>
          <li className='font-bold text-lg'><span className='text-green-600'>&lt;</span><span>Pass</span><span className='text-green-600'>OP/&gt;</span></li>
          <li>
            <button className='flex gap-2 border border-white font-bold items-center bg-green-600 p-1 rounded-full text-sm'>
              <img className='w-[24px]' src="/src/assets/images/github.png" alt="" />
              Github
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
