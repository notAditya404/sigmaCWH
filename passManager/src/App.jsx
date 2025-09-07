import './App.css'
import { useState, Fragment, useRef, useEffect } from 'react';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { IoIosSave } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";

function App() {
  const [passes, setPasses] = useState(() => {
        return JSON.parse(localStorage.getItem("Passes")) || [{ url: "www.youtube.com", user: "aditya123", pass: "pass123" }, { url: "www.facebook.com", user: "pinki123", pass: "pass890" }]
    })
  const [errors, seterrors] = useState({})
  
  const urlRef = useRef()
  const userRef = useRef()
  const passRef = useRef()
  const toastRef = useRef()
  const toastContentRef = useRef()
  const lowerBarRef = useRef()

  useEffect(() => {
        localStorage.setItem("Passes", JSON.stringify(passes))
    }, [passes])

  function handleDelete(index) {
    setPasses((prev) => {
      let updated_passes = [...prev]
      updated_passes.splice(index, 1)
      return updated_passes
    })
  }

  function checkErrors(newPass) {
    let updated_errors = {}
    if (newPass.url == "") { updated_errors.url = "URL cant be blank" }
    if (newPass.user.length < 3) { updated_errors.user = "User name cant be shorter than 3 letters" }
    if (newPass.pass.length < 5) { updated_errors.pass = "Use a longer password" }
    seterrors(updated_errors)
    if (Object.keys(updated_errors).length > 0) { return true }
    else { return false }
  }

  function handleSubmit() {
    let newPass = { url: urlRef.current.value, user: userRef.current.value, pass: passRef.current.value }
    if (checkErrors(newPass)) {
      console.log("Fix your erros first")
      toastHandler("error")
    }
    else {
      toastHandler("save")
      setPasses(prev => {
        return [...prev, newPass]
      })
      urlRef.current.value = userRef.current.value = passRef.current.value = ""
    }
  }

  function handleEdit(index) {
    urlRef.current.value = passes[index].url
    userRef.current.value = passes[index].user
    passRef.current.value = passes[index].pass

    handleDelete(index)
  }

  function toastHandler(action) {
    if (action == "delete") {
      toastContentRef.current.textContent = "Deleted Successfully"
    }
    else if (action == "copy") {
      toastContentRef.current.textContent = "Text Copied"
    }
    else if (action == "save") {
      toastContentRef.current.textContent = "Password Saved"
    }
    else if(action == "error"){
      toastContentRef.current.textContent = "Fix errors"
    }

    lowerBarRef.current.classList.remove("hideLowerBar")
    toastRef.current.classList.remove("hideBox")
    lowerBarRef.current.offsetWidth;
    lowerBarRef.current.classList.add("hideLowerBar")
    setTimeout(()=>{
      toastRef.current.classList.add("hideBox")
      lowerBarRef.current.classList.remove("hideLowerBar")
    }, 2000)
  }

  return (
    <>
      <Navbar />
      <main className='flex-1 bg-[#d8dcd5] flex flex-col items-center relative'>
        <div className="topBox w-2/3 mt-24 flex flex-col gap-5">
          <div className="logoBox text-center">
            <div className="logo font-bold text-3xl">
              <span className='text-green-600'>&lt;</span><span>Pass</span><span className='text-green-600'>OP/&gt;</span>
            </div>
            <p className='logoText text-sm'>Your Own Password Manager</p>
          </div>

          <div className="urlBox">
            <input ref={urlRef} className='rounded-full px-3 py-0.5 text-sm border w-full border-green-600' type="text" name="url" id="url" placeholder='Enter website URL' />
            {errors.url && <p className='error'>{errors.url}</p>}
          </div>
          <div className="userSpecific flex justify-between">
            <div className="userBox w-[75%]">
              <input ref={userRef} className='rounded-full px-3 py-0.5 w-full text-sm border border-green-600' type="text" name="username" id="username" placeholder='Enter Username' />
              {errors.user && <p className='error'>{errors.user}</p>}
            </div>
            <div className="passBox w-[25%]">
              <input ref={passRef} className='rounded-full px-3 py-0.5 w-full text-sm border border-green-600' type="password" name="password" id="password" placeholder='Enter Password' />
              {errors.pass && <p className='error'>{errors.pass}</p>}
            </div>
          </div>

          <button onClick={handleSubmit} className="addPassBtn flex gap-1 items-center bg-green-500 w-fit self-center py-2 px-4 rounded-full">
            <div className="saveIcon text-lg"><IoIosSave /></div>
            <p className='text-xs'>Save</p>
          </button>
        </div>
        <div className="lowerBox w-2/3 flex flex-col gap-2">
          <h2 className='font-bold text-lg'>Your Passwords</h2>
          <div className="passTable grid grid-cols-[6.5fr_1.5fr_1.5fr_1.5fr] rounded-sm overflow-hidden [&>*]:text-center [&>*]:p-1 [&>*]:text-sm">
            {/* table header */}
            <p className='bg-green-900 text-white font-semibold p-1'>Site</p>
            <p className='bg-green-900 text-white font-semibold p-1'>Username</p>
            <p className='bg-green-900 text-white font-semibold p-1'>Password</p>
            <p className='bg-green-900 text-white font-semibold p-1'>Actions</p>
            {/* table content */}
            {passes.map((pass, index) => {
              return (
                <Fragment key={index}>
                  <div className="dataUrlBox bg-green-100 border border-black flex justify-center gap-1 items-center">
                    <p>{pass.url}</p>
                    <button className="copyBtn" onClick={() => { navigator.clipboard.writeText(pass.url); toastHandler("copy") }}><MdContentCopy /></button>
                  </div>
                  <div className="dataUserBox bg-green-100 border border-black flex justify-center gap-1 items-center">
                    <p>{pass.user}</p>
                    <button className="copyBtn" onClick={() => { navigator.clipboard.writeText(pass.user); toastHandler("copy") }}><MdContentCopy /></button>
                  </div>
                  <div className="dataPassBox bg-green-100 border border-black flex justify-center gap-1 items-center">
                    <p>{pass.pass}</p>
                    <button className="copyBtn" onClick={() => { navigator.clipboard.writeText(pass.pass); toastHandler("copy") }}><MdContentCopy /></button>
                  </div>
                  <div className="actionBox bg-green-100 border border-black flex justify-center gap-1 items-center">
                    <button onClick={() => handleEdit(index)}><AiFillEdit /></button>
                    <button onClick={() => { handleDelete(index); toastHandler("delete") }}><RiDeleteBin6Fill /></button>
                  </div>
                </Fragment>
              )
            })}
          </div>
        </div>
        <div ref={toastRef} className="toast hideBox bg-black absolute top-2 right-2 text-white flex flex-col justify-between w-[200px]">
          <button className="topBar text-lg flex justify-end self-end" onClick={()=>{
            toastRef.current.classList.add("hideBox");
          }}><IoIosClose /></button>
          <p ref={toastContentRef} className='text-sm text-center mb-2'>Text copied!!!</p>
          <div className="lowerBar h-[8px] bg-blue-900" ref={lowerBarRef}></div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
