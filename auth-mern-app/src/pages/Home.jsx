import React from 'react'
import { useNavigate } from 'react-router'

const Home = () => {

  const navigate = useNavigate()

  return (
    <div>
      I am protected Home
      <button onClick={()=>{
        console.log("here")
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
        navigate("/login", { replace: false });
      }}>Logout</button>
    </div>
  )
}

export default Home
