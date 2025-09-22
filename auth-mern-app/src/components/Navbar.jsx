import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useAuth } from '../utils/AuthContext'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { setAuthenticated } = useAuth();

  return (
    <header className='bg-slate-700 p-3'>
      <nav>
        <ul className='flex gap-4 justify-end text-white text-lg'>
          <li className='hover:cursor-pointer'>Home</li>
          <li className='hover:cursor-pointer'>About</li>
          {location.pathname == "/" &&  <li><button onClick={() => {
            console.log("here")
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
            setAuthenticated(false)
            navigate("/login", { replace: true });
          }}>Logout</button></li>}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
