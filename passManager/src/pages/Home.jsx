import { useState, Fragment, useRef, useEffect } from 'react';
import { IoIosSave } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";
import { GrFormViewHide } from "react-icons/gr";
import { GrFormView } from "react-icons/gr";
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify'
import { useAuth } from "../utils/AuthContext";

function Home() {

  const { setAuthenticated } = useAuth();
  const navigate = useNavigate()

  const [passes, setPasses] = useState([]); // start with empty array

  useEffect(() => {
    console.log("Rendering")
    fetch("http://localhost:3000/passwords/passes", {credentials: "include"})
      .then(res => res.json())
      .then(resData => {
        if(!resData.success){
          console.log("here")
          setAuthenticated(false)
          return navigate("/login", {replace: true})
        }
        console.log(resData.passwords)
        setPasses(resData.passwords); // update state when data arrives
      })
      .catch(err => console.error(err));
  }, []); // run once when component mounts

  const [errors, seterrors] = useState({})
  const [showPass, setshowPass] = useState(false)

  const urlRef = useRef()
  const userRef = useRef()
  const passRef = useRef()



  const [visible, setVisible] = useState({});

  function toggleVisibility(index) {
    setVisible((prev) => ({
      ...prev,
      [index]: !prev[index], // toggle only this row
    })
    );
    console.log(visible)
  };

  async function handleDelete(index, id) {
    const params = new URLSearchParams();
    params.append("id", id);

    // GET request sent to http://localhost:3000/delete?username=example
    const response = await fetch(`http://localhost:3000/passwords/delete?${params}`, {credentials: "include"});
    const resInfo = await response.json()
    if(!resInfo.success){
      setAuthenticated(false)
      navigate("/login", {replace: true})
      return toast.error(resInfo.msg)
    }
    
    toast.success("Deleted succesfully!!")
    setPasses((prev) => {
      let updated_passes = [...prev]
      updated_passes.splice(index, 1)
      return updated_passes
    })
  }

  function checkErrors(newPass) {
    let updated_errors = {}
    if (newPass.url == "") { updated_errors.url = "URL cant be blank" }
    if (newPass.userName.length < 3) { updated_errors.user = "User name cant be shorter than 3 letters" }
    if (newPass.password.length < 5) { updated_errors.pass = "Use a longer password" }
    seterrors(updated_errors)
    if (Object.keys(updated_errors).length > 0) { return true }
    else { return false }
  }

  async function handleSubmit() {
    let newPass = { url: urlRef.current.value, userName: userRef.current.value, password: passRef.current.value }
    if (checkErrors(newPass)) {
      console.log("Fix your erros first")
      toast.error("FIx your errors first")
    }
    else {
      //updating on server
      const response = await fetch("http://localhost:3000/passwords/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPass),
        credentials: "include"
      });

      const resInfo = await response.json()

      if(!resInfo.success){
        setAuthenticated(false)
        navigate("/login", {replace: true})
        return toast.error("unautohrized")
      }
      
      toast.success("Password saved !!")
      newPass._id = resInfo.id
      console.log(newPass)
      console.log("id of added:", resInfo)

      setPasses(prev => {
        return [...prev, newPass]
      })
      urlRef.current.value = userRef.current.value = passRef.current.value = ""
    }
  }

  function handleEdit(index, id) {
    urlRef.current.value = passes[index].url
    userRef.current.value = passes[index].user
    passRef.current.value = passes[index].pass

    handleDelete(index, id)
  }


  return (
    <>
      <main className='flex-1 h-[100vh] bg-[#d8dcd5] flex flex-col items-center relative overflow-auto'>
        <div className="topBox w-2/3 mt-24 flex flex-col gap-5">

          <div className="logoBox text-center">
            <div className="logo font-bold text-5xl">
              <span className='text-green-600'>&lt;</span><span>Pass</span><span className='text-green-600'>OP/&gt;</span>
            </div>
            <p className='logoText text-lg'>Your Own Password Manager</p>
          </div>

          <div className="urlBox">
            <input ref={urlRef} className='rounded-full px-4 py-1 border w-full border-green-600' type="text" name="url" id="url" placeholder='Enter website URL' />
            {errors.url && <p className='error'>{errors.url}</p>}
          </div>

          <div className="userSpecific flex justify-between">
            <div className="userBox w-[70%]">
              <input ref={userRef} className='rounded-full px-4 py-1 w-full border border-green-600' type="text" name="username" id="username" placeholder='Enter Username' />
              {errors.user && <p className='error'>{errors.user}</p>}
            </div>
            <div className="passBox w-[25%]">
              <div className="passInput rounded-full bg-white px-4 py-1 w-full border border-green-600 flex justify-between">
                <input ref={passRef} className='outline-none bg-none w-[100%]' type={(showPass) ? "text" : "password"} name="password" id="password" placeholder='Enter Password' />
                <button id='showPassBtn' className='text-lg' onClick={() => { setshowPass((prev) => !prev) }}>{(showPass) ? <GrFormView /> : <GrFormViewHide />}</button>
              </div>
              {errors.pass && <p className='error'>{errors.pass}</p>}
            </div>
          </div>

          <button onClick={handleSubmit} className="addPassBtn flex gap-1 items-center bg-green-500 w-fit self-center px-4 py-2 rounded-full">
            <div className="saveIcon text-lg"><IoIosSave /></div>
            <p className=''>Save</p>
          </button>
        </div>

        <div className="lowerBox w-2/3 flex flex-col gap-2 pb-4">

          <h2 className='font-bold text-xl'>Your Passwords</h2>

          <div className="passTable grid grid-cols-[6.5fr_1.5fr_1.5fr_1.5fr] rounded-lg border border-b-0 border-black overflow-hidden [&>*]:text-center">
            {/* table header */}
            <p className='bg-green-900 text-white font-bold p-2'>Site</p>
            <p className='bg-green-900 text-white font-bold p-2'>Username</p>
            <p className='bg-green-900 text-white font-bold p-2'>Password</p>
            <p className='bg-green-900 text-white font-bold p-2'>Actions</p>
            {/* table content */}
            {passes.length == 0 && <><p className='border border-b-black'>No data to show</p><p className='border border-b-black'></p><p className='border border-b-black'></p><p className='border border-b-black'></p></>}
            {passes.map((pass, index) => {
              return (
                <Fragment key={pass._id}>
                  <div className="dataUrlBox bg-green-100 border-b border-black p-1 flex justify-center gap-1 items-center">
                    <p>{pass.url}</p>
                    <button className="copyBtn" onClick={() => { navigator.clipboard.writeText(pass.url); toast.success("Text copied!!") }}><MdContentCopy /></button>
                  </div>
                  <div className="dataUserBox bg-green-100 border-b border-black p-1 flex justify-center gap-1 items-center">
                    <p>{pass.userName}</p>
                    <button className="copyBtn" onClick={() => { navigator.clipboard.writeText(pass.userName); toast.success("Text copied!!") }}><MdContentCopy /></button>
                  </div>
                  <div className="dataPassBox bg-green-100 border-b border-black p-1 flex justify-center gap-1 items-center">
                    <p className='px-1'>{visible[index] ? pass.password : "••••••"}</p>
                    <button
                      onClick={() => toggleVisibility(index)}
                      className="toggleBtn"
                    >
                      {visible[index] ? <GrFormView />: <GrFormViewHide />}
                    </button>
                    <button className="copyBtn" onClick={() => { navigator.clipboard.writeText(pass.password); toast.success("Text copied!!") }}><MdContentCopy /></button>
                  </div>
                  <div className="actionBox bg-green-100 border-b border-black p-1 flex justify-center gap-1 items-center">
                    <button onClick={() => handleEdit(index, pass._id)}><AiFillEdit /></button>
                    <button onClick={() => { handleDelete(index, pass._id); }}><RiDeleteBin6Fill /></button>
                  </div>
                </Fragment>
              )
            })}
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
