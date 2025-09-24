import React, { useState } from 'react'
import { Navigate } from 'react-router';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const Signup = () => {

  const navigate = useNavigate();
  const [errors, seterrors] = useState({})


  async function handleSubmit(e) {
    e.preventDefault()
    if (Object.keys(errors).length != 0) {
      toast.error("Fix your errors first")
      return 0
    }

    // get data from form  using FormData Object
    console.log(e)
    let form = new FormData(e.target)

    let obj = {
      name: form.get("name"),
      email: form.get("email"),
      password: form.get("password")
    }
    console.log(obj)

    // connecting to express server
    let rawResponse = await fetch("http://localhost:3000/auth/signup", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(obj)
    })

    let content = await rawResponse.json()

    if (!(content.success)) {
      toast.error(content.msg)
      return 0
    }

    toast.success(content.msg)
    e.target.reset()

    setTimeout(() => {
      console.log("Navigatin gto login")
      navigate("/login", { replace: true });
    }, 1000)

    console.log(content)
  }

  function handleName(e) {
    seterrors(prevState => {
      let updated = { ...prevState }
      if (e.target.value.length <= 3) {
        updated.name = "Name must be longer than 3 letters"
      }
      else {
        delete updated.name
      }
      return updated
    })
  }

  function handleEmail(e) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    seterrors(prevState => {
      let updated = { ...prevState }
      if (!emailRegex.test(e.target.value)) {
        updated.email = "Enter valid email address"
      }
      else {
        delete updated.email
      }
      return updated
    })
  }

  function handlePassword(e) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    seterrors(prevState => {
      let updated = { ...prevState }
      if (!passwordRegex.test(e.target.value)) {
        updated.password = "Password must include Upper, lower, number and special"
      }
      else {
        delete updated.password
      }
      return updated
    })
  }

  return (
    <main className='flex-1 bg-zinc-700 items-center justify-center flex'>
      <div className='bg-red-300 w-full px-2 py-6 rounded'>
        <h1 className='text-4xl font-bold'>Signup</h1>
        <form className='flex flex-col gap-4 mt-4' onSubmit={(event) => handleSubmit(event)}>
          <p className='w-full'>
            <input onBlur={(e) => { handleName(e) }} className='p-2 rounded-full w-full border-none outline-none placeholder:text-sm' type="text" name="name" placeholder='Your name...' /><br />
            {errors.name && <span className='error'>{errors.name}</span>}
          </p>
          <p className='w-full'>
            <input onBlur={(e) => { handleEmail(e) }} className='p-2 rounded-full w-full border-none outline-none placeholder:text-sm' type="email" name="email" placeholder='Enter your mail...' />
            {errors.email && <span className='error'>{errors.email}</span>}
          </p>
          <p className='w-full'>
            <input onBlur={(e) => { handlePassword(e) }} className='p-2 rounded-full w-full border-none outline-none placeholder:text-sm' type="password" name='password' placeholder='Enter your Password...' />
            {errors.password && <span className='error'>{errors.password}</span>}
          </p>
          <button type='submit' className='bg-blue-400 w-max self-center py-1 px-4 rounded-full hover:rounded-md hover:cursor-pointer transiton-all'>Signup</button>
        </form>
      </div>
    </main>
  )
}

export default Signup
