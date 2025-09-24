import { useRef } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { useAuth } from '../utils/AuthContext'
import { Navigate } from 'react-router'

const Login = () => {
  const navigate = useNavigate()
  const { authenticated, setAuthenticated } = useAuth();
  const { setUserInfo } = useAuth()


  const emailRef = useRef()
  const passRef = useRef()


  const handleSubmit = async () => {
    // connecting to express server
    let rawResponse = await fetch("http://localhost:3000/auth/login", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ email: emailRef.current.value, password: passRef.current.value }),
      credentials: "include"
    })

    let content = await rawResponse.json()
    let { msg, success } = { ...content }
    if (!success) {
      return toast.error(msg)
    }
    toast.success(msg)
    setAuthenticated(true)
    setUserInfo(content.userInfo)
    setTimeout(() => {
      navigate("/", { replace: true })
    }, 1000)

  }

  if (authenticated) {
    return <Navigate to="/" replace />;
  }



  return (
    <main className='flex-1 flex items-center justify-center bg-zinc-700 p-1'>
      <div className='bg-red-300 w-full flex flex-col gap-4 px-2 py-6 rounded'>
        <h1 className='text-4xl font-bold'>Login</h1>
        <input ref={emailRef} className='p-2 rounded-full border-none outline-none placeholder:text-sm' type="email" name="email" placeholder='Enter your mail...' />
        <div>
          <input ref={passRef} className='p-2 rounded-full w-full border-none outline-none placeholder:text-sm' type="password" name='password' placeholder='Enter your Password...' />
          <div className='text-right mt-1 mr-1 text-sm underline text-blue-700 '><NavLink className={"hover:cursor-pointer"} to={"/signup"}>New here? Sign up now..</NavLink></div>
        </div>
        <button onClick={handleSubmit} className='bg-blue-400 w-max self-center py-1 px-4 rounded-full hover:rounded-md hover:cursor-pointer transiton-all'>Login</button>
      </div>
    </main>
  )
}

export default Login
