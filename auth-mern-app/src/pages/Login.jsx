import React, { useRef, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { toast } from 'react-toastify'

const Login = () => {
    const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const [ authenticated, setAuthenticated ] = useState(false);
  
  useEffect(() => {
  if (authenticated) {
    navigate("/", { replace: true });
  }
}, [authenticated, navigate]);

  useEffect(() => {
    async function verify() {
      try {
        let rawResponse = await fetch("http://localhost:3000/verify", {
          method: "GET",
          credentials: "include", // send cookies
        });

        let content = await rawResponse.json();
        let { msg, success } = content;

        if (success) {
          setAuthenticated(true);
        } else {
          console.log(msg);
          setAuthenticated(false);
        }
      } catch (err) {
        console.error("Error verifying:", err);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    verify();
  }, []);

  



  const emailRef = useRef()
  const passRef = useRef()
  

  const handleSubmit = async () => {
    // connecting to express server
    let rawResponse = await fetch("http://localhost:3000/login", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({email: emailRef.current.value, password: passRef.current.value}),
      credentials: "include"
    })

    let content = await rawResponse.json()
    let {msg, success} = {...content}
    if(!success){
      return toast.error(msg)
    }
    console.log("token", content.token)
    toast.success(msg)
    setTimeout(()=>{
      navigate("/", {replace: true})
    }, 1000)

  }
  if (loading) {
    return <h2>Loading...</h2>; // or a spinner
  }



  return (
    <div className='bg-red-300 w-full flex flex-col gap-4 px-2 py-6 rounded'>
      <h1 className='text-4xl font-bold'>Login</h1>
      <input ref={emailRef} className='p-2 rounded-full border-none outline-none placeholder:text-sm' type="email" name="email" placeholder='Enter your mail...' />
      <div>
        <input ref={passRef} className='p-2 rounded-full w-full border-none outline-none placeholder:text-sm' type="password" name='password' placeholder='Enter your Password...' />
        <div className='text-right mt-1 mr-1 text-sm underline text-blue-700 '><NavLink className={"hover:cursor-pointer"} to={"/signup"}>New here? Sign up now..</NavLink></div>
      </div>
      <button onClick={handleSubmit} className='bg-blue-400 w-max self-center py-1 px-4 rounded-full hover:rounded-md hover:cursor-pointer transiton-all'>Login</button>
    </div>
  )
}

export default Login
