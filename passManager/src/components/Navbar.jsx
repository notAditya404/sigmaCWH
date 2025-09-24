import React from 'react'
import { useAuth } from '../utils/AuthContext'
import { useNavigate } from 'react-router'

const Navbar = () => {

  const { userInfo, setAuthenticated } = useAuth()
  console.log("fromnavbar",userInfo)
  const navigate = useNavigate()
  return (
    <header>
      <nav className='bg-blue-950 text-white'>
        <ul className='flex justify-around p-2 items-center'>
          <li className='font-bold text-2xl'><span className='text-green-600'>&lt;</span><span>Pass</span><span className='text-green-600'>OP/&gt;</span></li>
          <li>
            <div className='flex gap-1'>
              <p>Hello {userInfo.name}</p>
              <button onClick={()=>{
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
                setAuthenticated(false)
                navigate("/login", {replace: true})
              }} className='hover:cursor-pointer underline text-sm'>Logout</button>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
